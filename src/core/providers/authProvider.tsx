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
    const [isUserLoading, setIsUserLoading] = useState(true)

    const { user, updateUser, accessToken } = useUserStore(state => state)

    const path = usePathname()
    const router = useRouter()
    const { data } = userQueries.useGetMeQuery(isEnabled)

    useEffect(() => {
        const handleAuthentication = async () => {
            if (user) {
                setIsEnabled(true)
                setIsUserLoading(false)

                if (outSidePages.includes(path)) {
                    router.push('/user')
                }
            } else {
                if (!outSidePages.includes(path)) {
                    router.push('/sign-in')
                }
                setIsEnabled(true)
                setIsUserLoading(false)
            }
        }
        handleAuthentication()
    }, [user, path, accessToken])

    useEffect(() => {
        if (data) {
            updateUser(data)
        }
    }, [data])

    useEffect(() => {
        if (!accessToken && !outSidePages.includes(path)) {
            router.push('/sign-in')
        }
    }, [accessToken, path])

    if (isUserLoading) {
        return <FullPageLoader className='w-screen h-screen' />
    }

    return <>{children}</>
}
