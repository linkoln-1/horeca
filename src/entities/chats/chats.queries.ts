import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { ChatCreateDto } from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useGetChatQuery() {
    return useCustomQuery({
        queryKey: ['chat'],
        queryFn: () => api.chatsControllerFindAll(),
    })
}

export function useGetChatsByIdQuery({
    id,
    enabled,
}: {
    id: number
    enabled: boolean
}) {
    return useQuery({
        queryKey: ['chat', id],
        queryFn: async () => {
            const res = await api.chatsControllerGetChat(id)
            return res
        },

        enabled,
    })
}

export function useChatCreateMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ data }: { data: ChatCreateDto }) =>
            api.chatsControllerCreateChat(data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: ['chat'] })
        },
    })
}

export function useInfiniteGetAllMessagesQuery(query?: {
    offset: number
    limit: number
    search: string
    sort: string
}) {
    return useCustomInfiniteQuery({
        queryKey: ['chat-messages'],
        queryFn: () => api.chatsMessageControllerGetChatMessages(query),
    })
}

export function useUpdateMessagesMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id }: { id: number }) =>
            api.chatsMessageControllerViewMessage(id),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: ['chat-messages'] })
        },
    })
}

export function useGetUserSupportListQuery() {
    return useCustomQuery({
        queryKey: ['user-support-list'],
        queryFn: () => api.supportRequestsControllerList(),
    })
}
