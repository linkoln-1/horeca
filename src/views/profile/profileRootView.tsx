'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { useRouter } from 'next/navigation'

import { roles } from '@/shared/constants'

export function ProfileRootView() {
    const router = useRouter()
    const { user } = useUserStore(state => state)

    useEffect(() => {
        if (user) {
            console.log('User data in ProfileRootView:', user)
            if (user.profile?.profileType === roles[0].role) {
                console.log('Redirecting to /user/provider/requests')
                router.replace(`/user/provider/requests`)
            } else {
                console.log('Redirecting to /user/horeca/applications')
                router.replace(`/user/horeca/applications`)
            }
        }
    }, [user, router])

    return null
}
