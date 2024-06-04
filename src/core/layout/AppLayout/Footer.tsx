import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    Image as MantineImage,
    Paper,
} from '@mantine/core'
import { IconBrandTelegram } from '@tabler/icons-react'
import Link from 'next/link'

import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function Footer() {
    const isMobile = useBreakpoint('sm')
    const rightSection = (
        <div className='rounded-full bg-blue-800 p-0.5'>
            <IconBrandTelegram size={19} color='#fff' />
        </div>
    )
    return (
        <Paper
            w='100%'
            bg='gray.1'
            className={`mt-auto`}
            pos='relative'
            bottom={0}
            left={0}
        >
            <Container my='md'>
                <Flex justify='space-between' align='center'>
                    <MantineImage
                        src='/assets/icons/logo.svg'
                        alt='Horeka logo'
                    />

                    {!isMobile && (
                        <Flex gap='md' align='center'>
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
                            <Button
                                component={Link}
                                href={''}
                                color='blue.9'
                                size='compact-sm'
                                variant='transparent'
                            >
                                Выйти
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Container>

            <Divider
                my='xs'
                size='xs'
                color='cyan.1'
                orientation='horizontal'
            />
            <Container>
                <Flex
                    className={
                        isMobile ? 'flex-wrap gap-7' : ' justify-between'
                    }
                >
                    <Flex
                        gap='md'
                        className={isMobile ? 'flex-wrap gap-7' : ''}
                    >
                        <Button
                            component={Link}
                            href={''}
                            color='blue.9'
                            size='compact-sm'
                            variant='transparent'
                            className='underline'
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
                    <Flex direction='column' align='center' gap='md'>
                        <Button
                            component={Link}
                            href={''}
                            color='blue.9'
                            size='compact-sm'
                            variant='transparent'
                        >
                            + 7 (9**) ***-**-**
                        </Button>
                        <Button
                            component={Link}
                            href={''}
                            color='blue.9'
                            size='compact-sm'
                            variant='transparent'
                        >
                            sphere.horec@gmail.ru
                        </Button>
                        <Button
                            component={Link}
                            href={''}
                            color='blue.9'
                            size='compact-sm'
                            variant='transparent'
                            rightSection={rightSection}
                        >
                            Telegram
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </Paper>
    )
}
