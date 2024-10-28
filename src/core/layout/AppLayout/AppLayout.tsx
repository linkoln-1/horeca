import React, { ReactNode } from 'react'

import { Footer } from '@/core/layout/AppLayout/Footer'
import { Header } from '@/core/layout/AppLayout/Header'
import { useUserStore } from '@/core/providers/userStoreContext'
import { imageQueries } from '@/entities/uploads'
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
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    horecaSidebarData,
    providerSidebarData,
    roles,
} from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import { role } from '@/shared/helpers/getRole'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import { CustomAvatarUpload } from '@/shared/ui/CustomAvatarUpload'

type AppLayoutProps = {
    children: ReactNode
}

type Image = {
    url: string
}

type profileProps = {
    avatar?: Image
}

export function AppLayout({ children }: AppLayoutProps) {
    const form = useForm<profileProps>({
        initialValues: {},
    })
    const isMobile = useBreakpoint('sm')
    const path = usePathname()

    const user = useUserStore(state => state.user)
    const { mutateAsync: uploadImage } = imageQueries.useImageUploadMutation()

    const roleSidebar =
        user?.profile.profileType === roles[0].role
            ? providerSidebarData
            : horecaSidebarData

    const handleAvatarChange = async (payload: File | null) => {
        if (payload) {
            await uploadImage({
                file: payload,
            })
        }
    }

    if (!user) return <Loader />

    return (
        <Box className='min-h-screen flex flex-col'>
            <Header />
            <Box style={{ flexGrow: 1 }}>
                <Container>
                    <Grid mt='md' justify='space-between'>
                        {!isMobile && (
                            <Grid.Col
                                span={{
                                    base: 0,
                                    xs: 0,
                                    sm: 'content',
                                    md: 3,
                                }}
                            >
                                <Paper
                                    bg='var(--mantine-color-indigo-0)'
                                    p='md'
                                    radius='md'
                                >
                                    <Flex direction='column' gap={24}>
                                        <Flex
                                            gap='md'
                                            align='center'
                                            direction='column'
                                        >
                                            <Box w={150} h={150}>
                                                <CustomAvatarUpload
                                                    onChange={
                                                        handleAvatarChange
                                                    }
                                                    src={
                                                        form.values.avatar
                                                            ? getImageUrl(
                                                                  form.values
                                                                      .avatar
                                                                      .url
                                                              )
                                                            : undefined
                                                    }
                                                    size='100%'
                                                    color='blue'
                                                    className='aspect-square cursor-pointer'
                                                />
                                            </Box>
                                            <Box>
                                                <Flex
                                                    direction='column'
                                                    gap='lg'
                                                >
                                                    {[user].map(item => (
                                                        <Flex
                                                            key={
                                                                item && item.id
                                                            }
                                                            direction='column'
                                                            gap='md'
                                                            justify='center'
                                                            align='center'
                                                        >
                                                            <Text
                                                                size='xl'
                                                                fw={700}
                                                            >
                                                                {item &&
                                                                    item.name}
                                                            </Text>

                                                            <Text>
                                                                email:{' '}
                                                                {item &&
                                                                    item.email}
                                                            </Text>
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            </Box>
                                        </Flex>

                                        <Divider color='#A0AAC8' />

                                        {roleSidebar.map((x, index) => {
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

                                            return (
                                                <Link
                                                    className={`flex items-center justify-between h-[18px] text-[14px] font-bold ${isActive ? 'text-[var(--mantine-color-indigo-4)]' : 'text-[#2B2B2B]'} hover:text-[#474747] relative`}
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
                                                    {x.iconRight && (
                                                        <x.iconRight />
                                                    )}
                                                </Link>
                                            )
                                        })}
                                    </Flex>
                                </Paper>
                            </Grid.Col>
                        )}
                        <Grid.Col
                            span={{
                                base: 12,
                                xs: 12,
                                sm: isMobile ? 12 : 'auto',
                                md: isMobile ? 12 : 9,
                            }}
                        >
                            {children}
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>
            <Footer my='md' />
        </Box>
    )
}
