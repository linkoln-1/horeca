'use client'

import {
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { UserState, userStore } from '@/entities/user'
import { useStore } from 'zustand'

import { FullPageLoader } from '@/shared/ui/FullPageLoader'

type UserStoreContext = typeof userStore

export const UserStoreContext = createContext<UserStoreContext | undefined>(
    undefined
)

export type UserStoreProviderProps = {
    children: ReactNode
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
    const [loaded, setLoaded] = useState(false)
    const storeRef = useRef<UserStoreContext>()

    if (!storeRef.current) {
        storeRef.current = userStore
    }

    useEffect(() => setLoaded(true), [])

    if (!storeRef.current || !loaded) {
        return <FullPageLoader className='w-screen h-screen' />
    }

    return (
        <UserStoreContext.Provider value={storeRef.current}>
            {children}
        </UserStoreContext.Provider>
    )
}

export const useUserStore = <T,>(selector: (store: UserState) => T): T => {
    const counterStoreContext = useContext(UserStoreContext)

    if (!counterStoreContext) {
        throw new Error(`useUserStore must be use within UserStoreProvider`)
    }

    return useStore(counterStoreContext, selector)
}
