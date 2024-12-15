'use client'

import { favoritesQueries } from '@/entities/favorites'
import { FavoriteProvidersModal } from '@/features/favoriteProviders/favoriteProviders.modal'
import {
    Image as MantineImage,
    Flex,
    Paper,
    Text,
    Stack,
    Button,
    Loader,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import Link from 'next/link'

export function FavoriteProviderViews() {
    const { data: favourites } = favoritesQueries.useGetFavoriteProviderQuery()

    if (!favourites) return <Loader />

    return (
        <Flex direction='column' gap='xl' p='md'>
            {favourites.data.length === 0 && (
                <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    h='70vh'
                >
                    <Text size='lg'>
                        Это список ваших любимых поставщиков. Добавляйте
                        поставщика в избранные ❤️ после первой успешной сделки.
                    </Text>
                    <Text size='md' c='gray'>
                        Опция появится в чате с поставщиком после завершения
                        работы по заказу
                    </Text>
                </Flex>
            )}

            {favourites.data.map((suplier, index) => {
                return (
                    <Flex w='100%' key={index}>
                        <Paper
                            w='100%'
                            withBorder
                            shadow='sm'
                            radius='lg'
                            p='lg'
                        >
                            <Flex>
                                <Flex w='100%' gap='md'>
                                    <MantineImage
                                        fit='cover'
                                        w={180}
                                        h={180}
                                        radius='md'
                                        // src={suplier.img}
                                    />

                                    <Stack py='md' justify='space-between'>
                                        <Flex gap='md'>
                                            <Text fw={600} span size='md'>
                                                Наименование:
                                            </Text>

                                            <Text display='inline' size='md'>
                                                тут будет наиаменование
                                                {/*{suplier.name}*/}
                                            </Text>
                                        </Flex>
                                        <Flex gap='md'>
                                            <Text fw={600} span size='md'>
                                                Рейтинг:
                                            </Text>

                                            <Text display='inline' size='md'>
                                                тут будет рейтинг
                                                {/*{suplier.rating} / 5*/}
                                            </Text>
                                        </Flex>
                                        <Flex gap='md'>
                                            <Text fw={600} size='md'>
                                                Категории товаров:
                                            </Text>
                                            <Text size='md'>
                                                тут будут категории товаров
                                                {/*{suplier.categories.map(*/}
                                                {/*    category => {*/}
                                                {/*        return (*/}
                                                {/*            category + '; '*/}
                                                {/*        )*/}
                                                {/*    }*/}
                                                {/*)}*/}
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
                                        href='/user/horeca/chat/2'
                                        component={Link}
                                        size='20px'
                                        className='cursor-pointer font-[400]'
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
