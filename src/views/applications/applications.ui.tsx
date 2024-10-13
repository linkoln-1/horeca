"use client"
import { applications } from '@/shared/constants/applications'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import {
    Badge,
    Box,
    Card,
    Divider,
    Flex,
    SegmentedControl,
    Text,
} from '@mantine/core'
import { IconMessage } from '@tabler/icons-react'
import { useState } from 'react'

export function ApplicationsViews() {
    const [activeTab, setActiveTab] = useState(applications[0].label)
    const isMobile = useBreakpoint('sm')
    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }
    const orders = [
        {
            id: '82725225279 от 20.07.2023',
            status: 'В работе',
            message: '1 новое сообщение в чате',
            name: 'Палтус',
            address: 'ул. Белокобыльская, 69',
            weight: '50 кг',
            deliveryDate: '12.08.2023',
            success: true,
        },
        {
            id: '82725225279 от 20.06.2023',
            status: 'Ожидает подтверждения (чат недоступен)',
            name: 'Палтус',
            address: 'ул. Белокобыльская, 69',
            weight: '50 кг',
            deliveryDate: '12.08.2023',
            success: true,
        },
        {
            id: '82725225279 от 20.06.2023',
            status: 'Завершена (успешно)',
            name: 'Палтус',
            address: 'ул. Белокобыльская, 69',
            weight: '50 кг',
            deliveryDate: '12.08.2023',
            success: true,
        },
        {
            id: '82725225279 от 20.06.2023',
            status: 'Завершена (неуспешно)',
            name: 'Палтус',
            address: 'ул. Белокобыльская, 69',
            weight: '50 кг',
            deliveryDate: '12.08.2023',
            success: false,
        },
    ]

    return (
        <Flex direction='column' gap='md'>
            <Flex gap='md' align='center'>
                <SegmentedControl
                    fullWidth
                    onChange={handleTabChange}
                    value={activeTab}
                    color='blue'
                    data={[applications[0].label, applications[1].label, applications[2].label]}
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                />
            </Flex>

            <Flex gap='md'>
                {orders.map((order, index) => (
                    <Card
                        shadow='sm'
                        padding='lg'
                        radius='lg'
                        withBorder
                        key={index}
                    >
                        <Text fw={500}>№ {order.id}</Text>

                        <Flex align='center' justify='space-between'>
                            <Flex align='center' gap='md'>
                                <Badge
                                    color={order.success ? 'green' : 'red'}
                                    variant='light'
                                >
                                    {order.status}
                                </Badge>
                                {order.message && (
                                    <Text
                                        size='sm'
                                        c='blue'
                                        style={{ marginBottom: 5 }}
                                    >
                                        {order.message}{' '}
                                    </Text>
                                )}
                            </Flex>

                            <Box>
                                <IconMessage size={30} />
                            </Box>
                        </Flex>
                        <Divider orientation='horizontal' mt='md' mb='md' />

                        <Flex direction='column' gap='md'>
                            <Text size='sm'>
                                <strong>Информация по вашему заказу</strong>
                            </Text>

                            <Flex justify='space-between' align='center'>
                                <Flex direction='column' gap='md'>
                                    <Text size='sm'>
                                        Название: {order.name}
                                    </Text>
                                    <Text size='sm'>
                                        Количество: {order.weight}
                                    </Text>
                                </Flex>

                                <Flex direction='column' gap='md'>
                                    <Text size='sm'>
                                        Адрес доставки: {order.address}
                                    </Text>
                                    <Text size='sm'>
                                        Дата доставки: {order.deliveryDate}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Flex>
    )
}
