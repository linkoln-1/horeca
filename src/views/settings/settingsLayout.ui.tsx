'use client'

import { ReactNode } from 'react'

import { Grid, SegmentedControl, SegmentedControlItem } from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'

import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

const tabs: SegmentedControlItem[] = [
    {
        label: 'Информация о поставщике',
        value: '/user/settings/edit',
    },
    {
        label: 'Об условиях доставки и категориях товаров',
        value: '/user/settings/delivery',
    },
]

export function SettingsLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const path = usePathname()
    const isMobile = useBreakpoint('sm')

    return (
        <Grid justify='space-between'>
            <Grid.Col
                span={{
                    base: 12,
                    md: 4,
                }}
            >
                <SegmentedControl
                    withItemsBorders
                    onChange={router.push}
                    value={path}
                    color='blue'
                    data={tabs}
                    orientation={!isMobile ? 'vertical' : 'horizontal'}
                    size='md'
                />
            </Grid.Col>

            <Grid.Col
                span={{
                    base: 12,
                    md: 7,
                }}
            >
                {children}
            </Grid.Col>
        </Grid>
    )
}
