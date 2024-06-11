import React, { ReactNode } from 'react'

import { Footer } from '@/core/layout/AppLayout/Footer'
import { Header } from '@/core/layout/AppLayout/Header'
import { Box, Container } from '@mantine/core'

type AppLayoutProps = {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <Box>
            <Header />

            <Container size='xl' px='md' className='flex-grow min-h-[75vh]'>
                <Box pt='md'>{children}</Box>
            </Container>

            <Footer />
        </Box>
    )
}
