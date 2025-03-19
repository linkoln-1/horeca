'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import { useRouter } from 'next/navigation'

import { ProfileType } from '@/shared/lib/horekaApi/Api'

export function ProfileRootView() {
    const router = useRouter()
    const { user } = useUserStore(state => state)

    useEffect(() => {
        if (user) {
            const welcomePage =
                user.profile?.profileType === ProfileType.Provider
                    ? `/user/provider/products/applications`
                    : user.profile?.profileType === ProfileType.Horeca
                      ? `/user/horeca/applications`
                      : '/user/admin/support'
            router.replace(welcomePage)
        }
    }, [user, router])

    return null
}
