'use client'

import React from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { providerRequest } from '@/entities/provider-request'
import { useProviderRequestGetStatusMutation } from '@/entities/provider-request/request.queries'
import { Flex, Text, Button, Loader, Table, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronLeft, IconRestore } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { role } from '@/shared/helpers/getRole'
import { groupRequestsByDate } from '@/shared/helpers/groupRequestsByDate'
import { ProviderHorecaRequestStatus } from '@/shared/lib/horekaApi/Api'

export function HiddenApplicationsViews() {
    const user = useUserStore(state => state.user)
    const router = useRouter()

    const { data: incomingRequests } =
        providerRequest.useProviderRequestIncomeQuery({
            search: { status: ProviderHorecaRequestStatus.Hidden },
        })

    const groupedRequests =
        incomingRequests && groupRequestsByDate(incomingRequests.data || [])
    const { mutate: setStatus } = useProviderRequestGetStatusMutation()

    if (!user) return <Loader />
    const [opened, { open, close }] = useDisclosure(false)
    const [selectedRequestId, setSelectedRequestId] = React.useState<
        number | null
    >(null)

    const confirmRequest = () => {
        if (selectedRequestId !== null) {
            setStatus({ horecaRequestId: selectedRequestId, hidden: false })
            close()
            setSelectedRequestId(null)
        }
    }

    const openModal = (id: number) => {
        setSelectedRequestId(id)
        open()
    }
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
                {!groupedRequests ? (
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
                                ].map((tab, index) => (
                                    <Table.Th key={index} c='#FFF' p='md'>
                                        <Flex justify='center'>{tab}</Flex>
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>

                        {groupedRequests &&
                            Object.entries(groupedRequests).map(
                                ([orderGroup, groupIndex]) => (
                                    <React.Fragment key={orderGroup}>
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
                                                    >{`Размещены: ${orderGroup}`}</Text>
                                                </Table.Td>
                                            </Table.Tr>

                                            {groupIndex.map(request => (
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
                                                            <Text size='sm'>
                                                                {
                                                                    request.address
                                                                }
                                                            </Text>
                                                            до{' '}
                                                            {new Date(
                                                                request.deliveryTime
                                                            ).toLocaleDateString()}
                                                        </Text>
                                                    </Table.Td>
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        {request.comment}
                                                    </Table.Td>
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        {new Date(
                                                            request.acceptUntill
                                                        ).toLocaleDateString()}
                                                    </Table.Td>
                                                    <Table.Td
                                                        align='center'
                                                        p='md'
                                                    >
                                                        <IconRestore
                                                            onClick={() =>
                                                                openModal(
                                                                    request
                                                                        .items[0]
                                                                        .horecaRequestId
                                                                )
                                                            }
                                                            className='cursor-pointer'
                                                        />
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    </React.Fragment>
                                )
                            )}
                    </Table>
                )}
            </Flex>
            <Modal
                opened={opened}
                onClose={close}
                title='Подтверждение'
                centered
            >
                <Text mb='md'>Восстановить заявку?</Text>
                <Flex justify='end' gap='sm'>
                    <Button color='gray' variant='light' onClick={close}>
                        Отменить
                    </Button>
                    <Button color='red' onClick={confirmRequest}>
                        Восстановить
                    </Button>
                </Flex>
            </Modal>
        </Flex>
    )
}
