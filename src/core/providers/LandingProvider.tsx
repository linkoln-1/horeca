'use client'

import { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css'

import LandingLayout from '../landingLayout/LandingLayout'
import { MantineProvider } from '@mantine/core'

import { theme } from '@/shared/constants'

import '@/styles/globals.scss'
import '@mantine/core/styles.css'

type LandingProvidersProps = {
    children?: ReactNode
}

export function LandingProvider({ children }: LandingProvidersProps) {
    return (
        <MantineProvider defaultColorScheme='light' theme={theme}>
            <LandingLayout>{children}</LandingLayout>
        </MantineProvider>
    )
}
