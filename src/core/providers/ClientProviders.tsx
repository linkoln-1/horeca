'use client'

import { ReactNode } from 'react'

import { AppLayout } from '@/core/layout/AppLayout/AppLayout'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClientProvider } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

import { theme } from '@/shared/constants'
import { queryClient } from '@/shared/lib/reactQuery'

import '@/styles/globals.css'
import '@mantine/core/styles.css'

type ClientProvidersProps = {
    children?: ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
    const path = usePathname()

    const outSidePages = ['/', '/sign-up', '/sign-in']

    const isInsideApp = outSidePages.filter(url => url === path).length === 0

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider defaultColorScheme='light' theme={theme}>
                <ModalsProvider>
                    {isInsideApp && <AppLayout>{children}</AppLayout>}
                    {!isInsideApp && children}
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    )
}
