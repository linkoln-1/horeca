'use client'

import { useState } from 'react'

import { requestQueries } from '../../entities/horeca-request'
import { useUserStore } from '@/core/providers/userStoreContext'
import { handleApplicationsDetailsModals } from '@/views/applications/ui/applicationsDetailsModal'
import {
    Badge,
    Box,
    Button,
    Card,
    Divider,
    Flex,
    Grid,
    Loader,
    SegmentedControl,
    Text,
} from '@mantine/core'
import { IconMessage } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Link from 'next/link'

import { CategoryLabels } from '@/shared/constants'
import { applications } from '@/shared/constants/applications'
import { role } from '@/shared/helpers/getRole'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import {
    Categories,
    HorecaRequestSearchDto,
    HorecaRequestStatus,
    UserRole,
} from '@/shared/lib/horekaApi/Api'

const limit = 10

const statusMap: Record<string, HorecaRequestStatus> = {
    'В работе': HorecaRequestStatus.Active,
    'Ожидают откликов': HorecaRequestStatus.Pending,
    Завершённые: HorecaRequestStatus.CompletedSuccessfully,
}

export function ApplicationsViews() {
    const [activeTab, setActiveTab] = useState(applications[0].label)
    const [activeStatus, setActiveStatus] = useState(
        statusMap[applications[0].label]
    )

    const getLabelByStatus = (status: string): string => {
        const application = applications.find(
            app => app.status.toLowerCase() === status.toLowerCase()
        )
        return application ? application.label : 'Неизвестный статус'
    }

    const isMobile = useBreakpoint('sm')

    const {
        data: requests,
        hasNextPage,
        fetchNextPage,
        isFetching,
    } = requestQueries.useGetRequestQuery({
        limit: limit,
        search: {
            status: activeStatus as HorecaRequestStatus,
        },
    })

    const user = useUserStore(state => state.user)

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setActiveStatus(statusMap[tab])
    }

    return (
        <Flex direction='column' gap='md'>
            <Flex gap='md' align='center'>
                <SegmentedControl
                    fullWidth
                    onChange={handleTabChange}
                    value={activeTab}
                    color='indigo.4'
                    data={applications.map(app => app.label)}
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                    w={isMobile ? '100%' : ''}
                />
            </Flex>

            {!requests && (
                <Flex justify='center' align='center'>
                    <Loader />
                </Flex>
            )}

            {requests?.length === 0 ? (
                <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    h='60vh'
                >
                    <Text size='lg'>
                        Здесь будут отображаться ваши заказы. Начните с создания
                        заявки, чтобы найти нужных поставщиков
                    </Text>
                    <Text size='md' c='gray'>
                        Нажмите «Создать заявку» в левом меню
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
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Link
                                        href={`/user/${user && role({ user })}/applications/${order.id}/comparison`}
                                    >
                                        <Text fw={500}>
                                            Заявка № {order.id}
                                        </Text>
                                        <Flex
                                            align='center'
                                            justify='space-between'
                                        >
                                            <Flex align='center' gap='md'>
                                                <Badge
                                                    color={
                                                        order.status.toLowerCase() ===
                                                        'active'
                                                            ? 'green'
                                                            : order.status.toLowerCase() ===
                                                                'pending'
                                                              ? 'yellow'
                                                              : 'gray'
                                                    }
                                                    variant='light'
                                                    w={150}
                                                >
                                                    {getLabelByStatus(
                                                        order.status
                                                    )}
                                                </Badge>
                                                <Box>
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
                                                        order.status.toLowerCase() ===
                                                        'pending'
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
                                                align={
                                                    user?.role ===
                                                    UserRole.Horeca
                                                        ? 'start'
                                                        : 'center'
                                                }
                                            >
                                                <Flex
                                                    direction='column'
                                                    gap='md'
                                                    maw={230}
                                                >
                                                    {user?.role ===
                                                    UserRole.Horeca ? null : (
                                                        <Text size='sm'>
                                                            Название:{' '}
                                                            {order.name}
                                                        </Text>
                                                    )}
                                                    <Text size='sm'>
                                                        Категории:{' '}
                                                        {Array.from(
                                                            new Set(
                                                                order.items.map(
                                                                    item =>
                                                                        CategoryLabels[
                                                                            item.category as Categories
                                                                        ]
                                                                )
                                                            )
                                                        ).join(', ')}
                                                    </Text>
                                                </Flex>

                                                <Flex
                                                    direction='column'
                                                    gap='md'
                                                    maw={200}
                                                >
                                                    <Text size='sm'>
                                                        Адрес доставки:{' '}
                                                        {order.address}
                                                    </Text>
                                                    <Text size='sm'>
                                                        Дата доставки:{' '}
                                                        {dayjs(
                                                            order.deliveryTime
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
                                                        handleApplicationsDetailsModals(
                                                            order.id
                                                        )
                                                    }
                                                }}
                                                p={0}
                                            >
                                                Посмотреть заявку
                                            </Button>
                                        </Box>
                                    </Link>
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
    )
}
