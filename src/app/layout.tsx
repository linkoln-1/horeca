import { ReactNode } from 'react'

import { ClientProviders } from '@/core/providers/ClientProviders'
import { ColorSchemeScript } from '@mantine/core'
import type { Metadata } from 'next'

import '@/styles/globals.css'
import '@mantine/core/styles.css'

export const metadata: Metadata = {
    description: 'Horeka corporation application',
    icons: '/favicon.ico',
    applicationName: 'Horeka',
    title: {
        default: 'Horeka',
        template: 'Horeka',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang='en'>
            <head>
                <ColorSchemeScript />
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
                />
            </head>
            <body>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    )
}
