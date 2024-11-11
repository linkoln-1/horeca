'use client'

import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { requestQueries } from '../../entities/horeca-request'
import { templateQueries } from '@/entities/template'
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
} from '@mantine/core'
import { DateTimePicker, DateInput } from '@mantine/dates'
import { FileWithPath } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconPlus, IconX } from '@tabler/icons-react'
import dayjs from 'dayjs'

import { CategoryLabels, HorecaTemplateDto } from '@/shared/constants'
import { HorecaRequestForm } from '@/shared/constants'
import { PaymentMethod } from '@/shared/constants/paymentMethod'
import { Categories, HorecaRequestCreateDto } from '@/shared/lib/horekaApi/Api'
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
        },
    })

    const [showCategory, setShowCategory] = useState(true)
    const dropzone = useRef<() => void>(null)
    const [images, setImages] = useState<FileWithPath[]>([])

    const { mutate: createRequest } = requestQueries.useCreateRequestMutation()
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
    const { data: templates } = templateQueries.useGetHorecaTemplateQuery()
    const { data: selectedTemplate, isLoading: selectedTemplateLoading } =
        templateQueries.useGetByIdHorecaTemplateQuery({
            id: +selectedTemplateId,
            enabled: +selectedTemplateId !== 0,
        })

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

    const handleImages = (files: FileWithPath[]) => {
        setImages(files)
    }

    const handleFormSubmit = (values: HorecaRequestForm) => {
        try {
            const formattedData: HorecaRequestCreateDto = {
                ...values,
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
                name: values.name,
                phone: values.phone,
                comment: values.comment || undefined,
            }

            createRequest(formattedData)

            toast.success('Заявка успешно создана!')

            handleModal(
                'thanksTemplateModal',
                'Спасибо!',
                'md',
                <ThanksModal />
            )
        } catch (e: any) {
            toast.error(e.message)
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

            console.log(
                'данные из формы, привезти не позднее: ',
                dayjs(content.deliveryTime).format('YYYY-MM-DD HH:mm')
            )
            console.log(
                'данные из формы, принимать заявки до: ',
                dayjs(content.acceptUntill).format('YYYY-MM-DD HH:mm')
            )

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
        <Flex justify='space-between' mt='md' gap='lg'>
            <Box miw='250px'>
                <Select
                    label='Шаблоны'
                    placeholder='Новый шаблон'
                    data={templateOptions}
                    onChange={value => setSelectedTemplateId(String(value))}
                />
            </Box>
            <Paper p='md' w='100%' shadow='md' withBorder>
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
                                            justify='space-between'
                                            gap='5px'
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

                    <Box mb='sm'>
                        <CustomDropzone
                            display='none'
                            openRef={dropzone}
                            onDrop={files => handleImages(files)}
                        />
                        <Flex
                            direction='column'
                            gap='md'
                            c='gray.5'
                            onClick={() => dropzone.current?.()}
                            style={{
                                border: '2px dashed gray',
                                borderRadius: '8px',
                                cursor: 'pointer',
                            }}
                            justify='center'
                            py='md'
                            px='md'
                        >
                            <Button
                                mx='auto'
                                w='fit-content'
                                size='md'
                                fw='500'
                                c='white'
                                bg='indigo'
                            >
                                Добавить фотографии
                            </Button>

                            {images.length > 0 && (
                                <Flex mt='md' gap='sm'>
                                    {images.map((img, index) => {
                                        const imageUrl =
                                            URL.createObjectURL(img)
                                        return (
                                            <Box pos='relative' key={index}>
                                                <MantineImage
                                                    w='100px'
                                                    h='100px'
                                                    fit='cover'
                                                    radius='md'
                                                    src={imageUrl}
                                                    onLoad={() =>
                                                        URL.revokeObjectURL(
                                                            imageUrl
                                                        )
                                                    }
                                                />
                                                <IconX
                                                    cursor='pointer'
                                                    color='white'
                                                    style={{
                                                        position: 'absolute',
                                                        top: 5,
                                                        right: 5,
                                                    }}
                                                />
                                            </Box>
                                        )
                                    })}
                                </Flex>
                            )}
                        </Flex>

                        <Text c='gray.5'>
                            Можно добавить не более 5 фотографий
                        </Text>
                    </Box>

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
                        <DateTimePicker
                            w='fit-content'
                            valueFormat='DD/MM/YYYY HH:mm:ss'
                            label='Привезите товар не позднее:'
                            placeholder='ДД/ММ/ГГГГ ЧЧ:ММ'
                            value={form.values.deliveryTime}
                            {...form.getInputProps('deliveryTime')}
                        />
                        <DateInput
                            valueFormat='DD/MM/YY'
                            label='Принимать заявки до:'
                            placeholder='ДД.ММ.ГГ'
                            value={form.values.acceptUntill}
                            {...form.getInputProps('acceptUntill')}
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

                    <Flex justify='space-between'>
                        <Button
                            onClick={() =>
                                handleModal(
                                    'saveTemplateModal',
                                    'Укажите имя для нового шаблона',
                                    'lg',
                                    <SaveModal forms={form} />
                                )
                            }
                            c='indigo'
                            size='lg'
                            fw='500'
                            variant='outline'
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
    })
}
