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
    return (
        <Paper w='100%' bg='var(--mantine-color-indigo-0)' {...props}>
            <Container my='md'>
                <Flex justify='space-between' align='center'>
                    <MantineImage
                        src='/assets/icons/logo.svg'
                        alt='Horeka logo'
                    />

                    {!isMobile && (
                        <Flex className='flex-row' gap='md' align='center'>
                            {/*<Flex className='flex-col' gap='md'>*/}
                            {/*    <Button*/}
                            {/*        component={Link}*/}
                            {/*        href={''}*/}
                            {/*        color='#385191'*/}
                            {/*        size='compact-sm'*/}
                            {/*        variant='transparent'*/}
                            {/*    >*/}
                            {/*        О платформе*/}
                            {/*    </Button>*/}
                            {/*    <Button*/}
                            {/*        component={Link}*/}
                            {/*        href={'/help'}*/}
                            {/*        color='#385191'*/}
                            {/*        size='compact-sm'*/}
                            {/*        variant='transparent'*/}
                            {/*    >*/}
                            {/*        Помощь*/}
                            {/*    </Button>*/}
                            {/*</Flex>*/}

                            <Flex gap='md'>
                                <Button
                                    component={Link}
                                    href={''}
                                    color='#385191'
                                    size='compact-sm'
                                    variant='transparent'
                                    fw={400}
                                >
                                    Пользовательское соглашение
                                </Button>
                                <Button
                                    component={Link}
                                    href={''}
                                    color='#385191'
                                    size='compact-sm'
                                    variant='transparent'
                                    fw={400}
                                >
                                    Политика конфиденциальности
                                </Button>
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
                            <Box className='text-[12px]'>Telegram</Box>
                        </Button>

                        <Box className='text-[12px]  text-[#2F49A6]'>
                            Свяжитесь с нами
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Paper>
    )
}
