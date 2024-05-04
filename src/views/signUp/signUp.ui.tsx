'use client'

import {
    Box,
    Container,
    Flex,
    Image as MantineImage,
    Text,
} from '@mantine/core'
import Link from 'next/link'

export function SignUp() {
    return (
        <Box className='bg-[url("/assets/images/sign-up-bg.png")] bg-no-repeat bg-cover h-screen'>
            <Box
                className='w-full p-3 backdrop:blur-lg backdrop-filter'
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
            >
                <Container>
                    <Flex align='center' justify='space-between'>
                        <Box>
                            <MantineImage src='/assets/icons/logo.svg' />
                        </Box>
                        <Box>
                            <Flex gap='md'>
                                <Link href=''>
                                    <Text size='md'>О платформе</Text>
                                </Link>
                                <Link href=''>
                                    <Text size='md'>Помощь</Text>
                                </Link>
                                <Link href=''>
                                    <Text size='md'>Выйти</Text>
                                </Link>
                            </Flex>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </Box>
    )
}
