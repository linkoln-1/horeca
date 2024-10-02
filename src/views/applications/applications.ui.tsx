import {
    Badge,
    Box,
    Button,
    Card,
    Divider,
    Flex,
    Select,
    Text,
} from '@mantine/core'
import { IconChevronRight, IconMessage } from '@tabler/icons-react'
import Link from 'next/link'

export function ApplicationsViews() {
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
                <Button variant='transparent' c='gray' p={0}>
                    Все заявки
                </Button>

                <Select
                    placeholder='Выберите из списка'
                    data={[
                        'Текущие заявки',
                        'В работе(чат доступен)',
                        'Ожидает подтверждения(чат недоступен)',
                    ]}
                    defaultValue='Текущие заявки'
                />
                <Select
                    placeholder='Выберите из списка'
                    data={['Успешные', 'Неуспешные', 'Завершенные заказы']}
                    defaultValue='Завершенные заказы'
                />
            </Flex>

            <Flex direction='column' gap='md'>
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
                            <Divider orientation='horizontal' mt='md' mb='md' />
                            <Flex justify='flex-start'>
                                <Button
                                    href={`/user/horeca/applications/${index}`}
                                    component={Link}
                                    variant='transparent'
                                    c='indigo'
                                    rightSection={<IconChevronRight />}
                                >
                                    Смотреть все
                                </Button>
                            </Flex>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Flex>
    )
}
