import React, { ReactNode, useEffect, useState } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { useUserStore } from '@/core/providers/userStoreContext'
import { imageQueries } from '@/entities/uploads'
import { userQueries } from '@/entities/user'
import { Container, Grid, Paper, Flex, Box, Divider, Text } from '@mantine/core'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    horecaSidebarData,
    providerSidebarData,
    adminSidebarData,
} from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import { role } from '@/shared/helpers/getRole'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import { useWebSocketNotifications } from '@/shared/hooks/useWebSocketNotifications'
import { ProfileType } from '@/shared/lib/horekaApi/Api'
import { CustomAvatarUpload } from '@/shared/ui/CustomAvatarUpload'

type AppLayoutProps = {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    useWebSocketNotifications()
    const isMobile = useBreakpoint('xl')
    const path = usePathname()
    const isRecovery = path?.startsWith('/account/password_recovery')

    if (isRecovery) {
        return (
            <>
                <Header />
                {children}
            </>
        )
    }
    const { user, accessToken, updateUser } = useUserStore(state => state)
    // TODO:баг с ролью выхода и захода
    // useEffect(() => {})
    const { mutateAsync: uploadImage } = imageQueries.useImageUploadMutation()
    const { mutateAsync: updateUserAvatar, isPending } =
        userQueries.useUpdateUserMutation()

    const decode: any = accessToken && jwtDecode(accessToken)

    const roleSidebar =
        user?.profile?.profileType === ProfileType.Provider
            ? providerSidebarData
            : user?.profile?.profileType === ProfileType.Horeca
              ? horecaSidebarData
              : adminSidebarData

    const handleAvatarChange = (payload: File | null) => {
        if (payload) {
            try {
                uploadImage({
                    file: payload,
                }).then(x => {
                    updateUserAvatar({
                        avatar: x.id,
                    })
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Container className='min-h-screen flex flex-col justify-between' fluid>
            <Grid>
                <Grid.Col
                    span={12}
                    className='flex items-center justify-between'
                >
                    <Header />
                </Grid.Col>

                <Grid.Col
                    span={{ base: 0, xs: 0, sm: 2, md: 2 }}
                    h='calc(100vh - 235px)'
                    pos='sticky'
                    top={20}
                    visibleFrom='xl'
                >
                    <Paper
                        bg='var(--mantine-color-indigo-0)'
                        p='md'
                        radius='md'
                        h='100%'
                    >
                        <Flex direction='column' gap={24}>
                            <Flex direction='column' align='center' gap='md'>
                                <Box w={150} h={150}>
                                    <CustomAvatarUpload
                                        editable={decode?.role != 'Admin'}
                                        onChange={(payload: File | null) => {
                                            handleAvatarChange(payload)
                                        }}
                                        src={getImageUrl(user?.avatar?.path)}
                                        size='100%'
                                        color='blue'
                                        className='aspect-square cursor-pointer'
                                    />
                                </Box>
                                <Flex
                                    direction='column'
                                    gap='lg'
                                    align='center'
                                >
                                    <Text size='xl' fw={700}>
                                        {user?.name}
                                    </Text>
                                    <Text>email: {user?.email}</Text>
                                </Flex>
                            </Flex>

                            <Divider color='#A0AAC8' />

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
                        </Flex>
                    </Paper>
                </Grid.Col>

                <Grid.Col
                    span={{
                        base: 12,
                        xs: 12,
                        sm: isMobile ? 12 : 10,
                        md: isMobile ? 12 : 10,
                    }}
                >
                    {children}
                </Grid.Col>
            </Grid>

            <Footer my='md' />
        </Container>
    )
}
