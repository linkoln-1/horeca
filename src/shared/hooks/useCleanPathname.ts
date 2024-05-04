'use client'

import { usePathname } from 'next/navigation'

import { useCurrentLocale } from '@/shared/locales/client'

export function useCleanPathname() {
    const pathname = usePathname()
    const locale = useCurrentLocale()

    return pathname.replace(locale, '').replace('//', '/')
}
