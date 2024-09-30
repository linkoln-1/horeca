import { ReactNode, useEffect } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { userQueries } from '@/entities/user'
import { usePathname, useRouter } from 'next/navigation'

import { outSidePages } from '@/shared/constants'
import { FullPageLoader } from '@/shared/ui/FullPageLoader'

type AuthProviderProps = {
    children?: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { user, updateUser, accessToken } = useUserStore(state => state)

    const path = usePathname()
    const router = useRouter()
    const { data, isLoading } = userQueries.useGetMeQuery()

    useEffect(() => {
        if (user) {
            if (outSidePages.includes(path) && accessToken) {
                router.push(`/user`)
            }
        } else {
            if (!outSidePages.includes(path) && !accessToken) {
                router.push('/sign-in')
            }
        }
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

    if (isLoading) {
        return <FullPageLoader className='w-screen h-screen' />
    }

    return <>{children}</>
}
