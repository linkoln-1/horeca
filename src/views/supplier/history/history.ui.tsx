'use client'

import { Flex, Text, Paper, Box, Divider } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
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
type InfoData = {
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
    infoData: InfoData
    commentary?: string
    seeAll?: string
    comment?: string
}
type fakeHistory_2 = {
    id: number
    number: number
    data: string
    text: string
    title: string
    info: Info
    infoData: InfoData
    seeAll: string
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
            comment: 'Комментарий: ',
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
            comment: 'Комментарий: ',
        },
    ]

    const fakeHistory_2: fakeHistory_2[] = [
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
            seeAll: 'Смотреть все ',
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
            seeAll: 'Смотреть все ',
        },
    ]

    return (
        <Flex gap='sm' justify='center' align='center' direction='column'>
            {/*{fakeHistory.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <Paper key={index} withBorder w='70%' pt='md' pl='md'>*/}
            {/*            <Text fw={700}>*/}
            {/*                № {item.number} от {item.data}*/}
            {/*            </Text>*/}
            {/*            <Flex justify='space-between'>*/}
            {/*                <Paper pt='md' pb='lg' w='100%'>*/}
            {/*                    <Text*/}
            {/*                        c={*/}
            {/*                            item.text ===*/}
            {/*                            'В работе (1 новое сообщение в чате)'*/}
            {/*                                ? 'red'*/}
            {/*                                : item.text ===*/}
            {/*                                    'Ожидает подтверждения (чат недоступен)'*/}
            {/*                                  ? 'blue'*/}
            {/*                                  : 'black'*/}
            {/*                        }*/}
            {/*                        key={item.id}*/}
            {/*                    >*/}
            {/*                        {item.text}*/}
            {/*                    </Text>*/}

            {/*                    <Divider*/}
            {/*                        my='xs'*/}
            {/*                        size='xs'*/}
            {/*                        color='gray.4'*/}
            {/*                        orientation='horizontal'*/}
            {/*                    />*/}
            {/*                    /!* Тут должен быть svg с сообщением  *!/*/}
            {/*                </Paper>*/}
            {/*            </Flex>*/}

            {/*            <Paper pb='lg'>*/}
            {/*                <Flex>*/}
            {/*                    <Flex*/}
            {/*                        direction='column'*/}
            {/*                        pt='md'*/}
            {/*                        flex={1}*/}
            {/*                        gap='xs'*/}
            {/*                    >*/}
            {/*                        <Text size='xl' fw={700}>*/}
            {/*                            {item.title}*/}
            {/*                        </Text>*/}
            {/*                        {Object.keys(item.info)*/}
            {/*                            .slice(0, 4)*/}
            {/*                            .map(key => (*/}
            {/*                                <Text key={key} c='dimmed'>*/}
            {/*                                    {*/}
            {/*                                        item.infoData[*/}
            {/*                                            key as keyof InfoData*/}
            {/*                                        ]*/}
            {/*                                    }*/}
            {/*                                    : {item.info[key as keyof Info]}*/}
            {/*                                </Text>*/}
            {/*                            ))}*/}
            {/*                    </Flex>*/}
            {/*                    <Flex direction='column' flex={1} mt='xl'>*/}
            {/*                        {Object.keys(item.info)*/}
            {/*                            .slice(4)*/}
            {/*                            .map(key => (*/}
            {/*                                <Text key={key} c='dimmed'>*/}
            {/*                                    {*/}
            {/*                                        item.infoData[*/}
            {/*                                            key as keyof InfoData*/}
            {/*                                        ]*/}
            {/*                                    }*/}
            {/*                                    : {item.info[key as keyof Info]}*/}
            {/*                                </Text>*/}
            {/*                            ))}*/}
            {/*                    </Flex>*/}
            {/*                </Flex>*/}

            {/*                <Divider*/}
            {/*                    my='xs'*/}
            {/*                    size='xs'*/}
            {/*                    color='gray.4'*/}
            {/*                    orientation='horizontal'*/}
            {/*                />*/}
            {/*            </Paper>*/}
            {/*            <Text color='dimmed' style={{ marginTop: 10 }}>*/}
            {/*                {item.comment} {item.commentary}*/}
            {/*            </Text>*/}
            {/*            /!* Тут должен быть ряд из картинок png *!/*/}
            {/*        </Paper>*/}
            {/*    )*/}
            {/*})}*/}
            {/*{fakeHistory_2.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <Paper*/}
            {/*            key={index}*/}
            {/*            withBorder*/}
            {/*            style={{ width: '70%', padding: '35px 45px' }}*/}
            {/*        >*/}
            {/*            <Text fw={700}>*/}
            {/*                № {item.number} от {item.data}*/}
            {/*            </Text>*/}
            {/*            <Paper*/}
            {/*                style={{*/}
            {/*                    padding: '20px 0 30px 0',*/}
            {/*                    borderBottom: '1px solid #ccc',*/}
            {/*                    borderRadius: 0,*/}
            {/*                    width: '100%',*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <Text*/}
            {/*                    color={*/}
            {/*                        item.text === 'Завершена (успешно)'*/}
            {/*                            ? 'green'*/}
            {/*                            : item.text === 'Завершена (неуспешно)'*/}
            {/*                              ? 'red'*/}
            {/*                              : 'black'*/}
            {/*                    }*/}
            {/*                >*/}
            {/*                    {item.text}*/}
            {/*                </Text>*/}
            {/*                /!* Тут тоже должна быть svg картинка в виде сообщения *!/*/}
            {/*            </Paper>*/}
            {/*            <Paper*/}
            {/*                style={{*/}
            {/*                    borderBottom: '1px solid #ccc',*/}
            {/*                    maxWidth: '100%',*/}
            {/*                    borderRadius: 0,*/}
            {/*                    paddingBottom: '30px',*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <Flex direction='row'>*/}
            {/*                    <Flex direction='column'>*/}
            {/*                        <Text*/}
            {/*                            size='xl'*/}
            {/*                            fw={700}*/}
            {/*                            style={{ padding: '10px 0 10px 0' }}*/}
            {/*                        >*/}
            {/*                            {item.title}*/}
            {/*                        </Text>*/}
            {/*                        {Object.keys(item.info)*/}
            {/*                            .slice(0, 3)*/}
            {/*                            .map(key => (*/}
            {/*                                <Text key={key} c='dimmed'>*/}
            {/*                                    {*/}
            {/*                                        item.infoData[*/}
            {/*                                            key as keyof InfoData*/}
            {/*                                        ]*/}
            {/*                                    }*/}
            {/*                                    : {item.info[key as keyof Info]}*/}
            {/*                                </Text>*/}
            {/*                            ))}*/}
            {/*                    </Flex>*/}
            {/*                    <Flex*/}
            {/*                        direction='column'*/}
            {/*                        style={{ flex: 1, marginTop: 55 }}*/}
            {/*                    >*/}
            {/*                        {Object.keys(item.info)*/}
            {/*                            .slice(3)*/}
            {/*                            .map(key => (*/}
            {/*                                <Text key={key} c='dimmed'>*/}
            {/*                                    {*/}
            {/*                                        item.infoData[*/}
            {/*                                            key as keyof InfoData*/}
            {/*                                        ]*/}
            {/*                                    }*/}
            {/*                                    : {item.info[key as keyof Info]}*/}
            {/*                                </Text>*/}
            {/*                            ))}*/}
            {/*                    </Flex>*/}
            {/*                </Flex>*/}
            {/*            </Paper>*/}
            {/*            <Flex*/}
            {/*                direction='row'*/}
            {/*                component={Link}*/}
            {/*                href=''*/}
            {/*                style={{ marginTop: 10 }}*/}
            {/*            >*/}
            {/*                <Text color='blue'>{item.seeAll}</Text>*/}
            {/*                <Text color='blue'>*/}
            {/*                    <IconChevronRight stroke={1.25} />*/}
            {/*                </Text>*/}
            {/*            </Flex>*/}
            {/*        </Paper>*/}
            {/*    )*/}
            {/*})}*/}
        </Flex>
    )
}
