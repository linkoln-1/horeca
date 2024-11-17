'use client'

import { useUserStore } from '@/core/providers/userStoreContext'
import { Flex, Grid, Paper, Text, Button, Loader } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { hiddenApplications } from '@/shared/constants'
import { role } from '@/shared/helpers/getRole'

export function HiddenApplicationsViews() {
    const user = useUserStore(state => state.user)
    const router = useRouter()

    if (!user) return <Loader />

    return (
        <Flex direction='column' gap='md'>
            <Flex justify='start'>
                <Button
                    variant='transparent'
                    onClick={() =>
                        router.push(
                            `/user/${role({ user })}/products/applications`
                        )
                    }
                    c='var(--mantine-color-indigo-4)'
                >
                    <IconChevronLeft />
                    Назад
                </Button>
            </Flex>
            <Flex direction='column' gap='md'>
                <Paper p='md' withBorder bg='indigo.4'>
                    <Flex justify='space-around'>
                        {[
                            '№ Скрытой заявки',
                            'Адрес и дата доставки',
                            'Способ доставки',
                            'Отсрочка',
                            'Почему скрыта',
                        ].map((tab, index) => (
                            <Text size='md' c='gray.0' key={index}>
                                {tab}
                            </Text>
                        ))}
                    </Flex>
                </Paper>

                {!hiddenApplications ? (
                    <Flex
                        direction='column'
                        justify='center'
                        align='center'
                        h='50vh'
                    >
                        <Text fw={600} size='xl'>
                            Пока заявок нет, но как только появятся — вы сможете
                            спрятать сюда неинтересные
                        </Text>
                        <Text c='gray'>
                            Начните с заполнения своего каталога — просто
                            нажмите &apos;Мой каталог&apos; в меню слева.
                        </Text>
                    </Flex>
                ) : (
                    hiddenApplications.map((orderGroup, groupIndex) => (
                        <Flex key={groupIndex} direction='column' gap='sm'>
                            <Text mt='md' size='sm' c='gray.6'>
                                Размещены {orderGroup.date}
                            </Text>

                            {orderGroup.items.map((item, itemIndex) => (
                                <Paper
                                    p='md'
                                    withBorder
                                    key={itemIndex}
                                    bg='#F5F7FD'
                                >
                                    <Grid
                                        justify='space-between'
                                        align='center'
                                    >
                                        <Grid.Col span={2}>
                                            <Flex
                                                direction='column'
                                                align='center'
                                            >
                                                <Text size='md'>
                                                    {item.orderNumber}
                                                </Text>
                                                <Text size='xs' c='dimmed'>
                                                    {orderGroup.date}
                                                </Text>
                                            </Flex>
                                        </Grid.Col>

                                        {/* Адрес и дата доставки */}
                                        <Grid.Col span={3}>
                                            <Flex
                                                direction='column'
                                                align='center'
                                            >
                                                <Text size='md'>
                                                    {item.address}
                                                </Text>
                                                <Text size='xs' c='dimmed'>
                                                    до {item.deliveryDate}
                                                </Text>
                                            </Flex>
                                        </Grid.Col>

                                        <Grid.Col span={2}>
                                            <Flex justify='center'>
                                                <Text size='md'>
                                                    {item.deliveryMethod}
                                                </Text>
                                            </Flex>
                                        </Grid.Col>

                                        <Grid.Col span={2}>
                                            <Flex justify='center'>
                                                <Text size='md'>
                                                    {item.delay}
                                                </Text>
                                            </Flex>
                                        </Grid.Col>

                                        <Grid.Col span={2}>
                                            <Flex justify='center'>
                                                <Text size='md'>
                                                    {item.reason}
                                                </Text>
                                            </Flex>
                                        </Grid.Col>
                                    </Grid>
                                </Paper>
                            ))}
                        </Flex>
                    ))
                )}
            </Flex>
        </Flex>
    )
}
