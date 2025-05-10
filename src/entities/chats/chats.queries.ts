import { useState } from 'react'

import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    ChatCreateDto,
    ChatMessageDto,
    ErrorDto,
} from '@/shared/lib/horekaApi/Api'
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
        refetchOnMount: 'always',
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

export function useInfiniteGetAllMessagesQuery({ chatId }: { chatId: number }) {
    return useInfiniteQuery<
        { data: ChatMessageDto[]; total: number },
        ErrorDto,
        { data: ChatMessageDto[]; total: number },
        (string | number)[],
        number
    >({
        queryKey: ['chat-messages', chatId],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await api.chatsMessageControllerGetChatMessages({
                search: { chatId },
                offset: pageParam,
            })
            return response.data
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce(
                (acc, page) => acc + page.data.length,
                0
            )
            const hasMore = lastPage.data.length === 10
            return hasMore ? totalFetched : undefined
        },
        refetchOnMount: 'always',
        staleTime: 0,
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
