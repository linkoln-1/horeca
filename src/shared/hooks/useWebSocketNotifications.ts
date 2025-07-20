import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { NotificationEvents } from '../constants/notificationEvents'
import { useUserStore } from '@/core/providers/userStoreContext'
import { Socket } from 'socket.io-client'

import { getSocket } from '@/shared/utils/getSocket'

const eventMessages: Record<NotificationEvents, string> = {
    [NotificationEvents.REVIEW]: 'Появился новый отзыв.',
    [NotificationEvents.REVIEW_REMINDER]:
        'Напоминание: не забудьте оставить отзыв.',
    [NotificationEvents.PROVIDER_ADDED_TO_FAVOURITES]:
        'Поставщик добавил вас в избранное.',
    [NotificationEvents.PROVIDER_DELETED_FROM_FAVOURITES]:
        'Поставщик удалил вас из избранного.',
    [NotificationEvents.PROVIDER_REQUEST_CREATED]:
        'Появился ответ поставщика на вашу заявку.',
    [NotificationEvents.PROVIDER_REQUEST_STATUS_CHANGED]:
        'Статус вашей заявки изменился.',
}

export function useWebSocketNotifications() {
    const [socket, setSocket] = useState<Socket | null>(null)
    const { accessToken } = useUserStore(state => state)

    useEffect(() => {
        if (!accessToken) return

        const ws = getSocket('notifications', accessToken)
        setSocket(ws)

        ws.on('connect', () => {
            console.log('WS connected → emit joinRoom')
            ws.emit('joinRoom')
        })

        const handlers: Record<string, (payload: any) => void> = {}
        Object.values(NotificationEvents).forEach(eventName => {
            const fn = (payload: any) => {
                console.log(`WS event [${eventName}]:`, payload)
                const text =
                    eventMessages[eventName as NotificationEvents] ||
                    payload.message ||
                    `Событие: ${eventName}`
                toast.info(text)
            }
            handlers[eventName] = fn
            ws.on(eventName, fn)
        })

        ws.on('error', err => console.error('WS error:', err))
        ws.on('disconnect', reason => console.log('WS disconnect:', reason))

        return () => {
            Object.entries(handlers).forEach(([evt, fn]) => ws.off(evt, fn))
            ws.off('connect')
            ws.off('error')
            ws.off('disconnect')
            ws.disconnect()
            setSocket(null)
        }
    }, [accessToken])

    return { socket }
}
