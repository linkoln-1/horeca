'use client'

import { SignIn } from '@/widgets/user/signIn'
import { Box, Text } from '@mantine/core'
import Link from 'next/link'

export function SignInView() {
    return (
        <Box className='flex w-screen h-screen bg-white'>
            <Box className='w-2/5 hidden md:block'>
                <img
                    className='w-full h-full object-cover'
                    width='100%'
                    height='100%'
                    src={'/assets/images/bg-4.png'}
                    alt='Horeka'
                />
            </Box>
            <Box className='w-full flex flex-col justify-center'>
                <Box className='flex flex-col justify-center w-[90%] lg:w-2/5 h-full mx-auto gap-5'>
                    <Text ta='center' fw={700} size='xl'>
                        Войти в Horeca Sphere
                    </Text>

                    <SignIn />

                    <span className='block text-blue-600 text-center'>
                        У вас нет аккаунта?{' '}
                        <Link href='/sign-up' className='underline'>
                            Зарегистрироваться
                        </Link>
                    </span>
                </Box>
            </Box>
        </Box>
    )
}
