'use client'

import { ReactNode } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Flex,
    Grid,
    SegmentedControl,
    SegmentedControlItem,
} from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'

import { roles } from '@/shared/constants'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function SettingsLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const path = usePathname()
    const user = useUserStore(state => state.user)
    const isMobile = useBreakpoint('sm')

    const tabs: SegmentedControlItem[] = [
        {
            label: 'Информация о поставщике',
            value: `/user/${user && user.profile.profileType.toLowerCase()}/settings/edit`,
        },
        {
            label: 'Об условиях доставки и категориях товаров',
            value: `/user/${user && user.profile.profileType.toLowerCase()}/settings/delivery`,
        },
    ]

    if (user?.profile.profileType === roles[1].role) {
        tabs[0].label = 'Общая информация'

        tabs[1].label = 'Об условиях приемки товара'
        tabs[1].value = `/user/${user && user.profile.profileType.toLowerCase()}/settings/product-acceptance-terms`
    }

    return (
        <Flex direction='column' gap='md'>
            <Flex w='100%'>
                <SegmentedControl
                    withItemsBorders
                    onChange={value => value && router.push(value)}
                    value={
                        tabs.find(tab => tab.value === path)?.value ||
                        tabs[0]?.value
                    }
                    color='indigo.4'
                    data={tabs}
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                    size='md'
                />
            </Flex>

            <Grid>
                <Grid.Col
                    span={{
                        base: 12,
                    }}
                >
                    {children}
                </Grid.Col>
            </Grid>
        </Flex>
    )
}
