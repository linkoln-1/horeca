'use client'

import React from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { Flex, Text, Button, Loader, Table } from '@mantine/core'
import { IconChevronLeft, IconRestore } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { hiddenApplications } from '@/shared/constants'
import { role } from '@/shared/helpers/getRole'

export function HiddenApplicationsViews() {
    const user = useUserStore(state => state.user)
    const router = useRouter()

    //TODO:возврат заявки из скрытого
    const onClickRestore = (id: number) => {
        console.log('id - ', id)
    }

    if (!user) return <Loader />

    return (
        <Flex direction='column' gap='md'>
            <Flex justify='start'>
                <Button
                    variant='transparent'
                    onClick={() =>
                        router.push(
                            `/user/${role({ user })}/products/applications`
                        )
                    }
                    c='var(--mantine-color-indigo-4)'
                >
                    <IconChevronLeft />
                    Назад
                </Button>
            </Flex>
            <Flex direction='column' gap='md'>
                {!hiddenApplications ? (
                    <Flex
                        direction='column'
                        justify='center'
                        align='center'
                        h='50vh'
                    >
                        <Text fw={600} size='xl'>
                            Пока заявок нет, но как только появятся — вы сможете
                            спрятать сюда неинтересные
                        </Text>
                        <Text c='gray'>
                            Начните с заполнения своего каталога — просто
                            нажмите &apos;Мой каталог&apos; в меню слева.
                        </Text>
                    </Flex>
                ) : (
                    <Table withRowBorders withColumnBorders>
                        <Table.Thead bg='indigo.4'>
                            <Table.Tr>
                                {[
                                    '№ Скрытой заявки',
                                    'Адрес и дата доставки',
                                    'Комментарий',
                                    'Отсрочка',
                                    'Почему скрыта',
                                ].map((tab, index) => (
                                    <Table.Th key={index} c='#FFF' p='md'>
                                        <Flex justify='center'>{tab}</Flex>
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>

                        {hiddenApplications.map((orderGroup, groupIndex) => (
                            <React.Fragment key={groupIndex}>
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
                                            >{`Размещены: ${orderGroup.date}`}</Text>
                                        </Table.Td>
                                    </Table.Tr>

                                    {orderGroup.items.map(request => (
                                        <Table.Tr key={request.id} bg='#F5F7FD'>
                                            <Table.Td align='center' p='md'>
                                                {request.orderNumber}
                                            </Table.Td>
                                            <Table.Td align='center' p='md'>
                                                <Text size='sm'>
                                                    до {request.deliveryDate}
                                                </Text>
                                                <Text size='sm'>
                                                    {request.address}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td align='center' p='md'>
                                                {request.deliveryMethod}
                                            </Table.Td>
                                            <Table.Td align='center' p='md'>
                                                {request.delay}
                                            </Table.Td>
                                            <Table.Td align='center' p='md'>
                                                {request.reason}
                                            </Table.Td>
                                            <Table.Td align='center' p='md'>
                                                <IconRestore
                                                    onClick={() =>
                                                        onClickRestore(
                                                            request.id
                                                        )
                                                    }
                                                    className='cursor-pointer'
                                                />
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </React.Fragment>
                        ))}
                    </Table>
                )}
            </Flex>
        </Flex>
    )
}
