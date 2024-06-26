'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { useRouter } from 'next/navigation'

export function ProfileRootView() {
    const router = useRouter()

    const user = useUserStore(state => state.user)

    useEffect(() => {
        user && router.push(`/user/${user.id}`)
    }, [user])

    return null
}
