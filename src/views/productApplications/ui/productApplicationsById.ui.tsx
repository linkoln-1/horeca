'use client'

import React from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Button,
    Checkbox,
    Flex,
    Table,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core'
import { useRouter } from 'next/navigation'

import { role } from '@/shared/helpers/getRole'
import { groupByCategory } from '@/shared/helpers/groupRequestsByDate'

export function ProductApplicationsByIdViews() {
    const router = useRouter()

    const user = useUserStore(state => state.user)

    const mockData = [
        {
            category: 'Алкогольные напитки',
            products: [
                {
                    id: 1,
                    name: '',
                    volume: '30 литров',
                    isChecked: false,
                    productName: 'Виски',
                    price: 0,
                    maxItems: 3,
                },
                {
                    id: 2,
                    name: '',
                    volume: '20 литров',
                    isChecked: false,
                    productName: 'Джин',
                    price: 0,
                    maxItems: 3,
                },
                {
                    id: 3,
                    name: '',
                    volume: '50 литров',
                    isChecked: false,
                    productName: 'Ром',
                    price: 0,
                    maxItems: 3,
                },
            ],
        },
        {
            category: 'Вина',
            products: [
                {
                    id: 4,
                    name: '',
                    volume: '50 литров',
                    isChecked: false,
                    productName: 'Вино белое',
                    price: 0,
                    maxItems: 3,
                },
                {
                    id: 5,
                    name: '',
                    volume: '40 литров',
                    isChecked: false,
                    productName: 'Вино красное',
                    price: 0,
                    maxItems: 3,
                },
            ],
        },
        {
            category: 'Безалкогольные напитки',
            products: [
                {
                    id: 6,
                    name: '',
                    volume: '20 литров',
                    isChecked: false,
                    productName: 'Сок апельсиновый',
                    price: 0,
                    maxItems: 3,
                },
                {
                    id: 7,
                    name: '',
                    volume: '25 литров',
                    isChecked: false,
                    productName: 'Вода минеральная',
                    price: 0,
                    maxItems: 3,
                },
            ],
        },
    ]

    const groupedByCategories = groupByCategory(mockData, 'category')
    return (
        <Flex direction='column' gap='xl'>
            <Table withRowBorders withColumnBorders>
                <Table.Thead bg='indigo.4'>
                    <Table.Tr>
                        {[
                            '№',
                            'Наименование',
                            'Количество',
                            'В наличии',
                            'Производитель',
                            'Цена',
                            'Фотографии',
                        ].map((tab, index) => (
                            <Table.Th key={index} c='#FFF' p='md'>
                                <Flex justify='center'>{tab}</Flex>
                            </Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>

                {groupedByCategories &&
                    Object.entries(groupedByCategories).length === 0 && (
                        <Flex direction='column' gap='md' pos='relative'>
                            <Flex
                                direction='column'
                                justify='center'
                                align='center'
                                h='50vh'
                                pos='absolute'
                                w='78vw'
                            >
                                <Text fw={600} size='xl'>
                                    Скоро здесь появятся новые заявки! А пока вы
                                    можете заполнить свой каталог
                                </Text>
                                <Text c='gray'>
                                    Перейдите к заполнению каталога в левом
                                    меню, нажав на раздел «Мой каталог»
                                </Text>
                            </Flex>
                        </Flex>
                    )}

                {groupedByCategories &&
                    Object.entries(groupedByCategories).map(
                        ([date, requests]) => (
                            <React.Fragment key={date}>
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Td
                                            colSpan={5}
                                            align='left'
                                            p='md'
                                        >
                                            <Text
                                                size='sm'
                                                c='#909090'
                                            >{`${date}`}</Text>
                                        </Table.Td>
                                    </Table.Tr>

                                    {requests.map(request =>
                                        request.products.map(product => (
                                            <Table.Tr
                                                key={product.id}
                                                bg='#F5F7FD'
                                            >
                                                <Table.Td align='center' p='md'>
                                                    {product.id}
                                                </Table.Td>
                                                <Table.Td align='center' p='md'>
                                                    <Text size='sm'>
                                                        {product.productName}
                                                    </Text>
                                                </Table.Td>
                                                <Table.Td align='center' p='md'>
                                                    <Text size='sm'>
                                                        {product.volume}
                                                    </Text>
                                                </Table.Td>
                                                <Table.Td align='center' p='md'>
                                                    <Checkbox
                                                        className='flex justify-center'
                                                        defaultChecked={false}
                                                    />
                                                </Table.Td>
                                                <Table.Td align='center' p='md'>
                                                    <TextInput
                                                        className='flex justify-center'
                                                        placeholder='Наименование'
                                                        required
                                                    />
                                                </Table.Td>
                                                <Table.Td align='center' p='md'>
                                                    <TextInput
                                                        className='flex justify-center'
                                                        placeholder='Цена за всё (руб)'
                                                        required
                                                    />
                                                </Table.Td>
                                                <Table.Td align='center' p='md'>
                                                    фото
                                                </Table.Td>
                                            </Table.Tr>
                                        ))
                                    )}
                                </Table.Tbody>
                            </React.Fragment>
                        )
                    )}
            </Table>

            <Textarea
                label='Оставить комментарий к заявке'
                styles={{
                    label: {
                        color: '#748ffc',
                    },
                }}
            />

            <Flex justify='center' gap='xl' w='70%' className='mx-auto'>
                <Button
                    fullWidth
                    bg='indigo.4'
                    onClick={() =>
                        router.push(
                            `/user/${user && role({ user })}/products/applications`
                        )
                    }
                >
                    Вернуться к списку заявок
                </Button>
                <Button fullWidth bg='pink.5' disabled>
                    Предпросмотр вашего ответа на заявку
                </Button>
            </Flex>
        </Flex>
    )
}
