import { userStore } from '@/entities/user/user.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { api } from '@/shared/lib/horekaApi'

/**
 * Custom hook to register a new user.
 * On successful registration, it updates the tokens in the user store and navigates to the '/user' route.
 * It also invalidates the 'user' query to ensure the user data is up-to-date.
 * @returns {Mutation} The mutation object provided by react-query.
 */
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

/**
 * Custom hook to log in a user.
 * On successful login, it updates the tokens in the user store and navigates to the '/user' route.
 * It also invalidates the 'user' query to ensure the user data is up-to-date.
 * @returns {Mutation} The mutation object provided by react-query.
 */
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
