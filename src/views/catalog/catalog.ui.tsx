'use client'

import { useUserStore } from '@/core/providers/userStoreContext'
import { productsQueries } from '@/entities/products'
import { ProductsModal } from '@/features/products'
import {
    Box,
    Button,
    Flex,
    Paper,
    Text,
    Grid,
    Select,
    Loader,
    Image as MantineImage,
    Table,
} from '@mantine/core'
import { modals } from '@mantine/modals'

import { CategoryLabels } from '@/shared/constants'
import { packageTypeLabel } from '@/shared/constants/packageType'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    ProductPackagingType,
    ProviderProfileDto,
} from '@/shared/lib/horekaApi/Api'

const limit = 10

export function Catalog() {
    const user = useUserStore(state => state.user)

    const { data, hasNextPage, isFetching, fetchNextPage } =
        productsQueries.useGetProductsInfiniteQuery({
            limit,
        })

    return (
        <Flex direction='column' gap='md'>
            {data ? (
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
                                onClick={handleModal}
                            >
                                Добавить новый товар
                            </Button>
                        </Box>
                    </Flex>

                    <Flex direction='column' gap='md'>
                        <Table>
                            <Table.Thead bg='indigo.4'>
                                {[
                                    'Наименование',
                                    'Производитель',
                                    'Характеристики',
                                    'Фасовка',
                                    'Цена (за ед.)',
                                    'Кол-во',
                                    'Фотографии',
                                ].map((tab, index) => (
                                    <Table.Th key={index} c='#FFF' p='md'>
                                        {tab}
                                    </Table.Th>
                                ))}
                            </Table.Thead>

                            <Table.Tbody>
                                {data?.map((product, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td align='center' p='md'>
                                            {product.name}
                                        </Table.Td>

                                        <Table.Td align='center' p='md'>
                                            {product.producer}
                                        </Table.Td>

                                        <Table.Td align='center' p='md'>
                                            {product.description}
                                        </Table.Td>

                                        <Table.Td align='center' p='md'>
                                            {
                                                packageTypeLabel[
                                                    product.packagingType as ProductPackagingType
                                                ]
                                            }
                                        </Table.Td>

                                        <Table.Td align='center' p='md'>
                                            {product.cost}
                                        </Table.Td>

                                        <Table.Td align='center' p='md'>
                                            {product.count}
                                        </Table.Td>

                                        <Table.Td align='center' p='md'>
                                            {product.images?.map((x, index) => (
                                                <MantineImage
                                                    key={index}
                                                    src={getImageUrl(
                                                        `/${x.path}`
                                                    )}
                                                />
                                            ))}
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
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
            ) : (
                <Flex justify='center' align='center' direction='column'>
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

function handleModal() {
    modals.open({
        centered: true,
        modalId: 'product',
        size: 'xl',
        children: <ProductsModal />,
    })
}
