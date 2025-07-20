import { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import CookieConsent from '@/views/landing/cookies/Cookies'
import { Container, Flex, Grid } from '@mantine/core'

type LandingLayoutProps = {
    children: ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <Container
            className='min-h-screen flex flex-col justify-between'
            fluid
            styles={theme => ({
                root: {
                    padding: '0px',
                },
            })}
        >
            <Flex direction={'column'}>
                <Header />
                {children}
            </Flex>
            <CookieConsent />
            <Footer />
        </Container>
    )
}
