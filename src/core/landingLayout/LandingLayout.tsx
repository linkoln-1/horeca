import { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { Container, Grid } from '@mantine/core'

import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

type LandingLayoutProps = {
    children: ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    const isMobile = useBreakpoint('sm')
    return (
        <Container className='min-h-screen flex flex-col justify-between' fluid>
            <Grid>
                <Grid.Col span={12}>
                    <Header />
                </Grid.Col>

                <Grid.Col>{children}</Grid.Col>
            </Grid>
            <Footer />
        </Container>
    )
}
