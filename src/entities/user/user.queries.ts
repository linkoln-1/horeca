import { toast } from 'react-toastify'

import { userStore } from '@/entities/user/user.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { UsersPaginatedQuery } from '@/shared/lib/horekaApi/types'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useRegisterUserMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.authorizationControllerRegistrate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
        },
    })
}

export function useLoginUserMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.authorizationControllerLogin,

        onSuccess: async ({ data }) => {
            userStore.getState().updateTokens({
                accessToken: data.accessToken || null,
                refreshToken: data.refreshToken || null,
            })

            await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
        },
    })
}

export function useActivateUserMutation() {
    return useMutation({
        mutationFn: api.authorizationControllerActivateAccount,
        onSuccess: async () => {},
    })
}

export function useGetMeQuery(enabled = true || undefined) {
    return useCustomQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const result = await api.usersControllerGet()

            userStore.getState().updateUser(result.data)

            return result
        },
        enabled,
    })
}

export function useGetUsersInfiniteQuery(query: UsersPaginatedQuery) {
    return useCustomInfiniteQuery({
        queryKey: ['users', query],
        queryFn: ({ pageParam }) =>
            api.usersAdminControllerGet({
                ...query,
                offset: pageParam,
            }),
    })
}

export function useUpdateUserMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.usersControllerUpdate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
        },
    })
}
