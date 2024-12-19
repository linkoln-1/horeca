'use client'

import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { requestQueries } from '../../entities/horeca-request'
import { templateQueries } from '@/entities/template'
import { imageQueries } from '@/entities/uploads'
import { SaveModal } from '@/features/templates/saveModal'
import { ThanksModal } from '@/features/templates/thanksModal'
import {
    Flex,
    Select,
    Text,
    Box,
    Paper,
    TextInput,
    Button,
    Image as MantineImage,
    Textarea,
    Autocomplete,
    Radio,
    Group,
    CheckIcon,
    Loader,
    LoadingOverlay,
    Container,
} from '@mantine/core'
import { DateTimePicker, DateInput } from '@mantine/dates'
import { FileWithPath } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconPlus, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { CategoryLabels, errors, HorecaTemplateDto } from '@/shared/constants'
import { HorecaRequestForm } from '@/shared/constants'
import { PaymentMethod } from '@/shared/constants/paymentMethod'
import { getImageUrl } from '@/shared/helpers'
import { isFormFilled } from '@/shared/helpers/isForEmpty'
import {
    Categories,
    HorecaRequestCreateDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'
import { CustomDropzone } from '@/shared/ui/CustomDropzone'

export function CreateRequestView() {
    const form = useForm<HorecaRequestForm>({
        initialValues: {
            items: [
                {
                    category: CategoryLabels.alcoholicDrinks as Categories,
                    products: [
                        {
                            name: '',
                            amount: '',
                            unit: '',
                        },
                    ],
                },
            ],
            address: '',
            deliveryTime: new Date(),
            acceptUntill: new Date(),
            paymentType: PaymentMethod.Prepayment,
            name: '',
            phone: '',
            imageIds: [],
        },
    })

    const [showCategory, setShowCategory] = useState(true)
    const dropzone = useRef<() => void>(null)
    const [images, setImages] = useState<UploadDto[]>([])
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
    const router = useRouter()

    const { mutateAsync: createRequest } =
        requestQueries.useCreateRequestMutation()

    const { data: templates } = templateQueries.useGetHorecaTemplateQuery()

    const { data: selectedTemplate, isLoading: selectedTemplateLoading } =
        templateQueries.useGetByIdHorecaTemplateQuery({
            id: +selectedTemplateId,
            enabled: +selectedTemplateId !== 0,
        })

    const { mutateAsync: uploadImage, isPending: isPendingImage } =
        imageQueries.useImageUploadMutation()

    const templateOptions =
        templates?.map(template => ({
            label: template.name,
            value: String(template.id),
        })) || []

    const addNewProduct = (index: number) => {
        const newProduct = {
            name: '',
            amount: 0,
            unit: '',
        }
        form.insertListItem(`items.${index}.products`, newProduct)
    }

    const addNewCategory = () => {
        const newCategory = {
            category: '',
            products: [
                {
                    name: '',
                    amount: 0,
                    unit: '',
                },
            ],
        }
        form.insertListItem('items', newCategory)
    }

    const removeCategory = (categoryIndex: number) => {
        form.removeListItem('items', categoryIndex)
    }

    const removeProduct = (categoryIndex: number, productIndex: number) => {
        form.removeListItem(`items.${categoryIndex}.products`, productIndex)
    }

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
                    imageIds: [
                        ...(prevState.imageIds ?? []),
                        ...uploadedImageIds,
                    ],
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
    }

    const handleFormSubmit = async (values: HorecaRequestForm) => {
        try {
            const formattedData: HorecaRequestCreateDto = {
                ...values,
                items: values.items.flatMap(item =>
                    item.products.map(product => ({
                        category: item.category,
                        name: product.name,
                        amount: +product.amount,
                        unit: product.unit,
                    }))
                ),
                deliveryTime: new Date(values.deliveryTime).toISOString(),
                acceptUntill: new Date(values.acceptUntill).toISOString(),
                paymentType: values.paymentType,
                name: values.name,
                phone: values.phone,
                comment: values.comment || undefined,
            }

            await createRequest(formattedData)

            toast.success('Заявка успешно создана!')

            handleModal('thanksTemplateModal', '', 'md', <ThanksModal />)
            router.push('/user/horeca/applications')
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    const updateFormValuesFromTemplate = () => {
        if (selectedTemplate) {
            const content: HorecaTemplateDto =
                typeof selectedTemplate.content === 'string'
                    ? JSON.parse(selectedTemplate.content)
                    : selectedTemplate.content

            const transformedItems = content.items?.map(item => ({
                category: item.category as Categories,
                products: [
                    {
                        name: item.name,
                        amount: item.amount,
                        unit: item.unit,
                    },
                ],
            }))

            form.setValues({
                items: transformedItems || [],
                address: content.address || '',
                deliveryTime: new Date(content.deliveryTime),
                acceptUntill: new Date(content.acceptUntill),
                paymentType:
                    (content.paymentType as PaymentMethod) ||
                    PaymentMethod.Prepayment,
                name: content.name || '',
                phone: content.phone || '',
            })
        }
    }

    useEffect(() => {
        updateFormValuesFromTemplate()
    }, [selectedTemplate])

    if (!templates) return <Loader />

    return (
        <Flex mt='md' gap='lg'>
            <Box miw='300px'>
                <Select
                    label='Шаблоны'
                    placeholder='Новый шаблон'
                    data={templateOptions}
                    onChange={value => setSelectedTemplateId(String(value))}
                />
            </Box>
            <Paper p='md' w='100%' shadow='md' withBorder maw='54%'>
                <LoadingOverlay
                    zIndex={1000}
                    overlayProps={{ blur: 2 }}
                    visible={selectedTemplateLoading}
                />

                <form
                    onSubmit={form.onSubmit(handleFormSubmit)}
                    className='flex flex-col gap-5'
                >
                    {form.values.items.map((item, categoryIndex) => {
                        return (
                            <Box key={categoryIndex}>
                                <Box pos='relative'>
                                    {showCategory && (
                                        <Select
                                            label='Категория'
                                            placeholder='Выберите категорию'
                                            data={Object.entries(
                                                CategoryLabels
                                            ).map(([value, label]) => ({
                                                value,
                                                label,
                                            }))}
                                            {...form.getInputProps(
                                                `items.${categoryIndex}.category`
                                            )}
                                            mb='md'
                                        />
                                    )}
                                    {categoryIndex > 0 && (
                                        <Button
                                            size='md'
                                            className='absolute right-0 -top-4'
                                            c='red'
                                            onClick={() =>
                                                removeCategory(categoryIndex)
                                            }
                                            variant='transparent'
                                            rightSection={<IconX color='red' />}
                                        >
                                            Удалить категорию
                                        </Button>
                                    )}
                                </Box>
                                {item.products.map((product, productIndex) => {
                                    return (
                                        <Flex
                                            pos='relative'
                                            key={productIndex}
                                            mb='md'
                                            gap='xl'
                                        >
                                            <TextInput
                                                label='Название товара'
                                                {...form.getInputProps(
                                                    `items.${categoryIndex}.products.${productIndex}.name`
                                                )}
                                            />
                                            <TextInput
                                                type='number'
                                                label='Кол-во'
                                                {...form.getInputProps(
                                                    `items.${categoryIndex}.products.${productIndex}.amount`
                                                )}
                                            />
                                            <TextInput
                                                label='Ед. изм.'
                                                {...form.getInputProps(
                                                    `items.${categoryIndex}.products.${productIndex}.unit`
                                                )}
                                            />

                                            {productIndex > 0 && (
                                                <IconX
                                                    color='red'
                                                    className='absolute right-0'
                                                    cursor='pointer'
                                                    onClick={() =>
                                                        removeProduct(
                                                            categoryIndex,
                                                            productIndex
                                                        )
                                                    }
                                                />
                                            )}
                                        </Flex>
                                    )
                                })}

                                <Button
                                    onClick={() => addNewProduct(categoryIndex)}
                                    variant='transparent'
                                >
                                    <Flex gap='sm' c='indigo'>
                                        <IconPlus />
                                        <Text size='lg'>
                                            Добавить новый товар
                                        </Text>
                                    </Flex>
                                </Button>
                            </Box>
                        )
                    })}

                    <Flex
                        mb='sm'
                        gap='md'
                        align='flex-start'
                        direction='column'
                    >
                        <Button onClick={addNewCategory} variant='transparent'>
                            <Flex gap='sm' c='indigo'>
                                <IconPlus />
                                <Text size='lg'>Добавить новую категорию</Text>
                            </Flex>
                        </Button>
                    </Flex>

                    <Flex direction='column' gap='sm'>
                        <CustomDropzone
                            display='none'
                            openRef={dropzone}
                            onDrop={handleAddMainImage}
                        />

                        <LoadingOverlay
                            zIndex={1000}
                            overlayProps={{ blur: 2 }}
                            visible={isPendingImage}
                        />
                        <Flex
                            direction='column'
                            gap='md'
                            className='border-2 border-dashed border-[var(--mantine-color-indigo-6)] rounded cursor-pointer'
                            justify='center'
                            py='md'
                            px='md'
                        >
                            <Button
                                mx='auto'
                                w='fit-content'
                                size='md'
                                fw='500'
                                c='indigo.6'
                                variant='transparent'
                                leftSection={<IconPlus />}
                                onClick={() => dropzone.current?.()}
                            >
                                Добавить фотографии
                            </Button>

                            {images.length > 0 && (
                                <Flex mt='md' gap='sm'>
                                    {images.map((img, index) => {
                                        return (
                                            <Box pos='relative' key={index}>
                                                <MantineImage
                                                    w='100px'
                                                    h='100px'
                                                    fit='cover'
                                                    className='aspect-square'
                                                    radius='md'
                                                    src={getImageUrl(img.path)}
                                                    onLoad={() =>
                                                        getImageUrl(img.path)
                                                    }
                                                />
                                                <Button
                                                    type='button'
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: -5,
                                                    }}
                                                    onClick={() =>
                                                        handleDeleteImage(index)
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

                        <Text c='#868e96' className='text-[14px]'>
                            Можно добавить не более 5 фотографий
                        </Text>
                    </Flex>

                    <Box mb='sm'>
                        <Textarea
                            label='Комментарий к заявке'
                            description='До 400 символов'
                            {...form.getInputProps('comment')}
                        />
                    </Box>

                    <Box mb='sm'>
                        <Autocomplete
                            label='Адрес доставки'
                            {...form.getInputProps('address')}
                        />
                    </Box>

                    <Flex mb='md' gap='xl'>
                        <DateInput
                            valueFormat='DD/MM/YY'
                            label='Принимать заявки до:'
                            placeholder='ДД.ММ.ГГ'
                            value={form.values.acceptUntill}
                            size='md'
                            {...form.getInputProps('acceptUntill')}
                        />

                        <DateTimePicker
                            w='fit-content'
                            valueFormat='DD/MM/YYYY HH:mm:ss'
                            label='Привезите товар не позднее:'
                            placeholder='ДД/ММ/ГГГГ ЧЧ:ММ'
                            value={form.values.deliveryTime}
                            size='md'
                            {...form.getInputProps('deliveryTime')}
                        />
                    </Flex>

                    <Radio.Group
                        name='paymentMethod'
                        mb='md'
                        label='Способ оплаты'
                        {...form.getInputProps('paymentType')}
                    >
                        <Group mt='xs'>
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
                                value={PaymentMethod.PaymentUponDelivery}
                                label='По факту'
                            />
                        </Group>
                    </Radio.Group>

                    <Flex mb='xl' gap='xl'>
                        <TextInput
                            placeholder='Название компании'
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            placeholder='Номер телефона'
                            {...form.getInputProps('phone')}
                        />
                    </Flex>

                    <Flex justify='end' gap='md'>
                        <Button
                            onClick={() =>
                                handleModal(
                                    'saveTemplateModal',
                                    'Укажите имя для нового шаблона',
                                    'lg',
                                    <SaveModal forms={form} />
                                )
                            }
                            c='indigo.4'
                            size='lg'
                            fw='500'
                            styles={{
                                root: {
                                    border: '1px solid #748ffc',
                                    backgroundColor: '#fff',
                                },
                            }}
                            disabled={!isFormFilled(form.values)}
                        >
                            Сохранить шаблон
                        </Button>
                        <Button
                            c='white'
                            size='lg'
                            fw='500'
                            bg='pink.5'
                            type='submit'
                        >
                            Отправить заявку
                        </Button>
                    </Flex>
                </form>
            </Paper>
        </Flex>
    )
}

function handleModal(
    modalId: string,
    title: string,
    size: string,
    children: React.ReactNode
) {
    modals.open({
        title,
        centered: true,
        modalId,
        radius: 'md',
        size,
        children,

        styles: {
            title: {
                fontWeight: 'bold',
                fontSize: '20px',
            },
        },
    })
}
