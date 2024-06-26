'use client'

import { useState } from 'react'

import { DeliveryForm } from '@/features/delivery'
import { SettingsForm } from '@/features/profile'
import { Box, Flex, Grid, SegmentedControl } from '@mantine/core'

import { Page } from '@/shared/ui/Page'

const links = [
    {
        label: 'Информация о поставщике',
        href: '/settings/supplier/info',
    },
    {
        label: 'Об условиях доставки и категориях товаров',
        href: '/settings/supplier/delivery',
    },
]

export function SettingsViews() {
    const [activeTab, setActiveTab] = useState(links[0].label)

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }

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
                    onChange={handleTabChange}
                    value={activeTab}
                    color='blue'
                    data={links.map(({ label }) => label)}
                    orientation='vertical'
                    size='md'
                />
            </Grid.Col>

            <Grid.Col
                span={{
                    base: 12,
                    md: 7,
                }}
            >
                {activeTab === 'Информация о поставщике' ? (
                    <SettingsForm />
                ) : (
                    <DeliveryForm />
                )}
            </Grid.Col>
        </Grid>
    )
}
