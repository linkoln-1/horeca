import { useState, useEffect } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { Socket } from 'socket.io-client'

import { EVENTS } from '@/shared/constants/events'
import { getSocket } from '@/shared/utils/getSocket'

export function useWebSocketChat({
    chatId,
    booleanValue,
}: {
    chatId: number | null
    booleanValue: boolean
}) {
    const [socketTicket, setSocketTicket] = useState<Socket | null>(null)
    const { user, accessToken } = useUserStore(state => state)

    useEffect(() => {
        if (chatId && booleanValue) {
            const socketIo = getSocket('chats', accessToken!)
            setSocketTicket(socketIo)

            socketIo.on(EVENTS.connect, () => {
                console.log('Connected to ticket WebSocket')
                socketIo.emit(EVENTS.joinRoom)
            })

            socketIo.on('errorMessage', (error: any) => {
                console.error('WebSocket error:', error)
            })

            socketIo.on('disconnect', (reason, description) => {
                console.log('Disconnected from WebSocket', reason)
            })
        }
    }, [chatId, accessToken, booleanValue])

    const sendMessage = ({
        newMessage,
    }: {
        newMessage: {
            chatId: number
            message: string
            authorId: number
        }
    }) => {
        if (socketTicket) {
            socketTicket.emit('message', newMessage)
            console.log('Message sent to WebSocket')
        } else {
            console.warn('Socket is not connected')
        }
    }

    return { socketTicket, sendMessage }
}
