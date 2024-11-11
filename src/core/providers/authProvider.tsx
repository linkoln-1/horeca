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
    const { updateUser, accessToken } = useUserStore(state => state)
    const [isLoading, setIsLoading] = useState(true)

    const path = usePathname()
    const router = useRouter()
    const {
        data: user,
        refetch: refetchUser,
        isFetched,
    } = userQueries.useGetMeQuery(Boolean(accessToken))

    useEffect(() => {
        if (!accessToken) {
            if (!outSidePages.includes(path)) {
                router.replace('/sign-in')
            }
            setIsLoading(false)
            return
        }

        const checkUser = async () => {
            try {
                const response = await refetchUser()

                if (response.data) {
                    updateUser(response.data)
                    setIsLoading(false)
                } else {
                    router.replace('/sign-in')
                }
            } catch (error) {
                router.replace('/sign-in')
            }
        }

        checkUser()
    }, [accessToken, path, refetchUser, updateUser, router])

    useEffect(() => {
        if (!isLoading && accessToken && user) {
            if (outSidePages.includes(path)) {
                router.replace('/user')
            }
        }
    }, [isLoading, accessToken, user, path, router])

    if (isLoading || (!isFetched && accessToken)) {
        return <FullPageLoader className='w-screen h-screen' />
    }

    return <>{children}</>
}
