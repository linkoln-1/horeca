import { ReactNode } from 'react'

import { ClientProviders } from '@/core/providers/ClientProviders'
import { ColorSchemeScript } from '@mantine/core'
import type { Metadata } from 'next'

import '@/styles/globals.css'
import '@/styles/template.scss'

export const metadata: Metadata = {
    description: 'Horeca corporation application',
    icons: '/favicon.ico',
    applicationName: 'Horeca',
    title: {
        default: 'Horeca',
        template: 'Horeca',
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
