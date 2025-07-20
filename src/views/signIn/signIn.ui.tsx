'use client'

import { useState, useEffect } from 'react'

import { usePasswordRecoveryMutation } from '@/entities/user/user.queries'
import { SignIn } from '@/widgets/user/signIn'
import { Box, Text, Modal, TextInput, Button, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'

export function SignInView() {
    const [opened, { open, close }] = useDisclosure(false)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const recoveryMutation = usePasswordRecoveryMutation()

    const handleResetPassword = () => {
        recoveryMutation.mutate(email)
    }

    useEffect(() => {
        if (recoveryMutation.isSuccess) {
            close()
        }
    }, [recoveryMutation.isSuccess, close])
    return (
        <Box className='flex w-screen h-screen bg-white'>
            <Modal
                opened={opened}
                onClose={close}
                title='Восстановление пароля'
                centered
            >
                <TextInput
                    label='Ваш email'
                    placeholder='Введите email'
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    required
                    autoFocus
                    type='email'
                    data-autofocus
                />
                <Group justify='flex-end' mt='md'>
                    <Button variant='outline' onClick={close}>
                        Отменить
                    </Button>
                    <Button
                        onClick={handleResetPassword}
                        loading={isLoading}
                        disabled={!email.includes('@')}
                    >
                        Отправить
                    </Button>
                </Group>
            </Modal>

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
                        Сфера HoReCa
                    </Text>

                    <SignIn />

                    <div>
                        <span className='block text-blue-600 text-center'>
                            У вас нет аккаунта?{' '}
                            <Link href='/sign-up' className='underline'>
                                Зарегистрироваться
                            </Link>
                        </span>
                        <Text ta='center' className='text-blue-600'>
                            Забыли пароль?{' '}
                            <Text
                                component='span'
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={open}
                                className='underline text-blue-600'
                            >
                                Восстановить
                            </Text>
                        </Text>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}
