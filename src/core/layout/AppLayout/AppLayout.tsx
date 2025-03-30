import React, { ReactNode, useEffect } from 'react'

import { Footer } from '@/core/layout/AppLayout/Footer'
import { Header } from '@/core/layout/AppLayout/Header'
import { useUserStore } from '@/core/providers/userStoreContext'
import { imageQueries } from '@/entities/uploads'
import { userQueries } from '@/entities/user'
import {
    Box,
    Container,
    Divider,
    Flex,
    Grid,
    Loader,
    Paper,
    Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
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
import {
    ProfileType,
    UpdateUserDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'
import { CustomAvatarUpload } from '@/shared/ui/CustomAvatarUpload'

type AppLayoutProps = {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    const form = useForm<UpdateUserDto | UploadDto>({
        initialValues: {
            avatar: 0,
        },
    })

    const isMobile = useBreakpoint('xl')
    const path = usePathname()

    const { user, accessToken, updateUser } = useUserStore(state => state)
    const { data } = userQueries.useGetMeQuery()

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

    console.log(data)

    // useEffect(() => {
    //     if (data) {
    //
    //     }
    // }, [data])

    return (
        <Container className='min-h-screen flex flex-col justify-between' fluid>
            <Grid>
                <Grid.Col span={12}>
                    <Header />
                </Grid.Col>

                <Grid.Col
                    span={{
                        base: 0,
                        xs: 0,
                        sm: 2,
                        md: 2,
                    }}
                    h='calc(100vh - 235px)'
                    pos='sticky'
                    top={20}
                >
                    <Paper
                        bg='var(--mantine-color-indigo-0)'
                        p='md'
                        radius='md'
                        h='100%'
                        w='100%'
                    >
                        <Flex direction='column' gap={24}>
                            <Flex gap='md' align='center' direction='column'>
                                <Box w={150} h={150}>
                                    <CustomAvatarUpload
                                        editable={decode?.role != 'Admin'}
                                        onChange={(payload: File | null) => {
                                            handleAvatarChange(payload)
                                        }}
                                        src={undefined}
                                        size='100%'
                                        color='blue'
                                        className='aspect-square cursor-pointer'
                                    />
                                </Box>
                                <Box>
                                    <Flex direction='column' gap='lg'>
                                        {[user].map(item => (
                                            <Flex
                                                key={item && item.id}
                                                direction='column'
                                                gap='md'
                                                justify='center'
                                                align='center'
                                            >
                                                <Text size='xl' fw={700}>
                                                    {item && item.name}
                                                </Text>

                                                <Text>
                                                    email: {item && item.email}
                                                </Text>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>
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
