'use client'

import React, { useState } from 'react'

import { requestQueries } from '@/entities/horeca-request'
import { FinishApplicationModal } from '@/features/application/detail/finishApplicationModal'
import { OpenApplicationModal } from '@/features/application/detail/openApplicationModal'
import { OpenOfferModal } from '@/features/application/detail/openOfferModal'
import { handleApplicationsDetailsModals } from '@/views/applications/ui/applicationsDetailsModal'
import {
    Box,
    Button,
    Card,
    Divider,
    Flex,
    Loader,
    Paper,
    Text,
    Title,
} from '@mantine/core'
import { Image as MantineImage } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconProgress, IconZoomIn } from '@tabler/icons-react'
import dayjs from 'dayjs'

import { applicationResponse, CategoryLabels } from '@/shared/constants'
import { Categories } from '@/shared/lib/horekaApi/Api'

export function ApplicationsDetailViews({ id }: { id: string }) {
    const [opened, setOpened] = useState<number | null>(null)

    const { data, isLoading } = requestQueries.useGetRequestByIdQuery(+id)

    // const orders = [
    //     {
    //         id: 1,
    //         title: 'Шаблон №1',
    //         created: '11.12.2024',
    //         products: [
    //             {
    //                 id: 1,
    //                 category: 'Безалкогольные напитки, вода, соки',
    //                 items: ['Вода Эвиан', 'Сок Рич', 'Смузи'],
    //             },
    //             {
    //                 id: 2,
    //                 category: 'Безалкогольные напитки, вода, соки',
    //                 items: ['Вода Эвиан', 'Сок Рич', 'Смузи'],
    //             },
    //         ],
    //     },
    // ]

    if (isLoading) return <Loader />

    return (
        <Flex direction='column' gap='md'>
            <Flex direction='column' mb='xl' gap='md'>
                {data &&
                    [data].map(order => (
                        <Card
                            key={order.id}
                            shadow='sm'
                            p={0}
                            withBorder
                            w='100%'
                        >
                            <Flex gap='md'>
                                <Flex
                                    miw={250}
                                    direction='column'
                                    gap='md'
                                    bg='indigo.6'
                                    align='start'
                                    c='#fff'
                                    px='md'
                                    py='lg'
                                >
                                    <Text>{order.name}</Text>
                                    <Text>Создан:</Text>
                                    <Text>
                                        {dayjs(order.createdAt).format(
                                            'YYYY-MM-DD HH:mm'
                                        )}
                                    </Text>
                                </Flex>

                                <Flex
                                    w='100%'
                                    direction='column'
                                    gap='md'
                                    p='md'
                                >
                                    {order.items.map(product => {
                                        return (
                                            <>
                                                <Box key={product.id}>
                                                    <Flex
                                                        mb='lg'
                                                        direction='column'
                                                    >
                                                        <Text c='gray.5'>
                                                            Категория товаров:
                                                        </Text>
                                                        <Text>
                                                            {
                                                                CategoryLabels[
                                                                    product.category as Categories
                                                                ]
                                                            }
                                                        </Text>
                                                    </Flex>

                                                    <Flex direction='column'>
                                                        <Text c='gray.5'>
                                                            Наименование:
                                                        </Text>
                                                        <Text>
                                                            {product.name}
                                                        </Text>
                                                    </Flex>
                                                </Box>
                                                {order.items.length > 1 && (
                                                    <Divider />
                                                )}
                                            </>
                                        )
                                    })}

                                    <Flex justify='flex-end' gap='md'>
                                        <Button
                                            c='blue'
                                            fw='500'
                                            px='0'
                                            variant='transparent'
                                            onClick={() =>
                                                handleApplicationsDetailsModals(
                                                    order.id
                                                )
                                            }
                                        >
                                            Открыть для просмотра
                                        </Button>
                                        <Button
                                            c='pink.7'
                                            fw='500'
                                            px='0'
                                            variant='transparent'
                                            onClick={
                                                handleFinishApplicationModal
                                            }
                                        >
                                            Завершить
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
            </Flex>

            <Flex direction='column'>
                <Title mb='md' order={4} c='pink.7'>
                    Вы получили 3 отлика на заявку:{' '}
                </Title>

                {applicationResponse.map((response, index) => {
                    return (
                        <Paper
                            mb='lg'
                            key={index}
                            withBorder
                            shadow='sm'
                            mah={opened !== index ? '435px' : ''}
                            className='overflow-hidden transition-all duration-200'
                        >
                            <Flex className='cursor-pointer' mih='435px'>
                                <Box miw={200}>
                                    <Flex
                                        c={
                                            response.accordance > 80
                                                ? 'green'
                                                : response.accordance > 40
                                                  ? 'yellow'
                                                  : 'red'
                                        }
                                        align='center'
                                        gap='sm'
                                        p='lg'
                                    >
                                        <IconProgress />
                                        <Text size='lg'>
                                            {response.accordance}% совпадения
                                        </Text>
                                    </Flex>
                                    <Divider />
                                    <Box p='lg'>
                                        <Text fw='500' mb='sm' size='lg'>
                                            Предложение №2323412
                                        </Text>

                                        <Box mb='sm'>
                                            <Text c='gray.5'>
                                                Дата отклика:
                                            </Text>
                                            <Text c='gray.5'>11.12.2024</Text>
                                        </Box>
                                        <Box>
                                            <Text c='gray.5'>
                                                Время отклика:
                                            </Text>
                                            <Text c='gray.5'>17:05</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider orientation='vertical' />
                                <Box
                                    pos='relative'
                                    w='78%'
                                    mb='lg'
                                    ml='auto'
                                    px='lg'
                                    py='md'
                                >
                                    <Flex
                                        direction='column'
                                        align='center'
                                        pos='absolute'
                                        right={40}
                                    >
                                        <MantineImage
                                            w={100}
                                            h={100}
                                            radius='md'
                                            src='/assets/images/bg-5.png'
                                        />
                                        <Text size='lg'>4.9 / 5.0</Text>
                                    </Flex>
                                    <Text
                                        mb='sm'
                                        c={
                                            response.inStock
                                                ? 'indigo'
                                                : 'pink.7'
                                        }
                                    >
                                        {response.inStock
                                            ? 'Есть в наличии'
                                            : 'Нет в наличии'}
                                    </Text>
                                    {response.products?.map((product: any) => {
                                        return (
                                            <>
                                                <Box
                                                    key={product.id}
                                                    onClick={e =>
                                                        handleOpenOfferModal(e)
                                                    }
                                                >
                                                    <Box mb='sm'>
                                                        <Text
                                                            mr='xs'
                                                            fw='600'
                                                            component='span'
                                                        >
                                                            Категории товаров:
                                                        </Text>
                                                        <Text component='span'>
                                                            {product.category}
                                                        </Text>
                                                    </Box>
                                                    {product.items?.map(
                                                        (item: any) => {
                                                            return (
                                                                <>
                                                                    <Box
                                                                        key={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        <Box mb='sm'>
                                                                            <Text
                                                                                c='gray.5'
                                                                                mr='xs'
                                                                                fw='500'
                                                                                component='span'
                                                                            >
                                                                                Наименование:
                                                                            </Text>
                                                                            <Text component='span'>
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </Text>
                                                                        </Box>

                                                                        <Box mb='sm'>
                                                                            <Text
                                                                                c='gray.5'
                                                                                mr='xs'
                                                                                fw='500'
                                                                                component='span'
                                                                            >
                                                                                Цена
                                                                                за
                                                                                30
                                                                                литров:
                                                                            </Text>
                                                                            <Text component='span'>
                                                                                {
                                                                                    item.price
                                                                                }
                                                                            </Text>
                                                                        </Box>

                                                                        <Box mb='sm'>
                                                                            <Text
                                                                                c='gray.5'
                                                                                mr='xs'
                                                                                fw='500'
                                                                                component='span'
                                                                            >
                                                                                Производитель:
                                                                            </Text>
                                                                            <Text component='span'>
                                                                                {
                                                                                    item.manufacturer
                                                                                }
                                                                            </Text>
                                                                        </Box>
                                                                        <Box mb='sm'>
                                                                            <Text
                                                                                c='gray.5'
                                                                                mr='xs'
                                                                                mb='sm'
                                                                                fw='500'
                                                                            >
                                                                                Фотографии:
                                                                            </Text>
                                                                            <Flex
                                                                                mah='100%'
                                                                                gap='sm'
                                                                                style={{
                                                                                    overflowX:
                                                                                        'auto',
                                                                                }}
                                                                            >
                                                                                {item.images?.map(
                                                                                    (
                                                                                        image: string,
                                                                                        index: number
                                                                                    ) => {
                                                                                        return (
                                                                                            <Box
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                pos='relative'
                                                                                                style={{
                                                                                                    cursor: 'pointer',
                                                                                                }}
                                                                                            >
                                                                                                <MantineImage
                                                                                                    w='110px'
                                                                                                    h='80px'
                                                                                                    fit='cover'
                                                                                                    src={
                                                                                                        image
                                                                                                    }
                                                                                                />
                                                                                                <IconZoomIn
                                                                                                    style={{
                                                                                                        position:
                                                                                                            'absolute',
                                                                                                        top: 5,
                                                                                                        right: 5,
                                                                                                    }}
                                                                                                    color='#fff'
                                                                                                    stroke='2'
                                                                                                />
                                                                                            </Box>
                                                                                        )
                                                                                    }
                                                                                )}
                                                                            </Flex>
                                                                        </Box>
                                                                    </Box>
                                                                </>
                                                            )
                                                        }
                                                    )}
                                                </Box>
                                                {product.comment && (
                                                    <Box mb='sm'>
                                                        <Text
                                                            c='gray.5'
                                                            mr='xs'
                                                            fw='500'
                                                            component='span'
                                                        >
                                                            Комментарий:
                                                        </Text>
                                                        <Text component='span'>
                                                            {product.comment}
                                                        </Text>
                                                    </Box>
                                                )}
                                                <Divider my='lg' />
                                            </>
                                        )
                                    })}
                                    <Flex
                                        top='356px'
                                        right='20px'
                                        pos={
                                            opened !== index
                                                ? 'absolute'
                                                : undefined
                                        }
                                        justify='flex-end'
                                    >
                                        <Button
                                            size='md'
                                            fw='500'
                                            variant='transparent'
                                            onClick={
                                                opened !== index
                                                    ? () => setOpened(index)
                                                    : () => setOpened(null)
                                            }
                                        >
                                            {opened === index
                                                ? 'Свернуть'
                                                : 'Развернуть'}
                                        </Button>
                                        <Button
                                            size='md'
                                            fw='500'
                                            variant='transparent'
                                        >
                                            Перейти в чат
                                        </Button>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Paper>
                    )
                })}
            </Flex>
        </Flex>
    )
}

function handleFinishApplicationModal() {
    modals.open({
        modalId: 'finishApplicationModal',
        size: 'lg',
        centered: true,
        radius: 'lg',
        padding: 'md',
        children: <FinishApplicationModal />,
    })
}

// function handleOpenApplicationModal() {
//     modals.open({
//         modalId: 'openApplicationModal',
//         title: 'Заявка № 8978735892560',
//         size: '900px',
//         centered: true,
//         radius: 'lg',
//         padding: 'xl',
//         children: <OpenApplicationModal />,
//     })
// }

function handleOpenOfferModal(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    modals.open({
        modalId: 'openOfferModal',
        title: 'Предложение № 89777',
        size: '900px',
        centered: true,
        radius: 'lg',
        padding: 'xl',
        children: <OpenOfferModal />,
    })
}
