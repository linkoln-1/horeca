// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { templateQueries } from '@/entities/template'
import { imageQueries } from '@/entities/uploads'
import { PageLeaveModal } from '@/features/templates/pageLeaveModal'
import {
    Box,
    Flex,
    TextInput,
    Button,
    NumberInput,
    Divider,
    Title,
    Select,
    Textarea,
    Autocomplete,
    Radio,
    Group,
    CheckIcon,
    Loader,
    LoadingOverlay,
} from '@mantine/core'
import { Image as MantineImage } from '@mantine/core'
import { DateInput, DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconCalendar, IconPlus, IconX } from '@tabler/icons-react'
import 'dayjs/locale/ru'
import { useRouter } from 'next/navigation'

import { errors, HorecaRequestForm, CategoryLabels } from '@/shared/constants'
import { PaymentMethod } from '@/shared/constants/paymentMethod'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    HorecaRequestTemplateUpdateDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'
import { CustomDropzone } from '@/shared/ui/CustomDropzone'

const categoryOptions = Object.values(Categories)
    .filter(value => typeof value === 'string')
    .map(x => ({
        value: x.trim(),
        label: CategoryLabels[x as Categories]?.trim() || 'Не указано',
    }))

export function EditTemplateViews({ id }: { id: string }) {
    const form = useForm<HorecaRequestForm>({
        initialValues: {
            name: '',
            content: {
                address: '',
                deliveryTime: new Date(),
                acceptUntill: new Date(),
                paymentType: PaymentMethod.Prepayment,
                name: '',
                phone: '',
                comment: '',
                imageIds: [],
                items: [],
            },
        },
    })

    const { data: selectedTemplate } =
        templateQueries.useGetByIdHorecaTemplateQuery({ id: +id })

    const { mutateAsync: updateTemplate } =
        templateQueries.useUpdateHorecaTemplateMutation(+id)

    const { mutateAsync: uploadImage, isPending: isImagePending } =
        imageQueries.useImageUploadMutation()

    const dropzone = useRef<() => void>(null)
    const [images, setImages] = useState<UploadDto[]>([])
    const router = useRouter()
    const handleAddMainImage = async (files: File[] | null) => {
        if (files && files.length > 0) {
            try {
                const uploadedImageDtos: UploadDto[] = await Promise.all(
                    files.map(async file => {
                        const response = await uploadImage({ file })
                        return response
                    })
                )

                const uploadedImageIds = uploadedImageDtos.map(dto => dto.id)

                form.setValues(prevState => ({
                    ...prevState,
                    content: {
                        ...prevState.content,
                        imageIds: [
                            ...(prevState.content.imageIds ?? []),
                            ...uploadedImageIds,
                        ],
                    },
                }))

                setImages(prevImages => [
                    ...(prevImages ?? []),
                    ...uploadedImageDtos,
                ])

                toast.success('Картинка успешно загружена!')
            } catch (e) {
                console.error('Error uploading images:', e)
                toast.error(
                    'Ошибка при загрузке изображений. Попробуйте ещё раз.'
                )
            }
        } else {
            toast.error('Не выбрано ни одного файла для загрузки.')
        }
    }

    const handleDeleteImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
        form.setFieldValue(
            'content.imageIds',
            form.values.content.imageIds.filter((_, i) => i !== index)
        )
    }

    const addNewProduct = () => {
        form.setFieldValue('content.items', [
            ...form.values.content.items,
            {
                name: '',
                amount: 0,
                unit: '',
                category: 'alcoholicDrinks',
            },
        ])
    }

    const removeProduct = (index: number) => {
        form.setFieldValue(
            'content.items',
            form.values.content.items.filter((_, i) => i !== index)
        )
    }

    const handleFormSubmit = async (values: HorecaRequestForm) => {
        try {
            const formattedData: HorecaRequestTemplateUpdateDto = {
                name: values.name,
                content: {
                    ...values.content,
                    items: values.content.items.map(item => ({
                        ...item,
                        amount: Number(item.amount),
                    })),
                    deliveryTime: values.content.deliveryTime.toISOString(),
                    acceptUntill: values.content.acceptUntill.toISOString(),
                },
            }

            await updateTemplate({
                data: formattedData,
            })

            toast.success('Шаблон успешно изменен!')
            router.push('/user/horeca/template/application')
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    const handlePageLeaveModal = () => {
        modals.open({
            centered: true,
            modalId: 'pageLeave',
            radius: 'lg',
            size: 'xl',
            children: (
                <PageLeaveModal
                    onSave={() => {
                        modals.close('pageLeave')
                        handleFormSubmit(form.values)
                    }}
                    onLeave={() => {
                        modals.close('pageLeave')
                        form.reset()
                    }}
                />
            ),
        })
    }

    const updateFormValuesFromTemplateEdit = () => {
        if (!selectedTemplate) return

        const content =
            typeof selectedTemplate.content === 'string'
                ? JSON.parse(selectedTemplate.content)
                : selectedTemplate.content

        if (!content || !content.items) return

        form.setValues({
            name: selectedTemplate.name,
            content: {
                items: content.items,
                address: content.address || '',
                deliveryTime: content.deliveryTime
                    ? new Date(content.deliveryTime)
                    : new Date(),
                acceptUntill: content.acceptUntill
                    ? new Date(content.acceptUntill)
                    : new Date(),
                paymentType: content.paymentType || PaymentMethod.Prepayment,
                name: content.name || '',
                phone: content.phone || '',
                comment: content.comment || '',
                imageIds: content.imageIds || [],
            },
        })

        if (Array.isArray(content.imageIds) && content.imageIds.length > 0) {
            setImages([])
        }
    }

    useEffect(() => {
        if (selectedTemplate) {
            updateFormValuesFromTemplateEdit()
        }
    }, [selectedTemplate])

    if (!selectedTemplate) return <Loader />

    return (
        <Box>
            {selectedTemplate && (
                <>
                    <Title my='md'>{selectedTemplate.name}</Title>
                    <Divider my='md' />
                    <form
                        className='mb-8'
                        onSubmit={form.onSubmit(handleFormSubmit)}
                    >
                        <TextInput
                            label='Название шаблона'
                            value={form.values.name}
                            onChange={e =>
                                form.setFieldValue(
                                    'name',
                                    e.currentTarget.value
                                )
                            }
                            mb='md'
                        />

                        {form.values.content.items.map((item, index) => (
                            <Flex
                                key={`item-${index}`}
                                mb='xl'
                                gap='md'
                                w='100%'
                                pos='relative'
                                justify='space-between'
                            >
                                <Select
                                    w='280px'
                                    placeholder='Выберите категорию'
                                    label='Категория'
                                    data={categoryOptions}
                                    value={item.category}
                                    onChange={value =>
                                        form.setFieldValue(
                                            `content.items.${index}.category`,
                                            value || 'alcoholicDrinks'
                                        )
                                    }
                                />
                                <TextInput
                                    w='280px'
                                    placeholder='Например: Горький шоколад'
                                    label='Наименование'
                                    value={item.name}
                                    onChange={e =>
                                        form.setFieldValue(
                                            `content.items.${index}.name`,
                                            e.currentTarget.value
                                        )
                                    }
                                />
                                <NumberInput
                                    placeholder='456'
                                    label='Количество'
                                    value={item.amount}
                                    onChange={value =>
                                        form.setFieldValue(
                                            `content.items.${index}.amount`,
                                            Number(value)
                                        )
                                    }
                                />
                                <TextInput
                                    placeholder='штук'
                                    label='Ед. изм.'
                                    value={item.unit}
                                    onChange={e =>
                                        form.setFieldValue(
                                            `content.items.${index}.unit`,
                                            e.currentTarget.value
                                        )
                                    }
                                />
                                <Button
                                    type='button'
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: -40,
                                    }}
                                    onClick={() => removeProduct(index)}
                                    bg='transparent'
                                >
                                    <IconX cursor='pointer' color='red' />
                                </Button>
                            </Flex>
                        ))}

                        <Button
                            leftSection={<IconPlus />}
                            w='fit-content'
                            variant='transparent'
                            fw='500'
                            size='md'
                            onClick={addNewProduct}
                            mb='xl'
                        >
                            Добавить товар
                        </Button>

                        <Divider my='lg' />

                        <Flex gap='xl' justify='space-between' mb='xl'>
                            <Flex
                                justify='space-between'
                                direction='column'
                                gap='xl'
                                w='50%'
                            >
                                <Box mb='sm'>
                                    <CustomDropzone
                                        display='none'
                                        openRef={dropzone}
                                        onDrop={handleAddMainImage}
                                        accept={['image/*']}
                                    />

                                    <LoadingOverlay
                                        zIndex={1000}
                                        overlayProps={{ blur: 2 }}
                                        visible={isImagePending}
                                    />

                                    <Flex
                                        direction='column'
                                        gap='md'
                                        className='border-2 border-dashed border-[var(--mantine-color-indigo-6)] rounded cursor-pointer'
                                        justify='center'
                                        py='md'
                                        px='md'
                                        onClick={() => dropzone.current?.()}
                                    >
                                        <Button
                                            mx='auto'
                                            w='fit-content'
                                            size='md'
                                            fw='500'
                                            c='indigo.6'
                                            variant='transparent'
                                            leftSection={<IconPlus />}
                                        >
                                            Добавить фотографии
                                        </Button>

                                        {images.length > 0 && (
                                            <Flex mt='md' gap='sm'>
                                                {images.map((img, index) => {
                                                    return (
                                                        <Box
                                                            pos='relative'
                                                            key={index}
                                                        >
                                                            <MantineImage
                                                                w='100px'
                                                                h='100px'
                                                                fit='cover'
                                                                className='aspect-square'
                                                                radius='md'
                                                                src={getImageUrl(
                                                                    img.path
                                                                )}
                                                                onLoad={() =>
                                                                    getImageUrl(
                                                                        img.path
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                type='button'
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    top: 0,
                                                                    right: -5,
                                                                }}
                                                                onClick={() =>
                                                                    handleDeleteImage(
                                                                        index
                                                                    )
                                                                }
                                                                bg='transparent'
                                                                rightSection={
                                                                    <IconX
                                                                        cursor='pointer'
                                                                        color='red'
                                                                    />
                                                                }
                                                            />
                                                        </Box>
                                                    )
                                                })}
                                            </Flex>
                                        )}
                                    </Flex>
                                </Box>

                                <Textarea
                                    size='md'
                                    h='fit-content'
                                    styles={{
                                        input: { minHeight: '130px' },
                                    }}
                                    description='До 400 символов'
                                    label='Комментарий к заявке'
                                    placeholder='Вас встретит наш сотрудник, Виталий, менеджер по закупкам'
                                    value={form.values.content.comment}
                                    onChange={e =>
                                        form.setFieldValue(
                                            'content.comment',
                                            e.currentTarget.value
                                        )
                                    }
                                />

                                <Autocomplete
                                    label='Адрес доставки'
                                    placeholder='Г. Сочи, ул. Курортный пр-т, 109'
                                    value={form.values.content.address}
                                    onChange={value =>
                                        form.setFieldValue(
                                            'content.address',
                                            value
                                        )
                                    }
                                />
                            </Flex>

                            <Flex direction='column' gap='xl' w='50%'>
                                <Flex
                                    align='flex-end'
                                    justify='space-between'
                                    gap='sm'
                                >
                                    <DateInput
                                        locale='ru'
                                        flex={1}
                                        size='md'
                                        placeholder='ДД.ММ.ГГ'
                                        minDate={new Date()}
                                        valueFormat='DD/MM/YYYY HH:mm:ss'
                                        rightSection={
                                            <IconCalendar
                                                color={
                                                    'var(--mantine-color-indigo-6)'
                                                }
                                            />
                                        }
                                        label='Принимать заявки до:'
                                        value={
                                            new Date(
                                                form.values.content.acceptUntill
                                            )
                                        }
                                        onChange={date =>
                                            form.setFieldValue(
                                                'content.acceptUntill',
                                                date || new Date()
                                            )
                                        }
                                    />
                                    <DateTimePicker
                                        flex={1}
                                        locale='ru'
                                        size='md'
                                        valueFormat='DD/MM/YYYY HH:mm:ss'
                                        label='Привезите товар не позднее:'
                                        placeholder='ДД/ММ/ГГГГ ЧЧ:ММ'
                                        rightSection={
                                            <IconCalendar
                                                color={
                                                    'var(--mantine-color-indigo-6)'
                                                }
                                            />
                                        }
                                        value={
                                            new Date(
                                                form.values.content.deliveryTime
                                            )
                                        }
                                        onChange={date =>
                                            form.setFieldValue(
                                                'content.deliveryTime',
                                                date || new Date()
                                            )
                                        }
                                    />
                                </Flex>

                                <Flex>
                                    <Radio.Group
                                        name='paymentMethod'
                                        mb='md'
                                        label='Способ оплаты'
                                        w='100%'
                                        value={form.values.content.paymentType}
                                        onChange={value =>
                                            form.setFieldValue(
                                                'content.paymentType',
                                                value as PaymentMethod
                                            )
                                        }
                                    >
                                        <Group justify='space-between' mt='xs'>
                                            <Radio
                                                icon={CheckIcon}
                                                value={PaymentMethod.Prepayment}
                                                label='Предоплата'
                                            />
                                            <Radio
                                                icon={CheckIcon}
                                                value={PaymentMethod.Deferment}
                                                label='Отсрочка'
                                            />
                                            <Radio
                                                icon={CheckIcon}
                                                value={
                                                    PaymentMethod.PaymentUponDelivery
                                                }
                                                label='По факту'
                                            />
                                        </Group>
                                    </Radio.Group>
                                </Flex>

                                <Flex justify='space-between' gap='sm'>
                                    <TextInput
                                        label='Наименование заказчика'
                                        placeholder='ООО "РОМАШКА"'
                                        value={form.values.content.name}
                                        onChange={e =>
                                            form.setFieldValue(
                                                'content.name',
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                    <TextInput
                                        flex={1}
                                        label='Телефон для связи'
                                        placeholder='+8 (953) 089 05 53'
                                        value={form.values.content.phone}
                                        onChange={e =>
                                            form.setFieldValue(
                                                'content.phone',
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </Flex>
                            </Flex>
                        </Flex>

                        <Divider />

                        <Flex mt='xl' justify='flex-end' gap='md'>
                            <Button
                                fw='500'
                                size='md'
                                radius='xl'
                                bg='indigo'
                                onClick={handlePageLeaveModal}
                            >
                                Сохранить изменения
                            </Button>
                        </Flex>
                    </form>
                </>
            )}
        </Box>
    )
}
