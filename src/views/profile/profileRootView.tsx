'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { useRouter } from 'next/navigation'

import { roles } from '@/shared/constants'

export function ProfileRootView() {
    const router = useRouter()
    const user = useUserStore(state => state.user)

    useEffect(() => {
        if (user && user.profile.profileType === roles[0].role) {
            router.push(`/user/provider`)
        } else {
            router.push(`/user/horeca`)
        }
    }, [user])

    return null
}
