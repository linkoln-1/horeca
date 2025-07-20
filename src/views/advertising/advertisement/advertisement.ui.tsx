'use client'

import { favoritesQueries } from '@/entities/favorites'
import { FavoriteProvidersModal } from '@/features/favoriteProviders/favoriteProviders.modal'
import {
    Box,
    Button,
    Divider,
    Flex,
    Paper,
    Text,
    Image as MantineImage,
    Stack,
    Loader,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import Link from 'next/link'

import { getImageUrl } from '@/shared/helpers'

type Info = {
    name: string
    manufacturer: string
    description?: string
}

export function Advertisement() {
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
                        Это список ваших постоянных клиентов. Сейчас тут пусто,
                        но, надеемся,
                    </Text>

                    <Text size='lg'>
                        скоро появятся первые постоянные клиенты ❤️
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
                                        src={getImageUrl(
                                            suplier.user?.avatar?.path
                                        )}
                                    />

                                    <Stack py='md' justify='space-between'>
                                        <Flex gap='md'>
                                            <Text fw={600} span size='md'>
                                                Наименование:
                                            </Text>

                                            <Text display='inline' size='md'>
                                                {suplier.user.name}
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
