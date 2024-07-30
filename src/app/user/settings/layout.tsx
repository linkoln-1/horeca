import { ReactNode } from 'react'

import { SettingsLayout } from '@/views/settings'

export default function Layout({ children }: { children: ReactNode }) {
    return <SettingsLayout>{children}</SettingsLayout>
}
