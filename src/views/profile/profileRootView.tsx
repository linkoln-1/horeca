'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

import { roles } from '@/shared/constants'

type DecodeType = {
    role: string
}

export function ProfileRootView() {
    const router = useRouter()
    const { user, accessToken } = useUserStore(state => state)
    const decode: '' | null | DecodeType = accessToken && jwtDecode(accessToken)

    useEffect(() => {
        if (user) {
            if (user.profile?.profileType === roles[0].role) {
                router.replace(`/user/provider/requests`)
            } else {
                router.replace(`/user/horeca/applications`)
            }
        }
    }, [user, router])

    // useEffect(() => {
    //     if (accessToken) {
    //         if (decode && decode.role === roles[2].role) {
    //             router.replace(`/user/admin`)
    //         }
    //     }
    // }, [accessToken, decode])

    return null
}
