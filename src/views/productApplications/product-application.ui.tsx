'use client'

import React from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { providerRequest } from '@/entities/provider-request'
import { useProviderRequestGetStatusMutation } from '@/entities/provider-request/request.queries'
import { Button, Flex, Select, Text, Table } from '@mantine/core'
import Link from 'next/link'

import {
    PaymentMethod,
    PaymentMethodLabels,
} from '@/shared/constants/paymentMethod'
import { role } from '@/shared/helpers/getRole'
import { groupRequestsByDate } from '@/shared/helpers/groupRequestsByDate'

function getSortParam(sortValue: string): string | undefined {
    switch (sortValue) {
        case 'new':
            return 'createdAt|DESC'
        case 'old':
            return 'createdAt|ASC'
        case 'max-match':
            return 'cover|DESC'
        case 'min-match':
            return 'cover|ASC'
        default:
            return undefined
    }
}

export function ProductApplicationViews() {
    const user = useUserStore(state => state.user)
    const [sortValue, setSortValue] = React.useState('new')

    const { data: incomingRequests } =
        providerRequest.useProviderRequestIncomeQuery({
            search: { hiddenAndViewed: false },
            sort: getSortParam(sortValue),
        })

    const groupedRequests =
        incomingRequests && groupRequestsByDate(incomingRequests.data || [])
    const { mutate: setStatus } = useProviderRequestGetStatusMutation()

    const handleHideRequest = (requestId: number) => {
        setStatus({ horecaRequestId: requestId, hidden: true })
    }

    return (
        <Flex direction='column' gap='md'>
            {incomingRequests && user && (
                <Flex direction='column' gap='md'>
                    <Flex justify='end' gap='md' align='center'>
                        <Button
                            variant='transparent'
                            c='var(--mantine-color-indigo-4)'
                            component={Link}
                            href={`/user/${role({ user })}/products/hidden-applications`}
                        >
                            Скрытые заявки
                        </Button>
                        <Select
                            data={[
                                { value: 'new', label: 'Сначала новые' },
                                { value: 'old', label: 'Сначала старые' },
                                {
                                    value: 'max-match',
                                    label: 'По наибольшему совпадению',
                                },
                                {
                                    value: 'min-match',
                                    label: 'По наименьшему совпадению',
                                },
                            ]}
                            value={sortValue}
                            onChange={value => {
                                if (value) setSortValue(value)
                            }}
                            defaultValue='new'
                        />
                    </Flex>

                    <Table withRowBorders withColumnBorders>
                        <Table.Thead bg='indigo.4'>
                            <Table.Tr>
                                {[
                                    '№ Заявки',
                                    'Адрес и дата доставки',
                                    'Комментарий',
                                    'Отсрочка',
                                    'Ваши действия по заявке',
                                ].map((tab, index) => (
                                    <Table.Th key={index} c='#FFF' p='md'>
                                        <Flex justify='center'>{tab}</Flex>
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>

                        {groupedRequests &&
                            Object.entries(groupedRequests).length === 0 && (
                                <Flex
                                    direction='column'
                                    gap='md'
                                    pos='relative'
                                >
                                    <Flex
                                        direction='column'
                                        justify='center'
                                        align='center'
                                        h='50vh'
                                        pos='absolute'
                                        w='78vw'
                                    >
                                        <Text fw={600} size='xl'>
                                            Скоро здесь появятся новые заявки! А
                                            пока вы можете заполнить свой
                                            каталог
                                        </Text>
                                        <Text c='gray'>
                                            Перейдите к заполнению каталога в
                                            левом меню, нажав на раздел «Мой
                                            каталог»
                                        </Text>
                                    </Flex>
                                </Flex>
                            )}

                        {groupedRequests &&
                            Object.entries(groupedRequests).map(
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
                                                    >{`Размещены: ${date}`}</Text>
                                                </Table.Td>
                                            </Table.Tr>

                                            {requests.map(request => (
                                                <Table.Tr
                                                    key={request.id}
                                                    bg='#F5F7FD'
                                                >
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        {request.id}
                                                    </Table.Td>
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        <Text size='sm'>
                                                            до{' '}
                                                            {new Date(
                                                                request.deliveryTime
                                                            ).toLocaleDateString()}
                                                        </Text>
                                                        <Text size='sm'>
                                                            {request.address}
                                                        </Text>
                                                    </Table.Td>
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        способ доставки
                                                    </Table.Td>
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        {
                                                            PaymentMethodLabels[
                                                                request.paymentType as unknown as PaymentMethod
                                                            ]
                                                        }
                                                    </Table.Td>
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        <Flex
                                                            direction='column'
                                                            align='center'
                                                        >
                                                            <Button
                                                                p={0}
                                                                variant='transparent'
                                                                c='indigo.4'
                                                                fw={400}
                                                                component={Link}
                                                                href={`/user/${role(
                                                                    {
                                                                        user,
                                                                    }
                                                                )}/products/applications/${request.id}`}
                                                            >
                                                                Просмотреть
                                                                заявку
                                                            </Button>
                                                            <Button
                                                                p={0}
                                                                variant='transparent'
                                                                c='gray'
                                                                bg='transparent'
                                                                fw={400}
                                                                onClick={() =>
                                                                    handleHideRequest(
                                                                        request.id
                                                                    )
                                                                }
                                                            >
                                                                Скрыть заявку
                                                            </Button>
                                                            <Button
                                                                p={0}
                                                                variant='transparent'
                                                                c='#CC2C79'
                                                                fw={400}
                                                            >
                                                                Пожаловаться
                                                            </Button>
                                                        </Flex>
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    </React.Fragment>
                                )
                            )}
                    </Table>
                </Flex>
            )}

            {(incomingRequests && incomingRequests.data?.length === 0) ||
                (!incomingRequests?.data && (
                    <Flex
                        direction='column'
                        justify='center'
                        align='center'
                        h='50vh'
                    >
                        <Text fw={600} size='xl'>
                            Скоро здесь появятся новые заявки! А пока вы можете
                            заполнить свой каталог
                        </Text>
                        <Text c='gray'>
                            Перейдите к заполнению каталога в левом меню, нажав
                            на раздел «Мой каталог»
                        </Text>
                    </Flex>
                ))}
        </Flex>
    )
}
