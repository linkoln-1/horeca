import React, { ReactNode } from 'react'

import { Footer } from '@/core/layout/AppLayout/Footer'
import { Header } from '@/core/layout/AppLayout/Header'
import { Box, Container, Flex } from '@mantine/core'

type AppLayoutProps = {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className='flex flex-col min-h-[100vh]'>
            <Header />

            <Box className='w-[1400px] mx-auto' pt='md'>
                {children}
            </Box>

            <Footer />
        </div>
    )
}
