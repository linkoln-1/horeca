'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'

import { useChatHorecaStore } from '@/entities/chats/chat.users.model'
import {
    useCreateReviewMutation,
    useGetChatsByIdQuery,
    useInfiniteGetAllMessagesQuery,
} from '@/entities/chats/chats.queries'
import { useFavoriteProviderMutation } from '@/entities/favorites/favorites.queries'
import { userQueries } from '@/entities/user'
import { Button, Loader, Group, Paper, Text, ActionIcon } from '@mantine/core'
import {
    IconSend2,
    IconArrowDown,
    IconHeart,
    IconHeartFilled,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'

import { useWebSocketChat } from '@/shared/hooks/useWebsocketChat'

export function ChatView() {
    const { id } = useParams() as { id: string }
    const chatId = Number(id)

    const { data, isLoading } = useGetChatsByIdQuery({
        id: chatId,
        enabled: chatId > 0,
    })
    const {
        data: allChatMessages,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteGetAllMessagesQuery({ chatId })
    const { chats, addMessage, setChatMessagesWithInitial } =
        useChatHorecaStore()
    const { data: userData } = userQueries.useGetMeQuery()
    const { sendMessage, socketTicket } = useWebSocketChat({
        chatId,
        booleanValue: chatId > 0,
    })

    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState('')
    const [isAtBottom, setIsAtBottom] = useState(true)
    const [isDelivered, setIsDelivered] = useState<number | null>(null)
    const [isSuccessfully, setIsSuccessfully] = useState<number | null>(null)

    const createReview = useCreateReviewMutation()
    const favoriteMutation = useFavoriteProviderMutation()

    useEffect(() => {
        if (!data) return
        const initial = allChatMessages?.pages[0]?.data || []
        setChatMessagesWithInitial(chatId, undefined, initial)
    }, [data, allChatMessages, setChatMessagesWithInitial, chatId])

    useEffect(() => {
        if (!socketTicket) return
        const onMsg = (m: any) => addMessage(chatId, m)
        socketTicket.on('message', onMsg)
        return () => void socketTicket.off('message', onMsg)
    }, [socketTicket, addMessage, chatId])

    const scrollToBottom = useCallback(
        () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
        []
    )
    useEffect(() => {
        if (isAtBottom) scrollToBottom()
    }, [chats[chatId], isAtBottom, scrollToBottom])

    const handleScroll = () => {
        const el = scrollContainerRef.current
        if (!el) return
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100
        setIsAtBottom(atBottom)
        if (el.scrollTop === 0 && hasNextPage) fetchNextPage()
    }

    if (isLoading || !userData) return <Loader />

    const created = new Date(
        data?.data?.providerRequest?.horecaRequest.deliveryTime
    ).getTime()
    const now = Date.now()
    const showDeliveryQ = isDelivered === null && now - created >= 50
    const showQualityQ = isDelivered === 1 && isSuccessfully === null

    const providerReq = data?.data?.providerRequest
    const providerUserId = providerReq?.userId

    const handleDelivery = (delivered: boolean) => {
        setIsDelivered(delivered ? 1 : 0)
        if (!delivered) {
            setIsSuccessfully(0)
            createReview.mutate({
                providerRequestId: providerReq,
                isDelivered: 0,
                isSuccessfully: 0,
            })
        }
    }

    const handleQuality = (ok: boolean) => {
        setIsSuccessfully(ok ? 1 : 0)
        createReview.mutate(
            {
                providerRequestId: providerReq,
                isDelivered: 1,
                isSuccessfully: ok ? 1 : 0,
            },
            {
                onSuccess: () => {
                    toast.success(
                        ok
                            ? 'Спасибо за оценку: товар был качественным'
                            : 'Жаль, что товар не подошёл. Мы это учтём.'
                    )
                },
                onError: () => {
                    toast.error('Не удалось отправить оценку качества товара')
                },
            }
        )
    }

    const handleFavorite = () => {
        if (!providerUserId) return
        favoriteMutation.mutate(
            { data: { providerId: providerUserId } },
            {
                onSuccess: () => {
                    toast.success('Поставщик добавлен в избранное')
                },
                onError: () => {
                    toast.error('Не удалось добавить в избранное')
                },
            }
        )
    }

    const handleSend = () => {
        if (!message.trim()) return
        sendMessage?.({
            newMessage: { chatId, message, authorId: userData.id },
        })
        addMessage(chatId, {
            id: Date.now(),
            chatId,
            message,
            authorId: userData.id,
            isServer: false,
            opponentViewed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })
        setMessage('')
    }

    const messages = chats[chatId] || []

    return (
        <div className='relative flex flex-col p-4 h-[800px]'>
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className='flex-1 overflow-y-auto bg-white p-6 rounded-xl shadow-inner space-y-4 custom-scrollbar'
            >
                {messages.map(msg => {
                    const isMe = msg.authorId === userData.id
                    return (
                        <div key={msg.id} className='flex flex-col'>
                            <div
                                className={`flex ${
                                    isMe ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <Paper
                                    className={`rounded-2xl p-3 max-w-[75%] shadow-md ${
                                        isMe
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-black'
                                    }`}
                                    withBorder={!isMe}
                                    radius='xl'
                                    px='md'
                                    py='sm'
                                >
                                    <Text size='xs' className='mb-1'>
                                        {isMe
                                            ? 'Вы'
                                            : userData.role === 'Horeca'
                                              ? 'Поставщик'
                                              : 'Покупатель'}
                                    </Text>
                                    <Text size='sm'>{msg.message}</Text>
                                </Paper>
                            </div>
                            <Text
                                size='xs'
                                color='gray'
                                className={`${
                                    isMe ? 'text-right' : 'text-left'
                                } mt-1`}
                            >
                                {dayjs(msg.createdAt).format(
                                    'DD.MM.YYYY HH:mm'
                                )}
                            </Text>
                        </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>

            {!isAtBottom && (
                <Button
                    onClick={scrollToBottom}
                    className='absolute bottom-24 right-8 rounded-full p-2 shadow-lg'
                >
                    <IconArrowDown size={20} />
                </Button>
            )}

            {showDeliveryQ &&
                data?.data?.providerRequest?.providerRequestReview === null && (
                    <Paper
                        withBorder
                        radius='md'
                        p='md'
                        className='mt-4 bg-yellow-50'
                    >
                        <Text size='sm' className='mb-2'>
                            Товар был доставлен?
                        </Text>
                        <Group>
                            <Button onClick={() => handleDelivery(true)}>
                                Да, доставлен
                            </Button>
                            <Button
                                variant='outline'
                                onClick={() => handleDelivery(false)}
                            >
                                Нет, не доставлен
                            </Button>
                        </Group>
                    </Paper>
                )}

            {showQualityQ &&
                data?.data?.providerRequest?.providerRequestReview === null && (
                    <Paper
                        withBorder
                        radius='md'
                        p='md'
                        className='mt-4 bg-green-50'
                    >
                        <Group align='center'>
                            <Text size='sm'>Товар пришёл качественный?</Text>
                            <ActionIcon
                                onClick={handleFavorite}
                                loading={favoriteMutation.isLoading}
                                size='lg'
                                radius='md'
                                variant='light'
                            >
                                {favoriteMutation.isSuccess ? (
                                    <IconHeartFilled size={20} />
                                ) : (
                                    <IconHeart size={20} />
                                )}
                            </ActionIcon>
                        </Group>
                        <Group mt='sm'>
                            <Button onClick={() => handleQuality(true)}>
                                Удовлетворительно
                            </Button>
                            <Button
                                variant='outline'
                                onClick={() => handleQuality(false)}
                            >
                                Нет, возврат
                            </Button>
                        </Group>
                    </Paper>
                )}

            <div className='mt-4 flex'>
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    className='flex-1 border rounded-l-2xl px-4 py-2 outline-none shadow-sm focus:ring-2 focus:ring-blue-300'
                    placeholder='Введите сообщение...'
                />
                <Button onClick={handleSend} className='rounded-r-2xl px-6'>
                    <IconSend2 width={24} height={24} />
                </Button>
            </div>
        </div>
    )
}
