'use client'

import { useState } from 'react'

import { SignUp } from '@/widgets/user/signUp'
import { Box, Title } from '@mantine/core'
import Link from 'next/link'

import { Page } from '@/shared/ui/Page'
import { RegistrationProgress } from '@/shared/ui/SignUpProgressBar'

export function SignUpViews() {
    const [currentStep, setCurrentStep] = useState(0)

    const nextStep = () => setCurrentStep(current => Math.min(current + 1, 2))
    return (
        <Page>
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
                    <Box className='w-[90%] lg:w-2/5 h-full mx-auto gap-5 container custom-scrollbar'>
                        <Title ta='center' fw={700}>
                            Регистрация
                        </Title>

                        <RegistrationProgress currentStep={currentStep} />

                        <SignUp nextStep={nextStep} currentStep={currentStep} />

                        <span className='block text-blue-600 text-center'>
                            У вас уже есть аккаунт?{' '}
                            <Link href='/sign-in' className='underline'>
                                Войти
                            </Link>
                        </span>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}
