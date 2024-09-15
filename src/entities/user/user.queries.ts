import { toast } from 'react-toastify'

import { userStore } from '@/entities/user/user.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
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

export function useGetMeQuery(enabled: boolean = true) {
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

export function useUpdateUserMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.usersControllerUpdate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
            toast.success('Your account successfully updated.')
        },
        onError: error => {
            toast.error(`Error updating user: ${error.name}`)
        },
    })
}
