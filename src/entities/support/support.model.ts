import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { SupportRequestDto } from '@/shared/lib/horekaApi/Api'

export interface MessageDto {
    chatId: number
    message: string
    authorId: number
}

export type MessageState = {
    error: boolean
    errorData: any
    isLoading: boolean
    chats: SupportRequestDto[]
    addMessageToChat: (chatId: number, message: MessageDto) => void
    clearTickets: () => void
    addChat: (chats: SupportRequestDto) => void
}

export const useTicketChat = create<MessageState>()(
    devtools(
        persist<MessageState>(
            (set, get) => ({
                error: false,
                errorData: null,
                isLoading: false,
                chats: [],

                addMessageToChat: (chatId: number, message: MessageDto) => {
                    if (!chatId || !message) {
                        return
                    }

                    // set(state => {
                    //     const updatedChats = state.chats.map(chat => {
                    //         if (chat.id === chatId) {
                    //             // Проверяем, существует ли сообщение в чате
                    //         //     const exists =
                    //         //         Array.isArray(chat.content) &&
                    //         //         chat.content.some(
                    //         //             (m: MessageDto) =>
                    //         //                 m.chatId === message.chatId &&
                    //         //                 m.message === message.message
                    //         //         )
                    //         //
                    //         //     if (!exists) {
                    //         //         // Если сообщение не существует, добавляем его
                    //         //         return {
                    //         //             ...chat,
                    //         //             content: Array.isArray(chat.content)
                    //         //                 ? [...chat.content, message] // Если content — массив, добавляем сообщение
                    //         //                 : [message], // Если content ещё не массив, создаём массив с этим сообщением
                    //         //         }
                    //         //     }
                    //         // }
                    //         // return chat
                    //     })
                    //
                    //     return { chats: updatedChats }
                    // })
                },

                addChat: (newChat: SupportRequestDto) => {
                    if (!newChat || !newChat.id) {
                        return
                    }

                    set(state => {
                        const existingChatIndex = state.chats.findIndex(
                            chat => chat.id === newChat.id
                        )

                        if (existingChatIndex !== -1) {
                            // Если чат уже существует, обновляем его
                            const updatedChats = [...state.chats]
                            updatedChats[existingChatIndex] = {
                                ...state.chats[existingChatIndex],
                                ...newChat,
                            }
                            return { chats: updatedChats }
                        }

                        // Если чата не существует, добавляем новый
                        return { chats: [...state.chats, newChat] }
                    })
                },

                clearTickets: () => set({ chats: [] }),
            }),
            {
                name: 'adminSupportChat',
            }
        )
    )
)
