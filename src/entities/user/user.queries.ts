import { userStore } from '@/entities/user/user.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useRegisterUserMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.authorizationControllerRegistrate,
        onSuccess: async ({ data }) => {
            userStore.getState().updateTokens({
                accessToken: data.accessToken || null,
                refreshToken: data.refreshToken || null,
            })
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

export function useGetMeQuery(enabled: boolean = true, id: number) {
    return useCustomQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const result = await api.usersControllerGet(id)

            userStore.getState().updateUser(result.data)

            return result
        },
        enabled,
    })
}
