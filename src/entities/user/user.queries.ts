import { userStore } from '@/entities/user/user.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { api } from '@/shared/lib/horekaApi'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useRegisterUserMutation() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: api.authorizationControllerRegistrate,
        onSuccess: async ({ data }) => {
            userStore.getState().updateTokens({
                accessToken: data.accessToken || null,
                refreshToken: data.refreshToken || null,
            })

            router.push('/user')

            await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
        },
    })
}

export function useLoginUserMutation() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: api.authorizationControllerLogin,
        onSuccess: async ({ data }) => {
            userStore.getState().updateTokens({
                accessToken: data.accessToken || null,
                refreshToken: data.refreshToken || null,
            })

            router.push('/user')

            await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
        },
    })
}
