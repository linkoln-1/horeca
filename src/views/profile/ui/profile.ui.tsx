'use client'

import { useUserStore } from '@/core/providers/userStoreContext'
import { Box, Button, Flex, Grid, Paper, Text } from '@mantine/core'
import {
    IconCalendarClock,
    IconLayoutBoardSplit,
    IconLayoutList,
    IconQuestionMark,
    IconSettings,
    IconShoppingCart,
    Icon,
} from '@tabler/icons-react'
import Link from 'next/link'

import { CustomAvatarUpload } from '@/shared/ui/CustomAvatarUpload'

export function ProfileView() {
    const user = useUserStore(state => state.user)

    const menuList = [
        {
            id: 1,
            name: 'История заявок',
            icon: IconCalendarClock,
            description: 'История ваших предложений и чаты с покупателями',
            link: '/user/warning',
            button: 'Перейти к предложениям',
        },
        {
            id: 2,
            name: 'Входящие заявки',
            icon: IconLayoutList,
            description: 'Вы можете откликаться на любые заявки!',
            link: '/user/products/applications',
            button: 'Перейти к заявкам',
        },
        {
            id: 3,
            name: 'Мой каталог',
            icon: IconLayoutBoardSplit,
            description: 'Предложите ваши товары всему общепиту на площадке!',
            link: '/user/catalog',
        },
        {
            id: 4,
            name: 'Реклама',
            icon: IconShoppingCart,
            description: 'Здесь можно купить рекламу на площадке',
            link: '/user/advertising/advertisement',
        },
        {
            id: 5,
            name: 'Служба заботы',
            icon: IconQuestionMark,
            description: 'У вас пока нет ни одного запроса к нам',
            link: '/user/service',
        },
        {
            id: 6,
            name: 'Настройки',
            icon: IconSettings,
            description:
                'Вы можете изменить условия доставки и категории товара, по которым принимаете заявки',
            link: '/user/settings',
        },
    ]
    return (
        <Flex direction='column' gap='md'>
            <Grid>
                <Grid.Col
                    span={{
                        base: 12,
                        md: 4,
                    }}
                >
                    <Flex direction='column' gap='xl'>
                        <Paper p='md' shadow='xs' bg='gray.1'>
                            <Flex gap='md' align='center' direction='column'>
                                <Box w={240} h={240}>
                                    <CustomAvatarUpload
                                        onChange={() => {}}
                                        src={''}
                                        size='100%'
                                        color='blue'
                                        className='aspect-square cursor-pointer'
                                    />
                                </Box>
                                <Box>
                                    <Flex direction='column' gap='lg'>
                                        {[user].map(item => (
                                            <Flex
                                                key={item && item.id}
                                                direction='column'
                                                gap='md'
                                                justify='center'
                                                align='center'
                                            >
                                                <Text size='xl' fw={700}>
                                                    {item && item.name}
                                                </Text>

                                                <Text>
                                                    email: {item && item.email}
                                                </Text>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>
                            </Flex>
                        </Paper>

                        <Paper bg='gray.1' p='md' h={170}>
                            <Flex direction='column' gap='md'>
                                <Text>Мой баланс:</Text>
                                <Text>0 руб.</Text>

                                <Button
                                    variant='filled'
                                    size='md'
                                    color='blue'
                                    fullWidth
                                >
                                    Пополнить баланс
                                </Button>
                            </Flex>
                        </Paper>
                    </Flex>
                </Grid.Col>

                <Grid.Col
                    span={{
                        base: 12,
                        md: 8,
                    }}
                >
                    <Grid>
                        {menuList.map(x => {
                            const Icon = x.icon as Icon
                            return (
                                <Grid.Col
                                    key={x.id}
                                    span={{
                                        base: 12,
                                        sm: 6,
                                    }}
                                >
                                    <Paper p='md' shadow='xs' bg='gray.1'>
                                        <Link href={x.link}>
                                            <Flex gap='md' h={120}>
                                                <Icon
                                                    stroke={2}
                                                    color='blue'
                                                    size={60}
                                                />
                                                <Flex
                                                    direction='column'
                                                    gap='sm'
                                                >
                                                    <Text size='lg' fw={600}>
                                                        {x.name}
                                                    </Text>
                                                    <Text
                                                        size='xs'
                                                        fw={600}
                                                        c='gray'
                                                    >
                                                        {x.description}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Link>
                                        {x.button && (
                                            <Button
                                                variant='filled'
                                                size='md'
                                                color='blue'
                                                fullWidth
                                                my='md'
                                                component={Link}
                                                href={x.link}
                                            >
                                                {x.button}
                                            </Button>
                                        )}
                                    </Paper>
                                </Grid.Col>
                            )
                        })}
                    </Grid>
                </Grid.Col>
            </Grid>
        </Flex>
    )
}
