'use client'

import { toast } from 'react-toastify'

import { useUserStore } from '@/core/providers/userStoreContext'
import { chatQueries } from '@/entities/chats'
import { Button, Flex, Grid, Paper, Text } from '@mantine/core'

import { errors } from '@/shared/constants'

export function ChatView() {
    const user = useUserStore(state => state.user)
    const { data: chats } = chatQueries.useGetChatQuery()

    const { mutateAsync: createChat } = chatQueries.useChatCreateMutation()

    const handleCreateChat = async () => {
        try {
            await createChat({
                data: {
                    opponentId: user!.id,
                    type: 'Support',
                },
            })

            toast.success('Чат с поддержкой успешно создан')
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    return (
        <Flex direction='column' gap='md'>
            <Paper withBorder w='80%'>
                <Grid>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 2,
                        }}
                    >
                        <Flex direction='column'>
                            <Flex
                                direction='column'
                                gap='sm'
                                align='center'
                                style={{
                                    borderRight: '1px solid #ccc',
                                    borderBottom: '1px solid #ccc',
                                }}
                                p='sm'
                            >
                                <Text fw={600}>Все сообщения</Text>
                                <Text size='sm' c='gray'>
                                    Номера запросов
                                </Text>
                            </Flex>

                            <Flex
                                style={{
                                    borderRight: '1px solid #ccc',
                                    borderBottom: '1px solid #ccc',
                                }}
                                p='sm'
                                h='calc(100px + 49px)'
                            >
                                {chats && chats.data.length === 0 ? (
                                    <Flex gap='sm'>Чаты не найдены</Flex>
                                ) : (
                                    <Flex direction='column' gap='md'>
                                        {chats &&
                                            chats.data.map((x, index) => (
                                                <Flex key={x.id}>
                                                    <Text>№ {x.id}</Text>
                                                </Flex>
                                            ))}
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col
                        span={{
                            base: 12,
                            md: 10,
                        }}
                    >
                        <Flex
                            direction='column'
                            gap='xs'
                            style={{
                                borderBottom: '1px solid #ccc',
                            }}
                            p='xs'
                        >
                            <Text fw={600} size='lg'>
                                Поддержка СФЕРЫ HoReCa
                            </Text>
                            <Text c='indigo.4'>Онлайн</Text>
                        </Flex>

                        <Flex direction='column' gap='md'>
                            {chats && chats.data.length === 0 ? (
                                <Flex
                                    justify='center'
                                    align='center'
                                    direction='column'
                                    m='md'
                                >
                                    <Text size='lg'>
                                        Здесь вы можете обратиться в службу
                                        заботы
                                    </Text>

                                    <Button
                                        variant='transparent'
                                        c='indigo.4'
                                        onClick={() => handleCreateChat()}
                                    >
                                        Написать в поддержку Horeca
                                    </Button>
                                </Flex>
                            ) : (
                                <Flex direction='column' gap='md'>
                                    {chats &&
                                        chats.data.map((x, index) => (
                                            <Paper key={x.id}></Paper>
                                        ))}
                                </Flex>
                            )}
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Flex>
    )
}
