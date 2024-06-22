'use client'

import { Box, Button, Divider, Flex, Paper, Text } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Info = {
    name: string
    manufacturer: string
    description?: string
}

type FakeHistory = {
    id: number
    number: number
    data: string
    text: string
    link?: string
    linkText?: string
    info: Info
    infoCategory: Info
}

export function Advertisement() {
    const router = usePathname()
    const fakeHistory: FakeHistory[] = [
        {
            id: 1,
            number: 524252,
            data: '20.05.2023',
            text: 'Опубликовано (оплачено)',
            info: {
                name: 'Палтус (в наличии)',
                manufacturer: 'ИП Громов А.Б.',
                description:
                    'Палтус — как и полагается представителю семейства камбаловых — рыба плоская; ее еще называют морским языком — но какую только рыбу так не называют',
            },
            infoCategory: {
                name: 'Название',
                manufacturer: 'Производитель',
                description: 'Описание',
            },
        },
        {
            id: 2,
            number: 524252,
            data: '20.05.2023',
            text: 'Отклонено (отсутствует описание товара)',
            info: {
                name: 'Палтус (в наличии)',
                manufacturer: 'ИП Громов А.Б.',
            },
            infoCategory: {
                name: 'Название',
                manufacturer: 'Производитель',
            },
            link: '#',
            linkText: 'Заполнить заявку снова',
        },
        {
            id: 3,
            number: 524252,
            data: '20.05.2023',
            text: 'Объявление соответствует требованиям',
            info: {
                name: 'Палтус (в наличии)',
                manufacturer: 'ИП Громов А.Б.',
                description:
                    'Палтус — как и полагается представителю семейства камбаловых — рыба плоская; ее еще называют морским языком — но какую только рыбу так не называют',
            },
            infoCategory: {
                name: 'Название',
                manufacturer: 'Производитель',
                description: 'Описание',
            },
            link: '#',
            linkText: 'Перейти к оплате',
        },
    ]

    return (
        <Flex direction='column' gap='md'>
            <Box>
                <Button
                    variant='transparent'
                    component={Link}
                    color={
                        router === '/user/advertising/rates' ? 'blue' : 'black'
                    }
                    href='/user/advertising/rates'
                    fw={400}
                >
                    Тарифы
                </Button>
                <Button
                    variant='transparent'
                    component={Link}
                    href='/user/advertising/advertisement'
                    color={
                        router === '/user/advertising/advertisement'
                            ? 'blue'
                            : 'black'
                    }
                    fw={400}
                >
                    История заявок
                </Button>
            </Box>

            <Flex gap='md' direction='column'>
                {fakeHistory.map(item => (
                    <Box key={item.id}>
                        <Paper withBorder shadow='sm' p='md'>
                            <Text mb='sm' fw={700} size='xl'>
                                № {item.number} от {item.data}
                            </Text>
                            <Text
                                mb='sm'
                                c={
                                    item.text === 'Опубликовано (оплачено)'
                                        ? 'green'
                                        : item.text ===
                                            'Отклонено (отсутствует описание товара)'
                                          ? 'red'
                                          : item.text ===
                                              'Объявление соответствует требованиям'
                                            ? 'orange'
                                            : 'black'
                                }
                            >
                                {item.text}
                            </Text>
                            <Divider my='xs' size='xs' color='gray.4' />
                            <Box>
                                <Text fw={700} mb={10}>
                                    Информация по вашему товару
                                </Text>
                                <Flex direction='column' flex={1} gap='xs'>
                                    {Object.keys(item.info).map(key => (
                                        <Text key={key} size='sm' c='dimmed'>
                                            {
                                                item.infoCategory[
                                                    key as keyof Info
                                                ]
                                            }
                                            : {item.info[key as keyof Info]}
                                        </Text>
                                    ))}
                                </Flex>
                            </Box>
                            {item.link && item.linkText ? (
                                <Button
                                    component={Link}
                                    size='md'
                                    mt={25}
                                    w='100%'
                                    href={item.link}
                                    color={
                                        item.linkText === 'Перейти к оплате'
                                            ? 'orange'
                                            : 'blue'
                                    }
                                >
                                    <Text>{item.linkText}</Text>
                                </Button>
                            ) : null}
                        </Paper>
                    </Box>
                ))}
            </Flex>
        </Flex>
    )
}
