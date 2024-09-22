'use client'

import { FavoriteProvidersModal } from '@/features/favoriteProviders/favoriteProviders.modal'
import {
    Image as MantineImage,
    Flex,
    Paper,
    Text,
    Stack,
    Button,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import Link from 'next/link'

type Supplier = {
    img: string
    name: string
    rating: number
    categories: string[]
}

const suppliers: Supplier[] = [
    {
        img: '/assets/images/bg-5.png',
        name: 'ООО МОРЕАНИ',
        rating: 4.6,
        categories: ['Рыба, морепродукты, бакалея'],
    },
    {
        img: '/assets/images/bg-5.png',
        name: 'ИП ИВАНОВ',
        rating: 4.8,
        categories: ['Молочные продукты, яйца'],
    },
    {
        img: '/assets/images/bg-5.png',
        name: 'ИП ПЕТРОВ',
        rating: 3.0,
        categories: ['Посуда и кухонные принадлежности'],
    },
    {
        img: '/assets/images/bg-5.png',
        name: 'ООО РОМАШКА',
        rating: 5.0,
        categories: [
            'Посуда и кухонные принадлежности',
            'Прикасса (чипсы, снеки, семечки)',
            'Продукты быстрого приготовления, лапша',
            'Рыба и морепродукты',
            'Свежие овощи, фрукты, зелень, грибы',
            'Уборка и чистящие средства',
            'Хлеб, хлебобулочные изделия',
            'Чай, кофе, какао, заменители',
        ],
    },
]

export function FavoriteProviderViews() {
    return (
        <Flex direction='column' gap='40px' p='md'>
            {suppliers.map((suplier, index) => {
                return (
                    <Flex className='supplier' w='100%' key={index}>
                        <Paper
                            w='100%'
                            px={100}
                            py={63}
                            withBorder
                            shadow='sm'
                            radius='lg'
                            p='xl'
                        >
                            <Flex className='supplierWrapper'>
                                <Flex w='75%'>
                                    <MantineImage
                                        fit='cover'
                                        mr='100px'
                                        w={180}
                                        h={180}
                                        radius='md'
                                        src={suplier.img}
                                    />

                                    <Stack py='20px' justify='space-between'>
                                        <Flex>
                                            <Text size='20px'>
                                                <Text fw={500} mr='5px' span>
                                                    Наименование:
                                                </Text>

                                                <Text
                                                    display='inline'
                                                    size='20px'
                                                >
                                                    {suplier.name}
                                                </Text>
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <Text size='20px'>
                                                <Text fw={500} mr='5px' span>
                                                    Рейтинг:
                                                </Text>

                                                <Text
                                                    display='inline'
                                                    size='20px'
                                                >
                                                    {suplier.rating} / 5
                                                </Text>
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <Text size='20px'>
                                                <Text fw={500} mr='5px' span>
                                                    Категории товаров:
                                                </Text>
                                                <Text
                                                    lh='md'
                                                    display='inline'
                                                    size='20px'
                                                >
                                                    {suplier.categories.map(
                                                        category => {
                                                            return (
                                                                category + '; '
                                                            )
                                                        }
                                                    )}
                                                </Text>
                                            </Text>
                                        </Flex>
                                    </Stack>
                                </Flex>

                                <Stack
                                    className='flex-1'
                                    justify='center'
                                    gap='36px'
                                    align='center'
                                >
                                    <Button
                                        href='/provider/chat'
                                        component={Link}
                                        size='20px'
                                        className='cursor-pointer'
                                        c='indigo'
                                        variant='transparent'
                                    >
                                        Открыть список чатов
                                    </Button>
                                    <Text
                                        onClick={handleModal}
                                        size='20px'
                                        className='cursor-pointer'
                                        c='pink.7'
                                    >
                                        Удалить из избранного
                                    </Text>
                                </Stack>
                            </Flex>
                        </Paper>
                    </Flex>
                )
            })}
        </Flex>
    )
}

function handleModal() {
    modals.open({
        centered: true,
        modalId: 'favoriteProvider',
        radius: 'lg',
        size: 'xl',
        children: <FavoriteProvidersModal />,
    })
}
