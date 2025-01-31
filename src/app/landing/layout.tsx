import { ReactNode } from 'react'

import { LandingProvider } from '@/core/providers/LandingProvider'
import { ColorSchemeScript } from '@mantine/core'
import { Metadata } from 'next'

export const metadata: Metadata = {
    description: 'Horeca corporation application',
    icons: '/favicon.ico',
    applicationName: 'Horeca',
    title: {
        default: 'Horeca',
        template: 'Horeca',
    },
}

export default function layout({
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
                <LandingProvider>{children}</LandingProvider>
            </body>
        </html>
    )
}
