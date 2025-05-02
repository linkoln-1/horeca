import React, { useEffect, useState } from 'react'

import { requestQueries } from '@/entities/horeca-request'
import {
    Flex,
    Paper,
    Image as MantineImage,
    Box,
    Select,
    LoadingOverlay,
    TextInput,
    Textarea,
    Autocomplete,
    Radio,
    Group,
    CheckIcon,
} from '@mantine/core'
import { DateInput, DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'

import { CategoryLabels, HorecaRequestForm } from '@/shared/constants'
import { PaymentMethod } from '@/shared/constants/paymentMethod'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    HorecaRequestWithProviderRequestDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'

export function ApplicationsDetailsModals({ id }: { id: number }) {
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
            imageIds: [],
        },
    })

    const { data, isLoading } = requestQueries.useGetRequestByIdQuery(id)

    const [images, setImages] = useState<UploadDto[]>([])
    
    const updateFormValuesFromTemplate = () => {
        if (data) {
            const transformedItems = data.items?.map(item => ({
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
                address: data.address || '',
                deliveryTime: new Date(data.deliveryTime),
                acceptUntill: new Date(data.acceptUntill),
                paymentType:
                    (data.paymentType as unknown as PaymentMethod) ||
                    PaymentMethod.Prepayment,
                name: data.name || '',
                phone: data.phone || '',
                comment: data.comment || '',
            })
        }
    }

    useEffect(() => {
        updateFormValuesFromTemplate()
    }, [data])

    return (
        <Flex mt='md' gap='lg'>
            {data &&
                Array(data).map(
                    (order: HorecaRequestWithProviderRequestDto, index) => (
                        <>
                            <Paper p='md' w='100%' shadow='md' withBorder>
                                <LoadingOverlay
                                    zIndex={1000}
                                    overlayProps={{ blur: 2 }}
                                    visible={isLoading}
                                />
                                {form.values.items.map(
                                    (item, categoryIndex) => {
                                        return (
                                            <Box key={categoryIndex}>
                                                <Box pos='relative'>
                                                    <Select
                                                        label='Категория'
                                                        placeholder='Выберите категорию'
                                                        data={Object.entries(
                                                            CategoryLabels
                                                        ).map(
                                                            ([
                                                                value,
                                                                label,
                                                            ]) => ({
                                                                value,
                                                                label,
                                                            })
                                                        )}
                                                        {...form.getInputProps(
                                                            `items.${categoryIndex}.category`
                                                        )}
                                                        mb='md'
                                                        readOnly
                                                    />
                                                </Box>
                                                {item.products.map(
                                                    (product, productIndex) => {
                                                        return (
                                                            <Flex
                                                                pos='relative'
                                                                key={
                                                                    productIndex
                                                                }
                                                                mb='md'
                                                                justify='space-between'
                                                                gap='5px'
                                                            >
                                                                <TextInput
                                                                    label='Название товара'
                                                                    {...form.getInputProps(
                                                                        `items.${categoryIndex}.products.${productIndex}.name`
                                                                    )}
                                                                    readOnly
                                                                />
                                                                <TextInput
                                                                    type='number'
                                                                    label='Кол-во'
                                                                    {...form.getInputProps(
                                                                        `items.${categoryIndex}.products.${productIndex}.amount`
                                                                    )}
                                                                    readOnly
                                                                />
                                                                <TextInput
                                                                    label='Ед. изм.'
                                                                    {...form.getInputProps(
                                                                        `items.${categoryIndex}.products.${productIndex}.unit`
                                                                    )}
                                                                    readOnly
                                                                />
                                                            </Flex>
                                                        )
                                                    }
                                                )}
                                            </Box>
                                        )
                                    }
                                )}

                                {images.length === 0 ? (
                                    <></>
                                ) : (
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
                                                    {images.map(
                                                        (img, index) => {
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
                                                        }
                                                    )}
                                                </Flex>
                                            )}
                                        </Flex>
                                    </Box>
                                )}

                                <Box mb='sm'>
                                    <Textarea
                                        label='Комментарий к заявке'
                                        description='До 400 символов'
                                        {...form.getInputProps('comment')}
                                        readOnly
                                    />
                                </Box>

                                <Box mb='sm'>
                                    <Autocomplete
                                        label='Адрес доставки'
                                        {...form.getInputProps('address')}
                                        readOnly
                                    />
                                </Box>

                                <Flex mb='md' gap='xl'>
                                    <DateInput
                                        valueFormat='DD/MM/YY'
                                        label='Принимать заявки до:'
                                        placeholder='ДД.ММ.ГГ'
                                        value={form.values.acceptUntill}
                                        {...form.getInputProps('acceptUntill')}
                                        readOnly
                                    />
                                    <DateTimePicker
                                        w='fit-content'
                                        valueFormat='DD/MM/YYYY HH:mm:ss'
                                        label='Привезите товар не позднее:'
                                        placeholder='ДД/ММ/ГГГГ ЧЧ:ММ'
                                        value={form.values.deliveryTime}
                                        {...form.getInputProps('deliveryTime')}
                                        readOnly
                                    />
                                </Flex>

                                <Radio.Group
                                    name='paymentMethod'
                                    mb='md'
                                    label='Способ оплаты'
                                    {...form.getInputProps('paymentType')}
                                    readOnly
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
                                            value={
                                                PaymentMethod.PaymentUponDelivery
                                            }
                                            label='По факту'
                                        />
                                    </Group>
                                </Radio.Group>

                                <Flex mb='xl' gap='xl'>
                                    <TextInput
                                        placeholder='Название компании'
                                        {...form.getInputProps('name')}
                                        readOnly
                                    />
                                    <TextInput
                                        placeholder='Номер телефона'
                                        {...form.getInputProps('phone')}
                                        readOnly
                                    />
                                </Flex>
                            </Paper>
                        </>
                    )
                )}
        </Flex>
    )
}

export function handleApplicationsDetailsModals(id: number) {
    return modals.open({
        modalId: 'application-modal',
        children: <ApplicationsDetailsModals id={id} />,
        centered: true,
        size: 'xl',
        radius: 'lg',
    })
}
