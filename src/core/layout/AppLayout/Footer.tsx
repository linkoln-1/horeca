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
    const rightSection = (
        <div className='rounded-full bg-blue-800 p-0.5'>
            <IconBrandTelegram size={19} color='#fff' />
        </div>
    )
    return (
        <Paper w='100%' bg='gray.1' {...props}>
            <Container my='md'>
                <Flex justify='space-between' align='center'>
                    <MantineImage
                        src='/assets/icons/logo.svg'
                        alt='Horeka logo'
                    />

                    {!isMobile && (
                        <Flex className='flex-row' gap='md' align='center'>
                            <Flex className='flex-col' gap='md'>
                                <Button
                                    component={Link}
                                    href={''}
                                    color='blue.9'
                                    size='compact-sm'
                                    variant='transparent'
                                >
                                    О платформе
                                </Button>
                                <Button
                                    component={Link}
                                    href={'/help'}
                                    color='blue.9'
                                    size='compact-sm'
                                    variant='transparent'
                                >
                                    Помощь
                                </Button>
                            </Flex>

                            <Flex gap='md' className='flex-col'>
                                <Button
                                    component={Link}
                                    href={''}
                                    color='blue.9'
                                    size='compact-sm'
                                    variant='transparent'
                                >
                                    Пользовательское соглашение
                                </Button>
                                <Button
                                    component={Link}
                                    href={''}
                                    color='blue.9'
                                    size='compact-sm'
                                    variant='transparent'
                                >
                                    Политика конфиденциальности
                                </Button>
                            </Flex>
                        </Flex>
                    )}

                    <Flex className='flex-col gap-y-2' align={'flex-start'}>
                        <Box className='text-[12px] font-semibold text-[#2F49A6]'>
                            Свяжитесь с нами
                        </Box>
                        <Button
                            component={Link}
                            href={''}
                            color='blue.9'
                            variant='transparent'
                            className='flex items-start justify-start'
                        >
                            <MantineImage
                                src='/assets/icons/telegram.svg'
                                alt='Horeka profile'
                            />
                            <Box className='text-[12px]'>Telegram</Box>
                        </Button>
                        <Button
                            component={Link}
                            href={''}
                            color='blue.9'
                            size='compact-xs'
                            variant='transparent'
                        >
                            + 7 (9**) ***-**-**
                        </Button>
                        <Button
                            component={Link}
                            href={''}
                            color='blue.9'
                            size='compact-xs'
                            variant='transparent'
                        >
                            sphere.horec@gmail.ru
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </Paper>
    )
}
