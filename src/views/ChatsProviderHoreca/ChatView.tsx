'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

import { useChatHorecaStore } from '@/entities/chats/chat.users.model'
import { useGetChatsByIdQuery } from '@/entities/chats/chats.queries'
import { userQueries } from '@/entities/user'
import { Loader } from '@mantine/core'
import { IconSend2, IconArrowDown } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'

import { useWebSocketChat } from '@/shared/hooks/useWebsocketChat'

export function ChatView() {
    const { id } = useParams() as { id: string }
    const chatId = Number(id)
    const ref = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState<string>('')
    const [isAtBottom, setIsAtBottom] = useState(true)
    const { data: userData } = userQueries.useGetMeQuery()
    const { data, isLoading } = useGetChatsByIdQuery({
        id: chatId,
        enabled: chatId > 0,
    })

    const { chats, addMessage, setChatMessagesWithInitial } =
        useChatHorecaStore()
    const messages = chats[chatId] || []

    const { sendMessage, socketTicket } = useWebSocketChat({
        chatId: chatId,
        booleanValue: chatId > 0,
    })

    const scrollToBottom = useCallback(() => {
        if (ref.current) {
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [])

    const handleScroll = () => {
        if (!ref.current) return

        const { scrollTop, scrollHeight, clientHeight } = ref.current
        const isBottom = scrollHeight - scrollTop - clientHeight < 100
        setIsAtBottom(isBottom)

        if (scrollTop === 0) {
            console.log('Подгружаем старые сообщения...')
        }
    }

    useEffect(() => {
        if (!data) return
        const chatMessages = data.data?.messages || []
        setChatMessagesWithInitial(chatId, undefined, chatMessages)
    }, [data])

    useEffect(() => {
        if (isAtBottom) {
            scrollToBottom()
        }
    }, [messages, isAtBottom, scrollToBottom])

    useEffect(() => {
        if (!socketTicket) return
        const handleNewMessage = (newMessage: any) => {
            addMessage(chatId, newMessage)
        }
        socketTicket.on('message', handleNewMessage)
        return () => {
            socketTicket.off('message', handleNewMessage)
        }
    }, [socketTicket])

    const handleSendMessage = () => {
        if (!message.trim()) return

        if (socketTicket) {
            sendMessage({
                newMessage: {
                    chatId: chatId,
                    message: message,
                    authorId: userData!.id,
                },
            })
        }

        addMessage(chatId, {
            id: Date.now(),
            chatId,
            message,
            authorId: userData!.id,
            isServer: false,
            opponentViewed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })

        setMessage('')
    }

    if (isLoading || !userData) return <Loader />

    const getSenderName = (authorId: number | null) => {
        if (authorId === userData.id) return 'Вы'
        if (userData.role === 'Horeca') return 'Поставщик'
        if (userData.role === 'Provider') return 'Покупатель'
        return 'Собеседник'
    }

    const isMyMessage = (authorId: number | null) =>
        (authorId ?? 0) === userData?.id

    const myBubbleStyles = 'bg-blue-500 text-white'
    const opponentBubbleStyles = 'bg-gray-200 text-black'

    return (
        <div className='relative flex flex-col p-4'>
            <div
                ref={ref}
                onScroll={handleScroll}
                className='flex-1 overflow-y-auto bg-white p-6 rounded-xl shadow-inner space-y-4 custom-scrollbar'
            >
                {messages.map(msg => {
                    const messageDate = dayjs(msg.createdAt).format(
                        'DD.MM.YYYY HH:mm'
                    )
                    return (
                        <div key={msg.id} className='flex flex-col'>
                            <div
                                className={`flex ${
                                    isMyMessage(msg.authorId)
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`rounded-2xl p-3 max-w-[75%] min-w-[100px] shadow-md ${
                                        isMyMessage(msg.authorId)
                                            ? myBubbleStyles
                                            : opponentBubbleStyles
                                    }`}
                                >
                                    <div className='font-semibold text-xs mb-1'>
                                        {getSenderName(msg.authorId)}
                                    </div>
                                    <div className='text-sm break-words'>
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`text-[10px] text-gray-400 mt-1 ${
                                    isMyMessage(msg.authorId)
                                        ? 'text-right'
                                        : 'text-left'
                                }`}
                            >
                                {messageDate}
                            </div>
                        </div>
                    )
                })}
            </div>

            {!isAtBottom && (
                <button
                    onClick={scrollToBottom}
                    className='absolute bottom-24 right-8 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all'
                >
                    <IconArrowDown size={20} />
                </button>
            )}

            <div className='mt-4 flex'>
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleSendMessage()
                    }}
                    className='flex-1 border rounded-l-2xl px-4 py-2 outline-none shadow-sm focus:ring-2 focus:ring-blue-300'
                    placeholder='Введите сообщение...'
                />
                <button
                    onClick={handleSendMessage}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-2xl transition-all'
                >
                    <IconSend2 width={24} height={24} />
                </button>
            </div>
        </div>
    )
}
