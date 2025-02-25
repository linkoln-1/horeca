'use client'

import React from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { providerRequest } from '@/entities/provider-request'
import {
    Button,
    Checkbox,
    Flex,
    Table,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core'
import { useParams, useRouter } from 'next/navigation'

import { role } from '@/shared/helpers/getRole'

export function ProductApplicationsByIdViews() {
    const router = useRouter()
    const params = useParams()
    const { id } = params
    const user = useUserStore(state => state.user)

    const { data } = providerRequest.useProviderRequestGetIncomeByID(Number(id))

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

                {data?.categories.length === 0 && (
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

                {data?.categories &&
                    data.categories.map(date => (
                        <React.Fragment key={date}>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td colSpan={5} align='left' p='md'>
                                        <Text
                                            size='sm'
                                            c='#909090'
                                        >{`${date}`}</Text>
                                    </Table.Td>
                                </Table.Tr>

                                {data.items.map((product, index) =>
                                    date === product.category ? (
                                        <Table.Tr key={product.id} bg='#F5F7FD'>
                                            <Table.Td align='center' p='md'>
                                                {index}
                                            </Table.Td>
                                            <Table.Td align='center' p='md'>
                                                <Text size='sm'>
                                                    {product.name}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td align='center' p='md'>
                                                <Text size='sm'>
                                                    {product.amount}{' '}
                                                    {product.unit}
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
                                    ) : (
                                        ''
                                    )
                                )}
                            </Table.Tbody>
                        </React.Fragment>
                    ))}
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
