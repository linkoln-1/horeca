import { io, Socket } from 'socket.io-client'

const DEFAULT_CONNECTION = 'default'

enum SocketTransport {
    WS = 'websocket',
    POLLING = 'polling',
}

const socketConnections = new Map<string, Socket | null>()
socketConnections.set(DEFAULT_CONNECTION, null)

const getSocketHost = (): string => {
    if (!process.env.NEXT_PUBLIC_APP_WS_API) {
        throw new Error('NEXT_PUBLIC_APP_WS_API is not defined')
    }
    return process.env.NEXT_PUBLIC_APP_WS_API
}

export const removeSocketConnection = (namespace: string) => {
    const socket = socketConnections.get(namespace)
    if (socket) {
        socket.disconnect()
        socketConnections.delete(namespace)
    }
}

export const getSocket = (namespace?: string, token?: string): Socket => {
    const key = namespace || DEFAULT_CONNECTION
    const existing = socketConnections.get(key)
    if (existing) {
        return existing
    }

    const HOST = getSocketHost()
    const opts = {
        transports: [SocketTransport.WS],
        auth: {
            authorization: `Bearer ${token || ''}`,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
    }

    const url = namespace ? `${HOST}/${namespace}` : HOST
    const socket = io(url, opts)

    socket.on('connect', () => {
        console.log(`Connected to WebSocket [${key}]`)
    })
    socket.on('disconnect', reason => {
        console.log(`Disconnected from WebSocket [${key}]:`, reason)
    })
    socket.on('error', err => {
        console.error(`WebSocket [${key}] Error:`, err)
    })

    socketConnections.set(key, socket)
    return socket
}
