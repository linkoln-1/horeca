'use client'

import React from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { productsQueries } from '@/entities/products'
import { handleModal } from '@/features/products'
import { handleUpdateModal } from '@/views/catalog/ui/update-modal'
import {
    Box,
    Button,
    Flex,
    Text,
    Select,
    Loader,
    Image as MantineImage,
    Table,
    ActionIcon,
    Tooltip,
} from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import { CategoryLabels } from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import { Categories, ProviderProfileDto } from '@/shared/lib/horekaApi/Api'

const limit = 10

export function Catalog() {
    const user = useUserStore(state => state.user)

    const { data, hasNextPage, isFetching, fetchNextPage } =
        productsQueries.useGetProductsInfiniteQuery({
            limit,
        })

    if (!data) {
        return (
            <Flex justify='center' align='center' h='50vh'>
                <Loader size='xl' />
            </Flex>
        )
    }

    return (
        <Flex direction='column' gap='md'>
            {data && data.length > 0 && (
                <Flex direction='column' gap='lg'>
                    <Flex justify='space-between' align='center'>
                        <Select
                            data={(
                                user?.profile as ProviderProfileDto
                            )?.categories.map(x => ({
                                value: x,
                                label: CategoryLabels[x as Categories],
                            }))}
                            placeholder='Выберите категорию'
                        />

                        <Box>
                            <Button
                                variant='filled'
                                size='md'
                                color='indigo.4'
                                onClick={() => handleModal()}
                            >
                                Добавить новый товар
                            </Button>
                        </Box>
                    </Flex>

                    <Flex direction='column' gap='md'>
                        <Table withRowBorders withColumnBorders>
                            <Table.Thead bg='indigo.4'>
                                <Table.Tr>
                                    {[
                                        'Наименование',
                                        'Производитель',
                                        'Характеристики',
                                        'Фасовка',
                                        'Цена (за ед.)',
                                        'Кол-во',
                                        'Фотографии',
                                        'Действия',
                                    ].map((tab, index) => (
                                        <Table.Th key={index} c='#FFF' p='md'>
                                            <Flex justify='center'>{tab}</Flex>
                                        </Table.Th>
                                    ))}
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {data?.map((product, index) => {
                                    return (
                                        <Table.Tr key={index}>
                                            <Table.Td align='center' p='md'>
                                                {product.name}
                                            </Table.Td>

                                            <Table.Td align='center' p='md'>
                                                {product.producer}
                                            </Table.Td>

                                            <Table.Td align='center' p='md'>
                                                {product.description === 'beer'
                                                    ? 'Пиво'
                                                    : product.description}
                                            </Table.Td>

                                            <Table.Td align='center' p='md'>
                                                {product.packagingType}
                                            </Table.Td>

                                            <Table.Td align='center' p='md'>
                                                {product.cost}
                                            </Table.Td>

                                            <Table.Td align='center' p='md'>
                                                {product.count}
                                            </Table.Td>

                                            <Table.Td
                                                align='center'
                                                p='md'
                                                w={300}
                                            >
                                                {product.images &&
                                                product.images.length === 0 ? (
                                                    <Text>Нет фотографии</Text>
                                                ) : (
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns:
                                                                'repeat(3, 60px)',
                                                            gap: '8px',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        {product.images?.map(
                                                            (x, index) => (
                                                                <MantineImage
                                                                    key={index}
                                                                    radius='md'
                                                                    src={getImageUrl(
                                                                        x.path
                                                                    )}
                                                                    alt='portfolio'
                                                                    className='aspect-square'
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </Table.Td>

                                            <Table.Td align='center' p='md'>
                                                <Flex gap='md' justify='center'>
                                                    <Tooltip
                                                        label='Редактировать товар'
                                                        bg='indigo.4'
                                                        c='white'
                                                    >
                                                        <ActionIcon
                                                            bg='indigo'
                                                            onClick={() =>
                                                                handleUpdateModal(
                                                                    {
                                                                        id: product.id,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <IconEdit
                                                                size={18}
                                                            />
                                                        </ActionIcon>
                                                    </Tooltip>

                                                    <Tooltip
                                                        label='Удалить товар'
                                                        bg='pink.5'
                                                        c='white'
                                                    >
                                                        <ActionIcon bg='red'>
                                                            <IconTrash
                                                                size={18}
                                                            />
                                                        </ActionIcon>
                                                    </Tooltip>
                                                </Flex>
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Flex>

                    {hasNextPage && (
                        <Flex maw={200} w='100%' className='mx-auto'>
                            <Button
                                fullWidth
                                onClick={() => fetchNextPage()}
                                loading={isFetching}
                                bg='indigo.4'
                            >
                                Загрузить еще
                            </Button>
                        </Flex>
                    )}
                </Flex>
            )}

            {data && data.length === 0 && (
                <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    h='50vh'
                >
                    <Text size='lg'>
                        Заполните каталог, чтобы привлечь внимание к своим
                        товарам и выделиться на платформе!
                    </Text>
                    <Text size='md' c='gray'>
                        Нажмите на кнопку «Добавить товар» в правом верхнем
                        углу.
                    </Text>
                </Flex>
            )}
        </Flex>
    )
}
