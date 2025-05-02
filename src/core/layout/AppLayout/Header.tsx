import React, { useState } from 'react'

import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Burger,
    Button,
    Container,
    Divider,
    Drawer,
    Flex,
    Image as MantineImage,
    NavLink,
    Paper,
    useCombobox,
} from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    horecaSidebarData,
    providerSidebarData,
    roles,
} from '@/shared/constants'
import { role } from '@/shared/helpers/getRole'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function Header() {
    const [opened, setOpened] = useState(false)

    const toggleMenu = () => {
        setOpened(prev => !prev)
    }
    const isMobile = useBreakpoint('xl')
    const path = usePathname()

    const { user } = useUserStore(state => state)

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })

    const { clearTokens: logOut } = useUserStore(state => state)

    const roleSidebar =
        user?.profile?.profileType === roles[0].role
            ? providerSidebarData
            : horecaSidebarData

    return (
        <Paper w='100%' bg='var(--mantine-color-indigo-0)' p='sm'>
            <Container fluid>
                <Flex justify='space-between' align='center'>
                    <Flex gap='xs' align='center'>
                        {isMobile && (
                            <Burger
                                opened={opened}
                                onClick={toggleMenu}
                                size='sm'
                            />
                        )}

                        <Drawer
                            opened={opened}
                            onClose={toggleMenu}
                            size='80%'
                            padding='md'
                            // overlayOpacity={0.3}
                            position='left'
                        >
                            {/* Мобильное меню */}
                            <Flex direction='column' gap='lg'>
                                {roleSidebar &&
                                    user &&
                                    roleSidebar.map((x, index) => {
                                        if (x.type === 'divider') {
                                            return (
                                                <Divider
                                                    color='#A0AAC8'
                                                    key={index}
                                                />
                                            )
                                        }

                                        const isActive =
                                            path ===
                                            `/user${role({ user })}${x.link}`

                                        const isDynamicActive = x.match?.some(
                                            route =>
                                                path.startsWith(
                                                    `/user${role({ user })}${route}`
                                                )
                                        )

                                        return (
                                            <Link
                                                className={`flex items-center justify-between h-[18px] text-[14px] font-bold ${isActive || isDynamicActive ? 'text-[var(--mantine-color-indigo-4)]' : 'text-[#2B2B2B]'} hover:text-[#474747] relative`}
                                                key={x.label}
                                                href={`/user${role({ user })}${x.link}`}
                                            >
                                                <Flex
                                                    gap={20}
                                                    align='center'
                                                    pos='relative'
                                                >
                                                    <x.icon />
                                                    {x.label}
                                                </Flex>
                                                {x.badge && <x.badge />}
                                                {/*{x.iconRight && <x.iconRight />}*/}
                                            </Link>
                                        )
                                    })}
                                <Flex gap='sm' align='center'>
                                    <Button
                                        color='#385191'
                                        size='compact-sm'
                                        variant='transparent'
                                        onClick={logOut}
                                    >
                                        Выйти
                                    </Button>
                                </Flex>
                            </Flex>
                        </Drawer>

                        <Link
                            href={`/user${user && role({ user })}/applications`}
                        >
                            <MantineImage
                                src='/assets/icons/logo.svg'
                                alt='Horeka logo'
                            />
                        </Link>
                    </Flex>

                    {!isMobile && (
                        <Flex gap='sm' align='center'>
                            <Button
                                color='#385191'
                                size='compact-sm'
                                variant='transparent'
                                onClick={logOut}
                            >
                                Выйти
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Container>
        </Paper>
    )
}
