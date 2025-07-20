import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    Image as MantineImage,
    Paper,
    PaperProps,
} from '@mantine/core'
import { IconBrandTelegram } from '@tabler/icons-react'
import Link from 'next/link'

import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

type FooterProps = PaperProps & {}

export function Footer(props: FooterProps) {
    const isMobile = useBreakpoint('sm')
    const RightSection = (
        <div className='rounded-full bg-blue-800 p-0.5'>
            <IconBrandTelegram size={19} color='#fff' />
        </div>
    )
    const { user } = useUserStore(state => state)
    return (
        <Paper w='100%' bg='var(--mantine-color-indigo-0)' {...props}>
            <Container my='md' fluid>
                <Flex justify='space-between' align='center'>
                    <MantineImage
                        src='/assets/icons/logo.svg'
                        alt='Horeka logo'
                    />

                    {!isMobile && (
                        <Flex className='flex-row' gap='md' align='center'>
                            <Flex gap='md'>
                                <a
                                    href='/Пользовательское соглашение Сфера HoReCa.pdf'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='cursor-pointer hover:underline'
                                >
                                    Пользовательское соглашение
                                </a>
                                <a
                                    href='/Политика конфиденциальности Сфера HoReCa.pdf'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='cursor-pointer hover:underline'
                                >
                                    Политика конфиденциальности
                                </a>
                            </Flex>
                        </Flex>
                    )}

                    <Flex className='flex-col gap-y-2' align={'flex-start'}>
                        <Button
                            component={Link}
                            href={''}
                            color='#385191'
                            variant='transparent'
                            className='flex items-start justify-start'
                        >
                            <div className='rounded-full bg-blue-800 p-0.5'>
                                <IconBrandTelegram size={19} color='#fff' />
                            </div>

                            <Link href={'https://t.me/sphere_horeca'}>
                                <Box className='text-[12px]'>Telegram</Box>
                            </Link>
                        </Button>

                        <Box className='text-[12px]  text-[#2F49A6]'>
                            <Link
                                href={`/user/${user?.role.toLowerCase()}/support`}
                            >
                                Свяжитесь с нами
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Paper>
    )
}
