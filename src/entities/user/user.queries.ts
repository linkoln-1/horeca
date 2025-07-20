import { toast } from 'react-toastify'

import { userStore } from '@/entities/user/user.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { ChangePasswordDto } from '@/shared/lib/horekaApi/Api'
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

export function usePasswordRecoveryMutation() {
    return useMutation({
        mutationFn: (email: string) =>
            api.authorizationControllerPasswordRecovery({ email }),
        onSuccess: () => {
            toast.success(
                'Инструкции по восстановлению отправлены на ваш email'
            )
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Произошла ошибка'
            toast.error(message)
        },
    })
}

export function useChangePasswordMutation(uuid: string) {
    return useMutation({
        mutationFn: (data: ChangePasswordDto) =>
            api.authorizationControllerPasswordChange(uuid, data),
        onSuccess: () => {
            toast.success('Пароль успешно изменён')
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                'Произошла ошибка при изменении пароля'
            toast.error(message)
        },
    })
}
