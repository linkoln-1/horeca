'use client'

import { ReactNode } from 'react'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClientProvider } from '@tanstack/react-query'

import { theme } from '@/shared/constants'
import { useCleanPathname } from '@/shared/hooks/useCleanPathname'
import { queryClient } from '@/shared/lib/reactQuery'
import { I18nProviderClient } from '@/shared/locales/client'

import '@/styles/globals.css'
import '@mantine/core/styles.css'

type ClientProvidersProps = {
    children?: ReactNode
    locale: string
}

export function ClientProviders({ children, locale }: ClientProvidersProps) {
    const path = useCleanPathname()

    const isUpdatePasswordPath =
        /^\/account\/update-password\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/

    const outSidePages = [
        '/',
        '/account/forgot-password',
        '/sign-up',
        '/sign-in',
    ]

    const isInsideApp =
        !isUpdatePasswordPath.test(path) &&
        outSidePages.filter(url => url === path).length === 0

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider defaultColorScheme='light' theme={theme}>
                <ModalsProvider>
                    <I18nProviderClient locale={locale}>
                        {children}
                    </I18nProviderClient>
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    )
}
