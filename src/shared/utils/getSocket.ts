import { io, Socket } from 'socket.io-client'

const DEFAULT_CONNECTION = 'default'

enum SocketTransport {
    WS = 'websocket',
    POLLING = 'polling',
}

const socketConnections = new Map()
socketConnections.set(DEFAULT_CONNECTION, null)

const getSocketHost = (): string => process.env.NEXT_PUBLIC_APP_WS_API as string

export const removeSocketConnection = (namespace: string) => {
    const socket = socketConnections.get(namespace)

    if (socket) {
        socket.disconnect()
        socketConnections.delete(namespace)
    }
}

export const getSocket = (namespace?: string, token?: string): Socket => {
    const hasNamespaceSocket = socketConnections.has(namespace)

    if (hasNamespaceSocket) {
        return socketConnections.get(namespace) as Socket
    }

    const HOST = getSocketHost()

    const socketOptions = {
        transports: [SocketTransport.WS],
        auth: {
            authorization: `Bearer ${token || ''}`,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
    }

    const connection = io(`${HOST}/${namespace || ''}`, socketOptions)

    connection.on('connect', () => {
        console.log(`Connected to WebSocket ${namespace || 'default'}`)
    })

    connection.on('disconnect', () => {
        console.log(`Disconnected from WebSocket ${namespace || 'default'}`)
    })

    connection.on('error', error => {
        console.error('WebSocket Error:', error)
    })

    if (namespace && !hasNamespaceSocket) {
        socketConnections.set(namespace, connection)
    } else {
        socketConnections.set(DEFAULT_CONNECTION, connection)
    }

    return connection
}
