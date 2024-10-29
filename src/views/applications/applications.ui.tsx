'use client'

import { useState } from 'react'

import { requestQueries } from '../../entities/horeca-request'
import {
    Badge,
    Box,
    Card,
    Divider,
    Flex,
    Grid,
    Loader,
    SegmentedControl,
    Text,
} from '@mantine/core'
import { IconMessage } from '@tabler/icons-react'

import { applications } from '@/shared/constants/applications'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function ApplicationsViews() {
    const [activeTab, setActiveTab] = useState(applications[0].label)
    const isMobile = useBreakpoint('sm')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }
    const { data: requests } = requestQueries.useGetRequestQuery()

    if (!requests) return <Loader />

    // TODO тут насколько я понял запрос не по типам возвращает данные, после как бэк вернется, нужно проверить
    return (
        <Flex direction='column' gap='md'>
            {!requests.data ? (
                <Flex justify='center' align='center' direction='column'>
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
                    <Flex gap='md' align='center'>
                        <SegmentedControl
                            fullWidth
                            onChange={handleTabChange}
                            value={activeTab}
                            color='indigo.4'
                            data={[
                                applications[0].label,
                                applications[1].label,
                                applications[2].label,
                            ]}
                            orientation={isMobile ? 'vertical' : 'horizontal'}
                        />
                    </Flex>
                    <Grid>
                        {requests.data.map((order, index) => (
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
                                    <Text fw={500}>№ {order.id}</Text>

                                    <Flex
                                        align='center'
                                        justify='space-between'
                                    >
                                        <Flex align='center' gap='md'>
                                            <Badge
                                                // color={order ? 'green' : 'red'}
                                                variant='light'
                                                c='indigo.4'
                                            >
                                                {/*{order.}*/}
                                                тут будут статусы
                                            </Badge>
                                            {order.comment && (
                                                <Text
                                                    size='sm'
                                                    c='blue'
                                                    style={{ marginBottom: 5 }}
                                                >
                                                    {order.comment}{' '}
                                                </Text>
                                            )}
                                        </Flex>

                                        <Box>
                                            <IconMessage size={30} />
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
                                            {order.items.map((item, index) => (
                                                <Flex
                                                    direction='column'
                                                    gap='md'
                                                    key={index}
                                                >
                                                    <Text size='sm'>
                                                        Название: {order.name}
                                                    </Text>
                                                    <Text size='sm'>
                                                        Количество:{' '}
                                                        {item.amount}
                                                    </Text>
                                                </Flex>
                                            ))}

                                            <Flex direction='column' gap='md'>
                                                <Text size='sm'>
                                                    Адрес доставки:{' '}
                                                    {order.address}
                                                </Text>
                                                <Text size='sm'>
                                                    Дата доставки:{' '}
                                                    {order.deliveryTime}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                </>
            )}
        </Flex>
    )
}
