'use client'

import { ReactNode } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { UserStoreProvider } from './userStoreContext'
import { AppLayout } from '@/core/layout/AppLayout/AppLayout'
import { AuthProvider } from '@/core/providers/authProvider'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

import { outSidePages, theme } from '@/shared/constants'
import { queryClient } from '@/shared/lib/reactQuery'

import '@/styles/globals.scss'
import '@mantine/core/styles.css'

type ClientProvidersProps = {
    children?: ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
    const path = usePathname()

    const isInsideApp = outSidePages.filter(url => url === path).length === 0

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider defaultColorScheme='light' theme={theme}>
                <UserStoreProvider>
                    <AuthProvider>
                        <ModalsProvider>
                            <ToastContainer
                                position='top-center'
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme='light'
                                transition={Bounce}
                            />

                            {isInsideApp && <AppLayout>{children}</AppLayout>}
                            {!isInsideApp && children}
                        </ModalsProvider>
                    </AuthProvider>
                </UserStoreProvider>
            </MantineProvider>
        </QueryClientProvider>
    )
}
