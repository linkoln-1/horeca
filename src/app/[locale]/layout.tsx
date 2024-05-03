import { ReactNode } from 'react'

import { ClientProviders } from '@/core/providers/ClientProviders'
import { ColorSchemeScript } from '@mantine/core'
import type { Metadata } from 'next'

import '@/styles/globals.css'
import '@mantine/core/styles.css'

const APP_NAME = 'Horeka'
const APP_DEFAULT_TITLE = 'Horeka'
const APP_TITLE_TEMPLATE = '%s - App'
const APP_DESCRIPTION = 'Horeka corporation application'

export const metadata: Metadata = {
    description: APP_DESCRIPTION,
    icons: '/favicon.ico',
    manifest: '/manifest.json',
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
        startupImage: 'favicons/apple-touch-icon.png',
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
}

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: ReactNode
    params: { locale: string }
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
                <ClientProviders locale={locale}>{children}</ClientProviders>
            </body>
        </html>
    )
}
