import {
    DefinedQueryObserverResult,
    UseQueryResult,
} from '@tanstack/react-query'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
    ChatFullDto,
    ChatMessageDto,
    ErrorDto,
    HttpResponse,
} from '@/shared/lib/horekaApi/Api'

type ChatState = {
    chats: Record<number, ChatMessageDto[]>
    isLoading: Record<number, boolean>
    error: Record<number, string | null>
    addMessage: (chatId: number, message: ChatMessageDto) => void
    setChatMessagesWithInitial: (
        chatId: number,
        initialMessage?: ChatMessageDto,
        messages?: ChatMessageDto[]
    ) => void
    fetchChatMessages: (
        chatId: number,
        fetchFunction: () => UseQueryResult<
            HttpResponse<ChatFullDto, ErrorDto>,
            Error
        >
    ) => Promise<
        DefinedQueryObserverResult<HttpResponse<ChatFullDto, ErrorDto>, Error>
    >
}

export const useChatHorecaStore = create<ChatState>()(
    immer((set, get) => ({
        chats: {},
        isLoading: {},
        error: {},

        addMessage: (chatId, message) => {
            set(state => {
                if (!state.chats[chatId]) {
                    state.chats[chatId] = []
                }
                state.chats[chatId].push(message)
            })
        },

        setChatMessagesWithInitial: (chatId, initialMessage, messages = []) => {
            set(state => {
                state.chats[chatId] = [
                    ...messages.map(msg => ({
                        id: msg.id ?? 0, // Значение по умолчанию для ID
                        chatId: msg.chatId ?? chatId, // Указываем текущий chatId
                        message: msg.message ?? '',
                        authorId: msg.authorId ?? null,
                        isServer: msg.isServer ?? false,
                        opponentViewed: msg.opponentViewed ?? false,
                        createdAt: msg.createdAt || new Date().toISOString(),
                        updatedAt: msg.updatedAt || new Date().toISOString(),
                    })),
                    ...(initialMessage
                        ? [
                              {
                                  id: initialMessage.id ?? 0,
                                  chatId: initialMessage.chatId ?? chatId,
                                  message: initialMessage.message ?? '',
                                  authorId: initialMessage.authorId ?? null,
                                  isServer: initialMessage.isServer ?? false,
                                  opponentViewed:
                                      initialMessage.opponentViewed ?? false,
                                  createdAt:
                                      initialMessage.createdAt ||
                                      new Date().toISOString(),
                                  updatedAt:
                                      initialMessage.updatedAt ||
                                      new Date().toISOString(),
                              },
                          ]
                        : []),
                ].sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                )
            })
        },

        fetchChatMessages: async (chatId, fetchFunction) => {
            set(state => {
                state.isLoading[chatId] = true
                state.error[chatId] = null
            })

            try {
                const result = fetchFunction()
                const response = await result.refetch()

                if (response.data) {
                    const messages = response.data.data.messages
                    set(state => {
                        state.chats[chatId] = messages.map(msg => ({
                            ...msg,
                            createdAt:
                                msg.createdAt || new Date().toISOString(),
                        }))
                    })
                    return response
                } else {
                    throw new Error('Сообщения отсутствуют')
                }
            } catch (error: any) {
                set(state => {
                    state.error[chatId] = error.message || 'Ошибка загрузки'
                })
                throw error
            } finally {
                set(state => {
                    state.isLoading[chatId] = false
                })
            }
        },
    }))
)
