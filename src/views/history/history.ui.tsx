'use client'

import { Flex, Text, Paper, Box, Divider, Button, Menu } from '@mantine/core'
import { IconCaretDown, IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'

type Info = {
    category: string
    name: string
    price: string
    manufacturer?: string
    deliveryAddres: string
    deliveryDate: string
    deliveryMethod?: string
}

type HistoryItem = {
    id: number
    number: number
    data: string
    text: string
    title: string
    info: Info
    infoData: Info
    commentary?: string
}

export function History() {
    const fakeHistory: HistoryItem[] = [
        {
            id: 1,
            number: 524252,
            data: '20.06.2023',
            text: 'В работе (1 новое сообщение в чате)',
            title: 'Информация по вашему предложению',
            info: {
                category: 'Морепродукты',
                name: 'Палтус (в наличии)',
                price: '50000 тыс.руб. (за 50 кг)',
                manufacturer: 'ООО "Ледокол"',
                deliveryAddres: 'ул. Белокобыльская, 69',
                deliveryDate: '12.08.2023',
                deliveryMethod: 'Транспортом поставщика',
            },
            infoData: {
                category: 'Категория',
                name: 'Название',
                price: 'Цена',
                manufacturer: 'Производитель',
                deliveryAddres: 'Адрес доставки',
                deliveryDate: 'Дата доставки',
                deliveryMethod: 'Способ доставки',
            },
            commentary:
                'свежее привезли вчера. Палтус — как и полагается представителю ' +
                '\n семейства камбаловых — рыба плоская; ее еще называют морским языком — ' +
                '\n но какую только рыбу так не называют. У палтуса вкусное жирное белое ' +
                '\n мясо и очень мало костей. Одна беда — если рыбу неправильно хранили, ' +
                '\n есть риск, что на сковородке она превратится в кашу',
        },

        {
            id: 2,
            number: 524252,
            data: '20.06.2023',
            text: 'Ожидает подтверждения (чат недоступен)',
            title: 'Информация по вашему предложению',
            info: {
                category: 'Морепродукты',
                name: 'Палтус (в наличии)',
                price: '50000 тыс.руб. (за 50 кг)',
                manufacturer: 'ООО "Ледокол"',
                deliveryAddres: 'ул. Красногвардейская, 25',
                deliveryDate: '12.08.2023',
                deliveryMethod: 'Транспортом поставщика',
            },
            infoData: {
                category: 'Категория',
                name: 'Название',
                price: 'Цена',
                manufacturer: 'Производитель',
                deliveryAddres: 'Адрес доставки',
                deliveryDate: 'Дата доставки',
                deliveryMethod: 'Способ доставки',
            },
            commentary: 'нет',
        },
    ]

    const fakeHistory_2: HistoryItem[] = [
        {
            id: 3,
            number: 524252,
            data: '20.05.2023',
            text: 'Завершена (успешно)',
            title: 'Информация по вашему предложению',
            info: {
                category: 'Морепродукты',
                name: 'Палтус (в наличии)',
                price: '50000 тыс.руб. (за 50 кг)',
                deliveryAddres: 'ул. Лесная, 6',
                deliveryDate: '12.08.2023',
            },
            infoData: {
                category: 'Категория',
                name: 'Название',
                price: 'Цена',
                deliveryAddres: 'Адрес доставки',
                deliveryDate: 'Дата доставки',
                deliveryMethod: 'Способ доставки',
            },
        },
        {
            id: 4,
            number: 524252,
            data: '20.05.2023',
            text: 'Завершена (неуспешно)',
            title: 'Информация по вашему предложению',
            info: {
                category: 'Морепродукты',
                name: 'Палтус (в наличии)',
                price: '50000 тыс.руб. (за 50 кг)',
                deliveryAddres: 'ул. Лесная, 6',
                deliveryDate: '12.08.2023',
            },
            infoData: {
                category: 'Категория',
                name: 'Название',
                price: 'Цена',
                deliveryAddres: 'Адрес доставки',
                deliveryDate: 'Дата доставки',
                deliveryMethod: 'Способ доставки',
            },
        },
    ]

    return (
        <Flex direction='column' gap='lg'>
            <Flex gap='md' align='center'>
                <Button variant='transparent' component={Link} href='#'>
                    Все заявки
                </Button>

                <Menu offset={11} withArrow>
                    <Menu.Target>
                        <Button
                            variant='transparent'
                            c='gray.7'
                            rightSection={<IconCaretDown stroke={1} />}
                        >
                            Текущие заявки
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item>В работе (чат доступен)</Menu.Item>
                        <Menu.Item>
                            Ожидает подтверждения (чат недоступен)
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Menu offset={11} withArrow>
                    <Menu.Target>
                        <Button
                            variant='transparent'
                            c='gray.7'
                            rightSection={<IconCaretDown stroke={1} />}
                        >
                            Завершенные заявки
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item>Успешные</Menu.Item>
                        <Menu.Item>Неуспешные</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Flex>

            <Flex gap='sm' direction='column'>
                {fakeHistory.map(historyItem => (
                    <Paper withBorder p='md' key={historyItem.id}>
                        <Text fw={700}>
                            № {historyItem.number} от {historyItem.data}
                        </Text>
                        <Box>
                            <Text
                                c={
                                    historyItem.text.includes('В работе')
                                        ? 'red'
                                        : 'blue'
                                }
                            >
                                {historyItem.text}
                            </Text>
                            <Divider my='xs' size='xs' color='gray.4' />
                        </Box>
                        <Box>
                            <Text size='xl' fw={700}>
                                {historyItem.title}
                            </Text>
                            <Flex>
                                <Flex direction='column' flex={1} gap='xs'>
                                    {Object.keys(historyItem.info)
                                        .slice(0, 4)
                                        .map(key => (
                                            <Text key={key} c='dimmed'>
                                                {
                                                    historyItem.infoData[
                                                        key as keyof Info
                                                    ]
                                                }
                                                :{' '}
                                                {
                                                    historyItem.info[
                                                        key as keyof Info
                                                    ]
                                                }
                                            </Text>
                                        ))}
                                </Flex>
                                <Flex direction='column' flex={1}>
                                    {Object.keys(historyItem.info)
                                        .slice(4)
                                        .map(key => (
                                            <Text key={key} c='dimmed'>
                                                {
                                                    historyItem.infoData[
                                                        key as keyof Info
                                                    ]
                                                }
                                                :{' '}
                                                {
                                                    historyItem.info[
                                                        key as keyof Info
                                                    ]
                                                }
                                            </Text>
                                        ))}
                                </Flex>
                            </Flex>
                            <Divider my='xs' size='xs' color='gray.4' />
                            <Text c='dimmed' mt='sm'>
                                Комментарий: {historyItem.commentary}
                            </Text>
                        </Box>
                    </Paper>
                ))}

                {fakeHistory_2.map(historyItem => (
                    <Paper withBorder p='md' key={historyItem.id}>
                        <Text fw={700}>
                            № {historyItem.number} от {historyItem.data}
                        </Text>
                        <Box>
                            <Text
                                c={
                                    historyItem.text.includes('В работе')
                                        ? 'red'
                                        : 'blue'
                                }
                            >
                                {historyItem.text}
                            </Text>
                            <Divider my='xs' size='xs' color='gray.4' />
                        </Box>
                        <Box>
                            <Text size='xl' fw={700}>
                                {historyItem.title}
                            </Text>
                            <Flex>
                                <Flex direction='column' flex={1} gap='xs'>
                                    {Object.keys(historyItem.info)
                                        .slice(0, 4)
                                        .map(key => (
                                            <Text key={key} c='dimmed'>
                                                {
                                                    historyItem.infoData[
                                                        key as keyof Info
                                                    ]
                                                }
                                                :{' '}
                                                {
                                                    historyItem.info[
                                                        key as keyof Info
                                                    ]
                                                }
                                            </Text>
                                        ))}
                                </Flex>
                                <Flex direction='column' flex={1}>
                                    {Object.keys(historyItem.info)
                                        .slice(4)
                                        .map(key => (
                                            <Text key={key} c='dimmed'>
                                                {
                                                    historyItem.infoData[
                                                        key as keyof Info
                                                    ]
                                                }
                                                :{' '}
                                                {
                                                    historyItem.info[
                                                        key as keyof Info
                                                    ]
                                                }
                                            </Text>
                                        ))}
                                </Flex>
                            </Flex>
                            <Divider my='xs' size='xs' color='gray.4' />

                            <Button
                                component={Link}
                                href='#'
                                rightSection={<IconChevronRight />}
                                c='blue'
                                variant='transparent'
                                mt='sm'
                            >
                                Смотреть все
                            </Button>
                        </Box>
                    </Paper>
                ))}
            </Flex>
        </Flex>
    )
}
