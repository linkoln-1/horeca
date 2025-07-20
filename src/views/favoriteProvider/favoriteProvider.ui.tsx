'use client'

import { useState } from 'react'

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
    Avatar,
} from '@mantine/core'
import Link from 'next/link'

import { getImageUrl } from '@/shared/helpers'

export function FavoriteProviderViews() {
    const { data: favourites } = favoritesQueries.useGetFavoriteProviderQuery()
    const [modalState, setModalState] = useState<null | number>(null)
    console.log(favourites);
    
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

            {favourites.data.map((suplier, index) => (
                <Flex w='100%' key={index}>
                    <Paper w='100%' withBorder shadow='sm' radius='lg' p='lg'>
                        <Flex>
                            <Flex w='100%' gap='md'>
                                <Avatar
                                    w={180}
                                    h={180}
                                    src={getImageUrl(
                                        suplier.provider?.avatar?.path
                                    )}
                                />

                                <Stack py='md' justify='space-between'>
                                    <Flex gap='md'>
                                        <Text fw={600} span size='md'>
                                            Наименование:
                                        </Text>
                                        <Text display='inline' size='md'>
                                            {suplier.provider.name.length >= 30
                                                ? `${suplier.provider.name.slice(0, 30)}...`
                                                : suplier.provider.name}
                                        </Text>
                                    </Flex>
                                    {/* <Flex gap='md'>
                                        <Text fw={600} span size='md'>
                                            Рейтинг:
                                        </Text>
                                        <Text display='inline' size='md'>
                                            {suplier.}
                                        </Text>
                                    </Flex> */}
                                </Stack>
                            </Flex>

                            <Stack
                                className='flex-1'
                                justify='center'
                                gap='36px'
                                align='center'
                            >
                                <Button
                                    href={``}
                                    component={Link}
                                    size='20px'
                                    className='cursor-pointer font-[400]'
                                    c='indigo'
                                    variant='transparent'
                                >
                                    Открыть список чатов
                                </Button>
                                <Text
                                    onClick={() =>
                                        setModalState(suplier.providerId)
                                    }
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
            ))}

            {modalState !== null && (
                <FavoriteProvidersModal
                    providerId={modalState}
                    onClose={() => setModalState(null)}
                />
            )}
        </Flex>
    )
}
