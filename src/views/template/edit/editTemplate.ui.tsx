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

import { CategoryLabels, errors, HorecaRequestForm } from '@/shared/constants'
import { PaymentMethod } from '@/shared/constants/paymentMethod'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    HorecaRequestCreateDto,
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
            items: [
                {
                    category: CategoryLabels.alcoholicDrinks as Categories,
                    products: [
                        {
                            name: '',
                            amount: 0,
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
            comment: '',
            imageIds: [],
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

    const addNewProduct = (index: number) => {
        const newProduct = {
            name: '',
            amount: 0,
            unit: '',
        }
        form.setFieldValue(`items.${index}.products`, [
            ...form.values.items[index].products,
            newProduct,
        ])
    }

    const addNewCategory = () => {
        const newCategory = {
            category: '' as Categories,
            products: [
                {
                    name: '',
                    amount: 0,
                    unit: '',
                },
            ],
        }

        form.setFieldValue('items', [...form.values.items, newCategory])
    }

    const removeCategory = (categoryIndex: number) => {
        const updatedCategories = form.values.items.filter(
            (_, index) => index !== categoryIndex
        )

        form.setFieldValue('items', updatedCategories)
    }

    const removeProduct = (categoryIndex: number, productIndex: number) => {
        const updatedProducts = form.values.items[
            categoryIndex
        ].products.filter((_, index) => index !== productIndex)

        form.setFieldValue(`items.${categoryIndex}.products`, updatedProducts)
    }

    const handleFormSubmit = async (values: HorecaRequestForm) => {
        try {
            const formattedData: HorecaRequestTemplateUpdateDto = {
                ...values,
                name: values.name,
                content: {
                    items: values.items.flatMap(item =>
                        item.products.map(product => ({
                            category: item.category,
                            name: product.name,
                            amount: product.amount,
                            unit: product.unit,
                        }))
                    ),
                    deliveryTime: new Date(values.deliveryTime).toISOString(),
                    acceptUntill: new Date(values.acceptUntill).toISOString(),
                    paymentType: values.paymentType,
                    phone: values.phone,
                    comment: values.comment || undefined,
                },
            }

            await updateTemplate({
                data: formattedData,
            })

            toast.success('Шаблон успешно изменен!')
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    const updateFormValuesFromTemplateEdit = () => {
        if (!selectedTemplate) return

        const content: HorecaRequestCreateDto =
            typeof selectedTemplate.content === 'string'
                ? JSON.parse(selectedTemplate.content)
                : selectedTemplate.content

        if (!content || !content.items) return

        type GroupedItem = {
            category: Categories
            products: { name: string; amount: number; unit: string }[]
        }

        const groupedItems = content.items.reduce<GroupedItem[]>(
            (acc, item) => {
                const existingCategory = acc.find(
                    category => category.category === item.category
                )

                if (existingCategory) {
                    existingCategory.products.push({
                        name: item.name,
                        amount: item.amount,
                        unit: item.unit,
                    })
                } else {
                    acc.push({
                        category: item.category as Categories,
                        products: [
                            {
                                name: item.name,
                                amount: item.amount,
                                unit: item.unit,
                            },
                        ],
                    })
                }

                return acc
            },
            []
        )

        form.setValues({
            items: groupedItems,
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
        })
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
                        {form.values.items.map((item, categoryIndex) => {
                            return (
                                <Flex
                                    direction='column'
                                    gap='md'
                                    key={`category-${categoryIndex}`}
                                >
                                    <Flex gap='lg' justify='space-between'>
                                        <Flex
                                            direction='column'
                                            justify='space-between'
                                        >
                                            <Select
                                                miw={300}
                                                placeholder='Выберите категорию'
                                                label='Категория товаров'
                                                data={categoryOptions}
                                                value={item.category}
                                                {...form.getInputProps(
                                                    `items.${categoryIndex}.category`
                                                )}
                                            />
                                        </Flex>
                                        <Flex direction='column'>
                                            {item.products.map(
                                                (x, productIndex) => (
                                                    <Flex
                                                        key={`category-${categoryIndex}-product-${productIndex}`}
                                                        mb='xl'
                                                        gap='md'
                                                        w='100%'
                                                        pos='relative'
                                                        justify='space-between'
                                                    >
                                                        <TextInput
                                                            w='280px'
                                                            placeholder='Например: Горький шоколад'
                                                            label='Наименование'
                                                            value={x.name}
                                                            {...form.getInputProps(
                                                                `items.${categoryIndex}.products.${productIndex}.name`
                                                            )}
                                                        />
                                                        <NumberInput
                                                            placeholder='456'
                                                            label='Количество'
                                                            value={x.amount}
                                                            {...form.getInputProps(
                                                                `items.${categoryIndex}.products.${productIndex}.amount`
                                                            )}
                                                        />
                                                        <TextInput
                                                            placeholder='штук'
                                                            label='Ед. изм.'
                                                            value={x.unit}
                                                            {...form.getInputProps(
                                                                `items.${categoryIndex}.products.${productIndex}.unit`
                                                            )}
                                                        />
                                                    </Flex>
                                                )
                                            )}

                                            <Button
                                                leftSection={<IconPlus />}
                                                w='fit-content'
                                                variant='transparent'
                                                fw='500'
                                                size='md'
                                                onClick={() =>
                                                    addNewProduct(categoryIndex)
                                                }
                                            >
                                                Добавить товар в категорию
                                            </Button>
                                        </Flex>
                                    </Flex>
                                    <Divider my='md' />
                                </Flex>
                            )
                        })}

                        <Flex justify='flex-end'>
                            <Button
                                my='xl'
                                fw='500'
                                size='md'
                                radius='xl'
                                bg='indigo'
                                onClick={addNewCategory}
                            >
                                Добавить новую категорию
                            </Button>
                        </Flex>

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
                                    value={form.values.comment}
                                    {...form.getInputProps('comment')}
                                />
                                <Autocomplete
                                    label='Адрес доставки'
                                    placeholder='Г. Сочи, ул. Курортный пр-т, 109'
                                    value={form.values.address}
                                    {...form.getInputProps('address')}
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
                                            new Date(form.values.acceptUntill)
                                        }
                                        {...form.getInputProps('acceptUntill')}
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
                                            new Date(form.values.deliveryTime)
                                        }
                                        {...form.getInputProps('deliveryTime')}
                                    />
                                </Flex>
                                <Flex>
                                    <Radio.Group
                                        name='paymentMethod'
                                        mb='md'
                                        label='Способ оплаты'
                                        w='100%'
                                        {...form.getInputProps('paymentType')}
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
                                        value={form.values.name}
                                        {...form.getInputProps('name')}
                                    />
                                    <TextInput
                                        flex={1}
                                        label='Телефон для связи'
                                        placeholder='+7 (986) 860 90 56'
                                        value={form.values.phone}
                                        {...form.getInputProps('phone')}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Divider />

                        <Flex mt='xl' justify='flex-end' gap='md'>
                            <Button fw='500' size='md' radius='xl' bg='indigo'>
                                Сохранить изменения
                            </Button>
                            <Button
                                fw='500'
                                size='md'
                                radius='xl'
                                bg='#CC2C79'
                                type='submit'
                            >
                                Отправить заявку
                            </Button>
                        </Flex>
                    </form>
                </>
            )}
        </Box>
    )
}

// const handleSendRequestModal = () => {
//     modals.open({
//         centered: true,
//         modalId: 'sendRequest',
//         radius: 'lg',
//         size: 'lg',
//         children: <SendRequestModal />,
//     })
// }

const handlePageLeaveModal = () => {
    modals.open({
        centered: true,
        modalId: 'pageLeave',
        radius: 'lg',
        size: 'xl',
        children: <PageLeaveModal />,
    })
}
