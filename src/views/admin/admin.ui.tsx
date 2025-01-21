'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { chatQueries } from '@/entities/chats'
import { useChatAdminStore } from '@/entities/chats/chat.admin.model'
import { supportQueries } from '@/entities/support'
import {
    Flex,
    Text,
    Loader,
    Box,
    Badge,
    Overlay,
    Paper,
    Button,
    Input,
    LoadingOverlay,
} from '@mantine/core'
import { IconPaperclip, IconSend2 } from '@tabler/icons-react'
import { IconSquareArrowLeft } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { useWebSocketChat } from '@/shared/hooks/useWebsocketChat'
import { api } from '@/shared/lib/horekaApi'
import { SupportRequestStatus } from '@/shared/lib/horekaApi/Api'

import '@/styles/chat.scss'

type initialMessage = {
    id: number
    chatId: number
    message: string
    authorId: number
    isServer: boolean
    opponentViewed: boolean
    createdAt: string
    updatedAt: string
}

export function AdminViews() {
    const [message, setMessage] = useState<string>('')
    const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false)
    const [chatId, setChatId] = useState<number>(0)
    const [supportRequestId, setSupportRequestId] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [adminId, setAdminId] = useState<number | null>(null)
    const [userId, setUserId] = useState<number | null>(null)
    const [initialMessageStore, setInitialMessageStore] =
        useState<initialMessage>({
            authorId: 0,
            chatId: 0,
            createdAt: '',
            id: 0,
            isServer: false,
            message: '',
            opponentViewed: false,
            updatedAt: '',
        })
    const [loading, setLoading] = useState<boolean>(false)

    const { mutateAsync: assignRequest, isPending: assignRequestPending } =
        supportQueries.useAdminAssignRequestChatMutation()

    const { data: support, refetch } =
        supportQueries.useGetAdminSupportListChatQuery()

    const { mutateAsync: createChat, isPending: createChatPending } =
        chatQueries.useChatCreateMutation()

    const { chats, setChatMessagesWithInitial } = useChatAdminStore()
    const { sendMessage, socketTicket } = useWebSocketChat({
        chatId: chatId,
        booleanValue: chatId !== 0,
    })

    const router = useRouter()

    const messages = chats[chatId] || []

    const getChatId = (id: number) => {
        return setChatId(id)
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            if (adminId) {
                useChatAdminStore.getState().addMessage(chatId, {
                    id: Date.now(),
                    chatId: chatId,
                    message: message,
                    authorId: adminId,
                    isServer: false,
                    opponentViewed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                })
            }

            if (socketTicket && adminId) {
                sendMessage({
                    newMessage: {
                        chatId: +chatId,
                        message: message,
                        authorId: adminId,
                    },
                })
            }
            setMessage('')
        }
    }

    const handleConfirmRequest = async () => {
        try {
            await assignRequest({ id: `${supportRequestId}` })
            if (userId) {
                await createChat({
                    data: {
                        opponentId: userId,
                        type: 'Support',
                        supportRequestId: +supportRequestId,
                    },
                }).then(async createChatRes => {
                    getChatId(createChatRes.data.id)
                })
            }
            await refetch()

            setOverlayVisible(false)
            toast.success('Запрос пользователя успешно подтвержден!')
            toast.success('Чат для пользователя успешно создан!')
        } catch (e) {
            console.error(e)
        }
    }

    const handleRequest = async (
        supportRequestId: number,
        opponentId: number,
        content: string | null,
        chatsId: number,
        createdAt: string,
        updatedAt: string,
        status: string,
        adminId: number | null
    ) => {
        if (!content) return

        setChatId(chatsId)
        setSupportRequestId(`${supportRequestId}`)
        setStatus(status)
        setAdminId(adminId)
        setUserId(opponentId)

        const initialMessage = {
            id: Math.floor(Date.now() / 1000),
            chatId: chatsId || chatId,
            message: content,
            authorId: opponentId,
            isServer: false,
            opponentViewed: false,
            createdAt,
            updatedAt,
        }

        setInitialMessageStore(initialMessage)
    }

    useEffect(() => {
        if (chatId <= 0) return

        const getMessages = async () => {
            setLoading(true)
            const response = await api
                .chatsControllerGetChat(chatId)
                .then(x => x)

            const messages = response.data?.messages || []

            setChatMessagesWithInitial(chatId, initialMessageStore, messages) // Передаём начальное сообщение
            setLoading(false)
        }

        getMessages()
    }, [chatId > 0 ? chatId : null])

    useEffect(() => {
        setOverlayVisible(status === 'Default')
    }, [status])

    if (!support) return <Loader />

    return (
        <Flex style={{ maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
            <Flex direction='column' style={{ width: '100%' }}>
                <Flex
                    className='rounded-t-xl'
                    px='md'
                    py='md'
                    align='center'
                    bg='indigo.1'
                >
                    <Flex justify='center' align='center' w='100%'>
                        <Box>
                            <Text fw='600' size='xl'>
                                Поддержка СФЕРЫ HoReCa
                            </Text>
                            <Text fw='500' size='sm'>
                                Просмотр список звявок от пользователей/Чат
                            </Text>
                        </Box>
                    </Flex>
                </Flex>

                <Flex h='calc(100vh - 400px)' mah='100vh' w='100%'>
                    <Flex
                        direction='column'
                        className='overflow-y-auto custom-scrollbar'
                        w='100%'
                        maw={380}
                    >
                        {support.map((list, index) => (
                            <Box key={index}>
                                <Flex align='center' w='100%'>
                                    <Flex
                                        direction='column'
                                        w='100%'
                                        onClick={() => {
                                            handleRequest(
                                                list.id,
                                                list.userId,
                                                list.content,
                                                list.chatId,
                                                list.createdAt,
                                                list.updatedAt,
                                                list.status,
                                                list.adminId
                                            )
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            border: `0.5px solid #ccc`,
                                            borderRadius: '8px',
                                        }}
                                        wrap='nowrap'
                                        px='lg'
                                        py='lg'
                                        mt='xs'
                                        mb='xs'
                                        mr='sm'
                                        className='adminChatWeight'
                                    >
                                        <Flex
                                            justify='space-between'
                                            align='center'
                                        >
                                            <Flex
                                                direction='column'
                                                justify='space-between'
                                            >
                                                <Flex gap='xs' align='center'>
                                                    <Text fw={600}>
                                                        {' '}
                                                        Заявка №
                                                    </Text>
                                                    <Text
                                                        fw='600'
                                                        size='xl'
                                                        className='request '
                                                    >
                                                        {list.id}
                                                    </Text>
                                                </Flex>
                                                <Flex
                                                    direction='column'
                                                    gap='xs'
                                                    w='80%'
                                                >
                                                    <Text size='xs'>
                                                        Пользователь №{' '}
                                                        {list.userId}
                                                    </Text>
                                                    <Text size='xs' fw={600}>
                                                        Сообщение от
                                                        пользователя:{' '}
                                                        {list.content}
                                                    </Text>
                                                </Flex>
                                            </Flex>

                                            <Flex
                                                direction='column'
                                                gap='xs'
                                                align='center'
                                            >
                                                <Badge bg='indigo.5' fullWidth>
                                                    {dayjs(
                                                        list.createdAt
                                                    ).format('YYYY-MM-DD')}
                                                </Badge>
                                                <Badge
                                                    bg={
                                                        list.status ===
                                                        SupportRequestStatus.Active
                                                            ? 'blue.4'
                                                            : list.status ===
                                                                SupportRequestStatus.Default
                                                              ? 'gray.4'
                                                              : list.status ===
                                                                  SupportRequestStatus.Resolved
                                                                ? 'green.6'
                                                                : ''
                                                    }
                                                    c={
                                                        list.status ===
                                                        SupportRequestStatus.Active
                                                            ? '#fff'
                                                            : list.status ===
                                                                SupportRequestStatus.Default
                                                              ? 'gray'
                                                              : list.status ===
                                                                  SupportRequestStatus.Resolved
                                                                ? 'green'
                                                                : ''
                                                    }
                                                    fullWidth
                                                >
                                                    {list.status}
                                                </Badge>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>

                    {!supportRequestId ? (
                        <Flex
                            pos='relative'
                            direction='column'
                            w='100%'
                            h='100%'
                        >
                            <Flex align='center' justify='center' h='100%'>
                                <Flex gap='md' align='center'>
                                    <IconSquareArrowLeft />
                                    <Text ta='center'>
                                        Выберите заявку слева
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex
                            pos='relative'
                            direction='column'
                            w='100%'
                            h='100%'
                        >
                            <LoadingOverlay
                                visible={loading}
                                overlayProps={{ blur: 2 }}
                                zIndex={10}
                            />

                            {isOverlayVisible && !chatId && (
                                <Overlay
                                    opacity={1}
                                    color='black'
                                    zIndex={10}
                                    blur={5}
                                >
                                    <Flex
                                        align='center'
                                        justify='center'
                                        direction='column'
                                        style={{
                                            height: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Paper
                                            px='xl'
                                            py='lg'
                                            withBorder
                                            shadow='md'
                                            style={{
                                                background: 'white',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Text size='lg' mb='md'>
                                                Подтвердите запрос пользователя,
                                                чтобы ответить
                                            </Text>
                                            <Button
                                                size='md'
                                                color='indigo.4'
                                                onClick={handleConfirmRequest}
                                                loading={
                                                    assignRequestPending ||
                                                    createChatPending
                                                }
                                            >
                                                Подтвердить
                                            </Button>
                                        </Paper>
                                    </Flex>
                                </Overlay>
                            )}

                            {supportRequestId && (
                                <Flex
                                    direction='column'
                                    px='xl'
                                    flex='1'
                                    mah='100%'
                                    className='overflow-y-auto custom-scrollbar'
                                >
                                    {messages.map((chat, index) => {
                                        const currentDate = dayjs(
                                            chat.createdAt
                                        ).format('YYYY-MM-DD')
                                        const previousDate =
                                            index > 0
                                                ? dayjs(
                                                      messages[index - 1]
                                                          .createdAt
                                                  ).format('YYYY-MM-DD')
                                                : null

                                        return (
                                            <Flex
                                                key={index}
                                                direction='column'
                                                mb='md'
                                            >
                                                {(index === 0 ||
                                                    currentDate !==
                                                        previousDate) && (
                                                    <Text
                                                        w='100%'
                                                        my='md'
                                                        size='lg'
                                                        c='gray.6'
                                                        ta='center'
                                                    >
                                                        {currentDate}
                                                    </Text>
                                                )}

                                                <Box
                                                    c={
                                                        chat.authorId &&
                                                        chat.authorId !==
                                                            adminId
                                                            ? 'white'
                                                            : '#000'
                                                    }
                                                    className={
                                                        chat.authorId &&
                                                        chat.authorId !==
                                                            adminId
                                                            ? 'speech-bubble-to-me'
                                                            : 'speech-bubble-from-me'
                                                    }
                                                    bg={
                                                        chat.authorId &&
                                                        chat.authorId !==
                                                            adminId
                                                            ? 'indigo.6'
                                                            : 'indigo.1'
                                                    }
                                                >
                                                    {chat.message}
                                                </Box>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )}

                            <Flex
                                w='100%'
                                bg='gray.1'
                                align='center'
                                px='md'
                                py='md'
                            >
                                <IconPaperclip
                                    style={{ marginRight: 30 }}
                                    width={36}
                                    height={36}
                                    cursor='pointer'
                                    color='#4299e1'
                                    stroke={2}
                                />
                                <Input
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    size='lg'
                                    placeholder='Напишите сообщение...'
                                    variant='unstyled'
                                    w='100%'
                                />
                                <Button
                                    variant='transparent'
                                    disabled={!message}
                                    onClick={handleSendMessage}
                                >
                                    <IconSend2
                                        width={36}
                                        height={36}
                                        color={message ? '#5E7EEF' : '#A4A4A4'}
                                    />
                                </Button>
                            </Flex>
                        </Flex>
                    )}
                </Flex>

                <Flex
                    className='rounded-b-xl'
                    px='md'
                    py='md'
                    align='center'
                    bg='indigo.1'
                >
                    <Flex
                        justify='center'
                        align='center'
                        w='100%'
                        h={30}
                    ></Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
