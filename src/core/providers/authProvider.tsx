import { ReactNode, useEffect, useState } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { userQueries } from '@/entities/user'
import { usePathname, useRouter } from 'next/navigation'

import { outSidePages } from '@/shared/constants'
import { FullPageLoader } from '@/shared/ui/FullPageLoader'

type AuthProviderProps = {
    children?: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isEnabled, setIsEnabled] = useState(false)
    const [isRefreshFirstTimeLoading, setIsRefreshFirstTimeLoading] =
        useState(true)

    const { user, accessToken, updateUser } = useUserStore(state => state)
    const userId = user?.id

    const path = usePathname()
    const router = useRouter()

    //  Эту логику нужно доработать, потому что она не работает так, как ожидается
    // Возможно, стоит использовать другой подход
    // сейчас юзер может зайти на страницу буквально на секунду, и его перекинет на страницу логина такого быть не должно

    // const {
    //     data,
    //     isLoading: isUserLoading,
    //     refetch: refetchUser,
    // } = userQueries.useGetMeQuery(isEnabled, userId)

    useEffect(() => {
        if (!accessToken && !outSidePages.includes(path)) {
            router.push('/sign-in')
        }
        // } else if (!userId) {
        //     router.push('/sign-in')
        // } else {
        //     setIsEnabled(true)
        //     // if (userId) {
        //     //     refetchUser();
        //     // }
        // }
    }, [accessToken, userId, path])

    // useEffect(() => updateUser(data), [data])

    // const isAnyLoading = !isEnabled || isRefreshFirstTimeLoading
    //
    // if (!accessToken) {
    //     return <FullPageLoader className='w-screen h-screen' />
    // }

    return <>{children}</>
}
