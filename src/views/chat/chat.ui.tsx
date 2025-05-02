'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { chatQueries } from '@/entities/chats'
import { useChatHorecaStore } from '@/entities/chats/chat.users.model'
import { CreateSupportRequestModal } from '@/views/chat/ui'
import {
    Badge,
    Box,
    Button,
    Flex,
    Input,
    Loader,
    LoadingOverlay,
    ScrollArea,
    Text,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import {
    IconPaperclip,
    IconSend2,
    IconSquareArrowLeft,
} from '@tabler/icons-react'
import dayjs from 'dayjs'

import { useWebSocketChat } from '@/shared/hooks/useWebsocketChat'
import { api } from '@/shared/lib/horekaApi'
import { SupportRequestStatus } from '@/shared/lib/horekaApi/Api'
import { StatusType } from '@/shared/types/types'

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

export function ChatView() {
    const { user } = useUserStore(store => store)
    const [chatId, setChatId] = useState<number>(0)
    const [message, setMessage] = useState<string>('')
    const [supportRequestId, setSupportRequestId] = useState<string>('')
    const [status, setStatus] = useState<string>('')
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
    const ref = useRef<HTMLDivElement>(null)

    const { data: userSupportRequestList } =
        chatQueries.useGetUserSupportListQuery()

    const { setChatMessagesWithInitial, chats, addMessage } =
        useChatHorecaStore()

    const messages = chats[chatId] || []

    const { sendMessage, socketTicket } = useWebSocketChat({
        chatId: chatId,
        booleanValue: chatId !== 0,
    })

    const scrollToBottom = () =>
        ref.current!.scrollTo({
            top: ref.current!.scrollHeight,
            behavior: 'smooth',
        })

    const handleRequest = async (
        supportRequestId: number,
        opponentId: number | null,
        content: string | null,
        chatsId: number,
        createdAt: string,
        updatedAt: string
    ) => {
        if (!content || !opponentId) return

        setChatId(chatsId)
        setSupportRequestId(`${supportRequestId}`)
        setStatus(status)
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

    const createRequestToSupport = () => {
        modals.open({
            centered: true,
            size: 'xl',
            radius: 'lg',
            modalId: 'support-request',
            children: <CreateSupportRequestModal />,
        })
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            if (userId) {
                useChatHorecaStore.getState().addMessage(chatId, {
                    id: Date.now(),
                    chatId: chatId,
                    message: message,
                    authorId: userId,
                    isServer: false,
                    opponentViewed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                })
            }

            if (socketTicket && userId) {
                sendMessage({
                    newMessage: {
                        chatId: +chatId,
                        message: message,
                        authorId: userId,
                    },
                })
            }
            setMessage('')
        }
    }

    useEffect(() => {
        if (chatId <= 0) return

        const getMessages = async () => {
            setLoading(true)
            const response = await api
                .chatsControllerGetChat(chatId)
                .then(x => x)

            const messages = response.data?.messages || []

            setChatMessagesWithInitial(chatId, undefined, messages)
            setLoading(false)
        }

        getMessages()
    }, [chatId > 0 ? chatId : null])

    useEffect(() => {
        if (socketTicket) {
            const handleNewMessage = (message: any) => {
                console.log('Новое сообщение:', message)

                useChatHorecaStore.getState().addMessage(chatId, message)
            }

            socketTicket.on('message', handleNewMessage)

            return () => {
                socketTicket.off('message', handleNewMessage)
            }
        }
    }, [socketTicket])

    useEffect(() => {
        if (ref.current) scrollToBottom()
    }, [chats])

    if (!chats || !userSupportRequestList) return <Loader />

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
                    <Flex justify='space-between' align='center' w='100%'>
                        <Box>
                            <Text fw='600' size='xl'>
                                Поддержка СФЕРЫ HoReCa
                            </Text>
                            <Text fw='500' size='sm'>
                                Чаты
                            </Text>
                        </Box>

                        <Box>
                            <Button
                                variant='outline'
                                onClick={createRequestToSupport}
                            >
                                Написать в поддержку
                            </Button>
                        </Box>
                    </Flex>
                </Flex>

                <Flex h='calc(100vh - 400px)' mah='100vh' w='100%'>
                    <Flex
                        direction='column'
                        className='overflow-y-auto custom-scrollbar border-r'
                        w='100%'
                        maw={380}
                    >
                        {userSupportRequestList.data.length === 0 && (
                            <Flex
                                justify='center'
                                align='center'
                                style={{ borderRight: '1px solid gray' }}
                                h='100%'
                            >
                                <Text fw={700} size='lg'>
                                    Сейчас нет заявок в тех.поддержку
                                </Text>
                            </Flex>
                        )}

                        {userSupportRequestList.data.map((list, index) => (
                            <Box key={index}>
                                <Flex align='center' w='100%'>
                                    <Flex
                                        direction='column'
                                        w='100%'
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
                                        className={`adminChatWeight ${+supportRequestId === list.id ? 'active' : ''}`}
                                        onClick={() => {
                                            handleRequest(
                                                list.id,
                                                list.userId,
                                                list.content,
                                                list.chatId,
                                                list.createdAt,
                                                list.updatedAt
                                            )
                                        }}
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
                                                    <Text fw={600}> Чат №</Text>
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
                                                    w='95%'
                                                >
                                                    <Text size='xs'>
                                                        № запроса: {list.id}
                                                    </Text>
                                                    <Text size='xs' fw={600}>
                                                        Сообщение:{' '}
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
                                                    {StatusType[list.status]}
                                                </Badge>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>

                    {!chatId ? (
                        <Flex
                            pos='relative'
                            direction='column'
                            w='100%'
                            h='100%'
                        >
                            <Flex align='center' justify='center' h='100%'>
                                <Flex gap='md' align='center'>
                                    {userSupportRequestList.data.length ===
                                    0 ? (
                                        ''
                                    ) : (
                                        <IconSquareArrowLeft />
                                    )}
                                    <Text ta='center'>
                                        {userSupportRequestList.data.length ===
                                        0
                                            ? 'У вас пока что нет чатов с тех.поддержкой'
                                            : 'Выберите чат слева'}
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
                            justify='space-between'
                        >
                            <LoadingOverlay
                                visible={loading}
                                overlayProps={{ blur: 2 }}
                                zIndex={10}
                            />

                            {chatId && (
                                <ScrollArea viewportRef={ref}>
                                    <Flex
                                        direction='column'
                                        px='xl'
                                        // flex='1'
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
                                                        className={
                                                            chat.authorId &&
                                                            chat.authorId ===
                                                                userId
                                                                ? 'speech-bubble-from-me'
                                                                : 'speech-bubble-to-me'
                                                        }
                                                        c={
                                                            chat.authorId &&
                                                            chat.authorId ===
                                                                userId
                                                                ? 'white'
                                                                : '#000'
                                                        }
                                                        bg={
                                                            chat.authorId &&
                                                            chat.authorId ===
                                                                userId
                                                                ? 'indigo.6'
                                                                : 'indigo.1'
                                                        }
                                                    >
                                                        <Text
                                                            size='md'
                                                            fw={700}
                                                        >
                                                            {chat.authorId &&
                                                            chat.authorId ===
                                                                userId
                                                                ? 'Вы'
                                                                : 'Поддержка HoreCa'}
                                                        </Text>
                                                        <Text size='md'>
                                                            {chat.message}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                </ScrollArea>
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
