import React, { useEffect, useState } from 'react'

import { templateQueries } from '@/entities/template'
import {
    Autocomplete,
    Box,
    CheckIcon,
    Divider,
    Flex,
    Group,
    NumberInput,
    Radio,
    Select,
    Textarea,
    TextInput,
    Image as MantineImage,
    Title,
    LoadingOverlay,
} from '@mantine/core'
import { DateInput, DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconCalendar } from '@tabler/icons-react'

import { CategoryLabels, HorecaRequestForm } from '@/shared/constants'
import { PaymentMethod } from '@/shared/constants/paymentMethod'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    HorecaRequestCreateDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'

const categoryOptions = Object.values(Categories)
    .filter(value => typeof value === 'string')
    .map(x => ({
        value: x.trim(),
        label: CategoryLabels[x as Categories]?.trim() || 'Не указано',
    }))

export function ViewTemplateModal({ id }: { id: number }) {
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
    const { data: selectedTemplate, isLoading } =
        templateQueries.useGetByIdHorecaTemplateQuery({ id: id })

    const [images, setImages] = useState<UploadDto[]>([])

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

        form.setValues(prevState => ({
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
            imageIds: [
                ...(prevState.imageIds ?? []),
                ...(content.imageIds ?? []),
            ],
        }))
    }

    useEffect(() => {
        if (selectedTemplate) {
            updateFormValuesFromTemplateEdit()
        }
    }, [selectedTemplate])

    return (
        <Box>
            <LoadingOverlay
                zIndex={1000}
                overlayProps={{ blur: 2 }}
                visible={isLoading}
            />
            {selectedTemplate && (
                <>
                    <Title my='md'>{selectedTemplate.name}</Title>
                    <Divider my='md' />

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
                                            readOnly
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
                                                        readOnly
                                                    />
                                                    <NumberInput
                                                        placeholder='456'
                                                        label='Кол-во'
                                                        value={x.amount}
                                                        readOnly
                                                    />
                                                    <TextInput
                                                        placeholder='штук'
                                                        label='Ед. измерения'
                                                        value={x.unit}
                                                        readOnly
                                                    />
                                                </Flex>
                                            )
                                        )}
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    })}

                    <Divider my='lg' />

                    <Flex gap='xl' justify='space-between' mb='xl'>
                        <Flex
                            justify='space-between'
                            direction='column'
                            gap='xl'
                            w='50%'
                        >
                            <Box mb='sm'>
                                <Flex
                                    direction='column'
                                    gap='md'
                                    className='border-2 border-dashed border-[var(--mantine-color-indigo-6)] rounded cursor-pointer'
                                    justify='center'
                                    py='md'
                                    px='md'
                                >
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
                                readOnly
                            />
                            <Autocomplete
                                label='Адрес доставки'
                                placeholder='Г. Сочи, ул. Курортный пр-т, 109'
                                value={form.values.address}
                                readOnly
                            />
                        </Flex>
                        <Flex direction='column' gap='xl' w='50%'>
                            <Flex
                                align='flex-end'
                                justify='space-between'
                                gap='sm'
                            >
                                <DateTimePicker
                                    flex={1}
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
                                    value={new Date(form.values.deliveryTime)}
                                    readOnly
                                />
                                <DateInput
                                    flex={1}
                                    size='md'
                                    placeholder='ДД.ММ.ГГ'
                                    valueFormat='DD.MM.YY'
                                    minDate={new Date()}
                                    rightSection={
                                        <IconCalendar
                                            color={
                                                'var(--mantine-color-indigo-6)'
                                            }
                                        />
                                    }
                                    label='Принимать заявки до'
                                    value={new Date(form.values.acceptUntill)}
                                    readOnly
                                />
                            </Flex>
                            <Flex>
                                <Radio.Group
                                    name='paymentMethod'
                                    mb='md'
                                    label='Способ оплаты'
                                    w='100%'
                                    readOnly
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
                                    readOnly
                                />
                                <TextInput
                                    flex={1}
                                    label='Телефон для связи'
                                    placeholder='+7 (986) 860 90 56'
                                    value={form.values.phone}
                                    readOnly
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            )}
        </Box>
    )
}
