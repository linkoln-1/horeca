'use client'

import { Box, Button, Card, Checkbox, Flex, List, Text } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'

import '@/styles/template.scss'

export function TemplateApplicationViews() {
    const templates = [
        {
            id: 1,
            title: 'Шаблон №1',
            created: '11.12.2024',
            products: [
                {
                    id: 1,
                    category: 'Безалкогольные напитки, вода, соки',
                    items: ['Вода Эвиан', 'Сок Рич', 'Смузи'],
                },
            ],
        },
        {
            id: 2,
            title: 'Шаблон №2',
            created: '11.12.2024',
            edited: '11.12.2024',
            products: [
                {
                    id: 1,
                    category: 'Безалкогольные напитки, вода, соки',
                    items: ['Вода Эвиан', 'Сок Рич', 'Смузи'],
                },
                {
                    id: 2,
                    category: 'Мороженое, Шоколад',
                    items: [
                        'Ванильное',
                        'Шоколадное',
                        'Фисташковое',
                        'Горький',
                        'Белый',
                    ],
                },
            ],
        },
        {
            id: 3,
            title: 'Шаблон №3',
            created: '11.12.2024',
            products: [
                {
                    id: 1,
                    category: 'Морепродукты',
                    items: ['Лосось', 'Сёмга'],
                },
            ],
        },
    ]

    const templateMenuMock = [
        {
            id: 1,
            label: 'Все шаблоны заявок',
            value: 'all',
            templates: [
                {
                    id: 101,
                    title: 'Шаблон №1',
                    created: '11.12.2024',
                    link: '/templates/101',
                },
                {
                    id: 102,
                    title: 'Шаблон №2',
                    created: '11.12.2024',
                    edited: '11.12.2024',
                    category: 'Мороженое, Шоколад',
                    items: [
                        'Ванильное',
                        'Шоколадное',
                        'Фисташковое',
                        'Горький',
                        'Белый',
                    ],
                    link: '/templates/102',
                },
                {
                    id: 103,
                    title: 'Шаблон №3',
                    created: '11.12.2024',
                    category: 'Морепродукты',
                    items: ['Лосось', 'Сёмга'],
                    link: '/templates/103',
                },
            ],
        },
        {
            id: 2,
            label: 'Шаблоны для бара',
            value: 'bar',
            templates: [
                {
                    id: 201,
                    title: 'Барный шаблон №1',
                    created: '10.12.2024',
                    category: 'Алкогольные напитки',
                    items: ['Виски', 'Ром', 'Текила'],
                    link: '/templates/201',
                },
            ],
        },
        {
            id: 3,
            label: 'Шаблоны для кухни',
            value: 'kitchen',
            templates: [
                {
                    id: 301,
                    title: 'Кухонный шаблон №1',
                    created: '09.12.2024',
                    category: 'Закуски',
                    items: ['Оливки', 'Сыр', 'Колбаса'],
                    link: '/templates/301',
                },
                {
                    id: 302,
                    title: 'Кухонный шаблон №2',
                    created: '08.12.2024',
                    category: 'Горячие блюда',
                    items: ['Пицца', 'Паста', 'Суп'],
                    link: '/templates/302',
                },
            ],
        },
        {
            id: 4,
            label: 'Шаблоны для банкета',
            value: 'banquet',
            templates: [
                {
                    id: 401,
                    title: 'Банкетный шаблон №1',
                    created: '07.12.2024',
                    category: 'Основные блюда',
                    items: ['Стейк', 'Утка', 'Говядина'],
                    link: '/templates/401',
                },
            ],
        },
    ]

    return (
        <>
            <Flex mb='lg' justify='flex-end'>
                <Button ml='auto' w='fit-content' radius='lg' bg='pink.7'>
                    Создать новый шаблон
                    <IconArrowRight />
                </Button>
            </Flex>
            <Flex gap='xl'>
                <Flex direction='column' gap='md'>
                    <Flex direction='column' gap='md'>
                        <Box>
                            <List>
                                {templateMenuMock.map(x => (
                                    <List.Item
                                        py='sm'
                                        mb='sm'
                                        className='sidebar border-b'
                                        key={x.id}
                                    >
                                        <Text size='md' fw={500}>
                                            {x.label}
                                        </Text>
                                    </List.Item>
                                ))}
                            </List>
                        </Box>
                    </Flex>

                    <Flex direction='column' gap='md'>
                        <Text fw={500} size='md'>
                            Категории товаров
                        </Text>
                        <Checkbox
                            radius='xs'
                            color='indigo'
                            label='Морепродукты'
                            defaultChecked
                        />
                        <Checkbox
                            radius='xs'
                            color='indigo'
                            label='Мясо птицы'
                        />
                        <Checkbox
                            radius='xs'
                            color='indigo'
                            label='Мороженое'
                        />
                        <Checkbox
                            radius='xs'
                            color='indigo'
                            label='Алкогольные напитки'
                        />
                        <Checkbox
                            radius='xs'
                            color='indigo'
                            label='Безалкогольные напитки, вода, соки'
                        />
                    </Flex>
                    <Button bg='indigo' radius='lg'>
                        Применить
                    </Button>
                </Flex>

                <Flex direction='column' gap='lg' w='100%'>
                    {templates.map(template => (
                        <Card
                            key={template.id}
                            shadow='sm'
                            p={0}
                            withBorder
                            w='100%'
                        >
                            <Flex gap='md'>
                                <Flex
                                    w={250}
                                    direction='column'
                                    gap='md'
                                    bg='indigo.6'
                                    align='start'
                                    c='#fff'
                                    px='md'
                                    py='lg'
                                >
                                    <Text>{template.title}</Text>
                                    <Text>Создан:</Text>
                                    <Text>{template.created}</Text>
                                </Flex>

                                <Flex direction='column' gap='md' p='md'>
                                    {template.products.map(product => {
                                        return (
                                            <div key={product.id}>
                                                <Flex direction='column'>
                                                    <Text c='gray.5'>
                                                        Категория товаров:
                                                    </Text>
                                                    <Text>
                                                        {product.category}
                                                    </Text>
                                                </Flex>

                                                <Flex direction='column'>
                                                    <Text c='gray.5'>
                                                        Наименование:
                                                    </Text>
                                                    <Text>
                                                        {product.items.join(
                                                            ', '
                                                        )}
                                                    </Text>
                                                </Flex>
                                            </div>
                                        )
                                    })}

                                    <Flex gap='md'>
                                        <Button
                                            c='blue'
                                            fw='500'
                                            px='0'
                                            variant='transparent'
                                        >
                                            Открыть для просмотра
                                        </Button>
                                        <Button
                                            c='pink.7'
                                            fw='500'
                                            px='0'
                                            variant='transparent'
                                        >
                                            Редактировать шаблон
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}
