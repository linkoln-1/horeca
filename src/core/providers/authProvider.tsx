import { ReactNode, useEffect, useState } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { userQueries } from '@/entities/user'
import { jwtDecode } from 'jwt-decode'
import { usePathname, useRouter } from 'next/navigation'

import { outSidePages } from '@/shared/constants'
import { FullPageLoader } from '@/shared/ui/FullPageLoader'

type AuthProviderProps = {
    children?: ReactNode
}

type DecodeType = {
    role: string
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { updateUser, accessToken } = useUserStore(state => state)
    const [isLoading, setIsLoading] = useState(true)

    const path = usePathname()
    const router = useRouter()
    const { data: user, refetch: refetchUser } = userQueries.useGetMeQuery(
        Boolean(accessToken)
    )

    let decode: DecodeType | null = null
    try {
        decode = accessToken ? jwtDecode<DecodeType>(accessToken) : null
    } catch (error) {
        console.error('Failed to decode token:', error)
    }

    useEffect(() => {
        const checkAuth = async () => {
            if (!accessToken) {
                if (
                    !outSidePages.includes(path) &&
                    !path.startsWith('/account/password_recovery')
                ) {
                    console.log('sign-in')
                    router.replace('/sign-in')
                }
                setIsLoading(false)
                return
            }

            if (outSidePages.includes(path)) {
                router.replace('/user')
            }
            try {
                const response = await refetchUser()

                if (response.data) {
                    updateUser(response.data)
                } else {
                    router.replace('/sign-in')
                }
            } catch (error) {
                router.replace('/sign-in')
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [accessToken, path])

    if (isLoading) {
        return <FullPageLoader className='w-screen h-screen' />
    }

    return <>{children}</>
}
