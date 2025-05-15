'use client'

import React from 'react'

import { requestQueries } from '@/entities/horeca-request'
import { FinishApplicationModal } from '@/features/application/detail/finishApplicationModal'
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

import { CategoryLabels } from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    HorecaRequestWithProviderRequestsDto,
} from '@/shared/lib/horekaApi/Api'

export function ApplicationsDetailViews({ id }: { id: string }) {
    const { data, isLoading } = requestQueries.useGetRequestByIdQuery(+id)

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
                                    {order.items.map(product => (
                                        <React.Fragment key={product.id}>
                                            <Box>
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
                                                    <Text>{product.name}</Text>
                                                </Flex>
                                            </Box>
                                            {order.items.length > 1 && (
                                                <Divider />
                                            )}
                                        </React.Fragment>
                                    ))}

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
                                            onClick={() =>
                                                handleFinishApplicationModal(
                                                    order.id
                                                )
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
                    Вы получили {data?.providerRequests.length} отклика на
                    заявку:
                </Title>

                {data?.providerRequests.map(response => (
                    <Paper
                        key={response.id}
                        mb='lg'
                        withBorder
                        shadow='sm'
                        className='overflow-hidden transition-all duration-200'
                    >
                        <Flex className='cursor-pointer' mih='435px'>
                            <Box miw={200}>
                                <Flex
                                    c={
                                        response.cover > 80
                                            ? 'green'
                                            : response.cover > 40
                                              ? 'yellow'
                                              : 'red'
                                    }
                                    align='center'
                                    gap='sm'
                                    p='lg'
                                >
                                    <IconProgress />
                                    <Text size='lg'>
                                        {response.cover}% совпадения
                                    </Text>
                                </Flex>
                                <Divider />
                                <Box p='lg'>
                                    <Text fw='500' mb='sm' size='lg'>
                                        Предложение №{response.id}
                                    </Text>
                                    <Box mb='sm'>
                                        <Text c='gray.5'>Дата отклика:</Text>
                                        <Text>
                                            {dayjs(response.createdAt).format(
                                                'DD.MM.YYYY'
                                            )}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text c='gray.5'>Время отклика:</Text>
                                        <Text>
                                            {dayjs(response.createdAt).format(
                                                'HH:mm'
                                            )}
                                        </Text>
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
                                    <Text size='lg'>
                                        {data.providerRequests[0].user.rating} /
                                        5.0
                                    </Text>
                                </Flex>

                                <Text
                                    mb='sm'
                                    c={response ? 'indigo' : 'pink.7'}
                                >
                                    {response
                                        ? 'Есть в наличии'
                                        : 'Нет в наличии'}
                                </Text>

                                {response.items?.map(
                                    (product, productIndex) => {
                                        const matchingItem =
                                            data.items.find(
                                                item => item.id === product.id
                                            ) || data.items[productIndex]

                                        return (
                                            <React.Fragment key={product.id}>
                                                <Box
                                                    onClick={e =>
                                                        handleOpenOfferModal(
                                                            e,
                                                            response.id,
                                                            data
                                                        )
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
                                                            {matchingItem?.category
                                                                ? CategoryLabels[
                                                                      matchingItem.category as Categories
                                                                  ]
                                                                : 'Не указана'}
                                                        </Text>
                                                    </Box>

                                                    <Box>
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
                                                                {matchingItem?.name ||
                                                                    'Не указано'}
                                                            </Text>
                                                        </Box>

                                                        <Box mb='sm'>
                                                            <Text
                                                                c='gray.5'
                                                                mr='xs'
                                                                fw='500'
                                                                component='span'
                                                            >
                                                                Цена:
                                                            </Text>
                                                            <Text component='span'>
                                                                {product.cost}
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
                                                                    product.manufacturer
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
                                                                {product.images?.map(
                                                                    (
                                                                        image,
                                                                        imgIndex
                                                                    ) => (
                                                                        <Box
                                                                            key={
                                                                                imgIndex
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
                                                                                src={getImageUrl(
                                                                                    image.path
                                                                                )}
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
                                                                )}
                                                            </Flex>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                {response.comment && (
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
                                                            {response.comment}
                                                        </Text>
                                                    </Box>
                                                )}
                                                <Divider my='md' />
                                            </React.Fragment>
                                        )
                                    }
                                )}

                                <Flex
                                    top='376px'
                                    right='20px'
                                    justify='flex-end'
                                >
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
                ))}
            </Flex>
        </Flex>
    )
}

function handleFinishApplicationModal(requestId: number) {
    modals.open({
        modalId: 'finishApplicationModal',
        size: 'lg',
        centered: true,
        radius: 'lg',
        padding: 'md',
        children: (
            <FinishApplicationModal
                requestId={requestId}
                onCancel={() => modals.close('finishApplicationModal')}
                onSuccess={() => {
                    modals.close('finishApplicationModal')
                }}
            />
        ),
    })
}

function handleOpenOfferModal(
    e: React.MouseEvent<HTMLDivElement>,
    title: number,
    data: HorecaRequestWithProviderRequestsDto
) {
    e.stopPropagation()
    modals.open({
        modalId: 'openOfferModal',
        title: `Предложение №${title}`,
        size: '900px',
        centered: true,
        radius: 'lg',
        padding: 'xl',
        children: (
            <OpenOfferModal
                requestData={data}
                onClose={() => modals.close('openOfferModal')}
            />
        ),
    })
}
