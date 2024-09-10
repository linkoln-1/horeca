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

export function Catalog() {
    const user = useUserStore(state => state.user)

    const { data, isPending } = productsQueries.useProductsInfiniteQuery()

    if (!data) return <Loader />

    return (
        <Flex direction='column' gap='md'>
            <Flex justify='space-between' align='center'>
                <Select
                    data={(user?.profile as ProviderProfileDto)?.categories.map(
                        x => ({
                            value: x,
                            label: CategoryLabels[x as Categories],
                        })
                    )}
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
                <Paper p='md' withBorder bg='indigo.4'>
                    <Grid justify='space-between'>
                        {[
                            'Наименование',
                            'Производитель',
                            'Характеристики',
                            'Фасовка',
                            'Цена (за ед.)',
                            'Кол-во',
                            'Фотографии',
                        ].map((tab, index) => (
                            <Grid.Col
                                span={{
                                    base: 12,
                                    md: 1,
                                }}
                                key={index}
                            >
                                <Flex justify='center'>
                                    <Text size='md' c='gray.0'>
                                        {tab}
                                    </Text>
                                </Flex>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Paper>

                {data.data.map((product, index) => (
                    <Paper p='md' withBorder key={index} bg='gray.0'>
                        <Grid justify='space-between'>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.name}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.producer}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center' w='fit-content'>
                                    <Text size='md'>{product.description}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>
                                        {
                                            packageTypeLabel[
                                                product.packagingType as ProductPackagingType
                                            ]
                                        }
                                    </Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.cost}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.count}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    {product.productImage.map((x, index) => (
                                        <MantineImage
                                            key={index}
                                            src={getImageUrl(
                                                `/${x.image.path}`
                                            )}
                                        />
                                    ))}
                                </Flex>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                ))}
            </Flex>
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
