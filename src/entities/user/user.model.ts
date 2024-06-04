import { createStore, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { UserDto } from '@/shared/lib/horekaApi/Api'

export type UserState = {
    accessToken: string | null
    refreshToken: string | null
    user: UserDto | null
    updateTokens: (tokens: {
        accessToken?: string | null
        refreshToken?: string | null
    }) => void
    clearTokens: () => void
    updateUser: (user?: UserDto) => void
}

export const createUserSlice: StateCreator<UserState> = set => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    updateTokens: ({ accessToken, refreshToken }) => {
        const { accessToken: oldAccessToken, refreshToken: oldRefreshToken } =
            userStore.getState()

        return set(
            {
                accessToken: accessToken || oldAccessToken,
                refreshToken: refreshToken || oldRefreshToken,
            },
            false
        )
    },
    clearTokens: () =>
        set({ accessToken: null, refreshToken: null, user: null }, false),
    updateUser: user => set({ user: user || null }, false),
})

const persistOptions = { name: 'session' }
const devtoolsOptions = { name: 'sessionStore' }

export const userStore = createStore<UserState>()(
    devtools(persist(createUserSlice, persistOptions), devtoolsOptions)
)

export const getAuthHeader = () => {
    if (userStore.getState().accessToken) {
        return { Authorization: `Bearer ${userStore.getState().accessToken}` }
    }
}
