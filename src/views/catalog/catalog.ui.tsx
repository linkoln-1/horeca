'use client'

import { useUserStore } from '@/core/providers/userStoreContext'
import { ProductsModal } from '@/features/products'
import {
    Box,
    Button,
    Flex,
    Menu,
    Paper,
    Text,
    Grid,
    Select,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconCaretDown } from '@tabler/icons-react'

import { CategoryLabels } from '@/shared/constants'
import { Categories } from '@/shared/lib/horekaApi/Api'

const categoryOptions = Object.values(Categories).map(category => ({
    value: category,
    label: CategoryLabels[category as Categories],
}))

export function Catalog() {
    const user = useUserStore(state => state.user)
    const tabData = [
        'Наименование',
        'Производитель',
        'Характеристики',
        'Фасовка',
        'Цена (за ед.)',
        'Кол-во',
        'Фотографии',
    ]
    const productData = [
        {
            name: 'Виски (Jack Daniels)',
            manufacturer: 'Diageo',
            characteristics:
                'Легендарный виски Jack Daniel’s состоит из 80% кукурузы, 12% ячменя и 8% ржи.',
            packaging: 'Бутылка',
            price: '5,500',
            quantity: '40,000',
            photos: 'photo1.jpg',
        },
        {
            name: 'Виски (Jack Daniels)',
            manufacturer: 'Diageo',
            characteristics:
                'Легендарный виски Jack Daniel’s состоит из 80% кукурузы, 12% ячменя и 8% ржи.',
            packaging: 'Бутылка',
            price: '5,500',
            quantity: '40,000',
            photos: 'photo1.jpg',
        },
        {
            name: 'Виски (Jack Daniels)',
            manufacturer: 'Diageo',
            characteristics:
                'Легендарный виски Jack Daniel’s состоит из 80% кукурузы, 12% ячменя и 8% ржи.',
            packaging: 'Бутылка',
            price: '5,500',
            quantity: '40,000',
            photos: 'photo1.jpg',
        },
        {
            name: 'Виски (Jack Daniels)',
            manufacturer: 'Diageo',
            characteristics:
                'Легендарный виски Jack Daniel’s состоит из 80% кукурузы, 12% ячменя и 8% ржи.',
            packaging: 'Бутылка',
            price: '5,500',
            quantity: '40,000',
            photos: 'photo1.jpg',
        },
        {
            name: 'Виски (Jack Daniels)',
            manufacturer: 'Diageo',
            characteristics:
                'Легендарный виски Jack Daniel’s состоит из 80% кукурузы, 12% ячменя и 8% ржи.',
            packaging: 'Бутылка',
            price: '5,500',
            quantity: '40,000',
            photos: 'photo1.jpg',
        },
    ]

    return (
        <Flex direction='column' gap='md'>
            <Flex justify='space-between' align='center'>
                <Select />

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
                        {tabData.map((tab, index) => (
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

                {productData.map((product, index) => (
                    <Paper p='md' withBorder key={index} bg='gray.0'>
                        <Grid justify='space-between'>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.name}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>
                                        {product.manufacturer}
                                    </Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md' truncate='end'>
                                        {product.characteristics}
                                    </Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.packaging}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.price}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.quantity}</Text>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 1 }}>
                                <Flex justify='center'>
                                    <Text size='md'>{product.photos}</Text>
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
