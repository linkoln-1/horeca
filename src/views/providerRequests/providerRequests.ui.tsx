'use client'

import { useState } from 'react'

import { providerRequest } from '@/entities/provider-request'
import {
    Flex,
    Text,
    Box,
    Divider,
    SegmentedControl,
    Grid,
    Card,
    Badge,
    Button,
    Tooltip,
} from '@mantine/core'
import { IconMessage } from '@tabler/icons-react'
import dayjs from 'dayjs'

import { applications } from '@/shared/constants/applications'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import {
    ProviderRequestSearchDto,
    ProviderRequestStatus,
} from '@/shared/lib/horekaApi/Api'

const limit = 10

const statusMap: Record<string, ProviderRequestStatus> = {
    'В работе': ProviderRequestStatus.Active,
    'Ожидают откликов': ProviderRequestStatus.Pending,
    Завершённые: ProviderRequestStatus.Finished,
}

const getLabelByStatus = (status: string): string => {
    const application = applications.find(
        app => app.status.toLowerCase() === status.toLowerCase()
    )
    return application ? application.label : 'Неизвестный статус'
}

export function ProviderRequests() {
    const [activeTab, setActiveTab] = useState(applications[0].label)
    const [activeStatus, setActiveStatus] = useState(
        statusMap[applications[0].label]
    )
    const isMobile = useBreakpoint('sm')

    const {
        data: requests,
        hasNextPage,
        fetchNextPage,
        isFetching,
    } = providerRequest.useGetAllProviderRequestQuery({
        limit: limit,
        search: JSON.stringify({
            status: activeStatus,
        }) as unknown as ProviderRequestSearchDto,
    })

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setActiveStatus(statusMap[tab])
    }

    return (
        <Flex direction='column' gap='lg'>
            <Flex gap='md' align='center'>
                <SegmentedControl
                    fullWidth
                    onChange={handleTabChange}
                    value={activeTab}
                    color='indigo.4'
                    data={[
                        {
                            value: 'В работе',
                            label: 'В работе',
                        },
                        {
                            value: 'Ожидание',
                            label: (
                                <Tooltip
                                    withArrow
                                    label='Вы откликнулись на эти заявки. Ждем выбора покупателя'
                                >
                                    <div>Ожидание</div>
                                </Tooltip>
                            ),
                        },
                        {
                            value: 'Завершённые',
                            label: 'Завершённые',
                        },
                    ]}
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                />
            </Flex>

            <Flex gap='sm' direction='column'>
                {requests?.length === 0 ? (
                    <Flex
                        justify='center'
                        direction='column'
                        align='center'
                        h='50vh'
                    >
                        <Text fw={600} size='xl'>
                            Здесь вы будете видеть все ваши заявки и их
                            результат. А пока загрузите товары в каталог
                        </Text>

                        <Text c='gray'>
                            {' '}
                            Это поможет вам выделиться на платформе
                        </Text>
                    </Flex>
                ) : (
                    <>
                        <Grid>
                            {requests?.map((order, index) => (
                                <Grid.Col
                                    span={{
                                        base: 12,
                                        md: 6,
                                    }}
                                    key={index}
                                >
                                    <Card
                                        shadow='sm'
                                        padding='lg'
                                        radius='lg'
                                        withBorder
                                    >
                                        <Text fw={500}>
                                            № {order.id} от{' '}
                                            {dayjs(order.createdAt).format(
                                                'YYYY-MM-DD'
                                            )}
                                        </Text>

                                        <Flex
                                            align='center'
                                            justify='space-between'
                                        >
                                            <Flex align='center' gap='md'>
                                                <Badge
                                                    color={
                                                        (
                                                            order.status as unknown as ProviderRequestStatus
                                                        ).toLowerCase() ===
                                                        'active'
                                                            ? 'green'
                                                            : (
                                                                    order.status as unknown as ProviderRequestStatus
                                                                ).toLowerCase() ===
                                                                'pending'
                                                              ? 'yellow'
                                                              : 'gray'
                                                    }
                                                    variant='light'
                                                >
                                                    {getLabelByStatus(
                                                        order.status as unknown as ProviderRequestStatus
                                                    )}
                                                </Badge>
                                                <Box w={300}>
                                                    {order.comment && (
                                                        <Text
                                                            size='sm'
                                                            c='blue'
                                                            style={{
                                                                marginBottom: 5,
                                                            }}
                                                            truncate='end'
                                                        >
                                                            {order.comment}{' '}
                                                        </Text>
                                                    )}
                                                </Box>
                                            </Flex>

                                            <Box>
                                                <IconMessage
                                                    size={30}
                                                    color={
                                                        (
                                                            order.status as unknown as ProviderRequestStatus
                                                        ).toLowerCase() ===
                                                        'Pending'
                                                            ? 'gray'
                                                            : 'black'
                                                    }
                                                />
                                            </Box>
                                        </Flex>
                                        <Divider
                                            orientation='horizontal'
                                            mt='md'
                                            mb='md'
                                        />

                                        <Flex direction='column' gap='md'>
                                            <Text size='sm'>
                                                <strong>
                                                    Информация по вашему заказу
                                                </strong>
                                            </Text>

                                            <Flex
                                                justify='space-between'
                                                align='center'
                                            >
                                                <Flex
                                                    direction='column'
                                                    gap='md'
                                                    maw={230}
                                                >
                                                    <Text size='sm'>
                                                        Название:{' '}
                                                        {
                                                            order.horecaRequest
                                                                ?.name
                                                        }
                                                    </Text>
                                                    <Text size='sm'>
                                                        Категории:{' '}
                                                        {
                                                            order.horecaRequest
                                                                ?.categories
                                                        }
                                                    </Text>
                                                </Flex>

                                                <Flex
                                                    direction='column'
                                                    gap='md'
                                                    maw={200}
                                                >
                                                    <Text size='sm'>
                                                        Адрес доставки:{' '}
                                                        {
                                                            order.horecaRequest
                                                                ?.address
                                                        }
                                                    </Text>
                                                    <Text size='sm'>
                                                        Дата доставки:{' '}
                                                        {dayjs(
                                                            order.horecaRequest
                                                                ?.deliveryTime
                                                        ).format(
                                                            'YYYY-MM-DD HH:mm'
                                                        )}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Box>
                                            <Button
                                                bg='transparent'
                                                c='indigo.4'
                                                onClick={e => {
                                                    {
                                                        e.preventDefault()
                                                        handleDetailsModal(
                                                            order.id
                                                        )
                                                    }
                                                }}
                                                p={0}
                                            >
                                                Посмотреть заявку
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid.Col>
                            ))}
                        </Grid>

                        {hasNextPage && (
                            <Flex justify='center'>
                                <Button
                                    onClick={() => fetchNextPage()}
                                    loading={isFetching}
                                    bg='indigo.4'
                                >
                                    Загрузить еще
                                </Button>
                            </Flex>
                        )}
                    </>
                )}
            </Flex>
        </Flex>
    )
}
