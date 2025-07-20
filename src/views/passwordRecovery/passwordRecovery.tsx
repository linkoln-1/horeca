import { useState, useEffect } from 'react'

import { useChangePasswordMutation } from '@/entities/user/user.queries'
import { Box, Text, PasswordInput, Button, Group, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

type PasswordRecoveryProps = {
    uuid: string
}

export function PasswordRecovery({ uuid }: PasswordRecoveryProps) {
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const changePasswordMutation = useChangePasswordMutation(uuid)

    const handleSubmit = () => {
        setError('')

        if (!password || !repeatPassword) {
            setError('Оба поля обязательны для заполнения')
            return
        }

        if (password !== repeatPassword) {
            setError('Пароли не совпадают')
            return
        }

        changePasswordMutation.mutate({ password, repeatPassword })
    }

    useEffect(() => {
        if (changePasswordMutation.isSuccess) {
            const timer = setTimeout(() => {
                router.push('/sign-in')
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [changePasswordMutation.isSuccess, router])

    return (
        <Box className='max-w-md mx-auto p-4'>
            <Text size='xl' fw={700} ta='center' mb='md'>
                Восстановление пароля
            </Text>

            {error && (
                <Alert
                    icon={<IconAlertCircle size='1rem' />}
                    title='Ошибка'
                    color='red'
                    mb='md'
                >
                    {error}
                </Alert>
            )}

            <PasswordInput
                label='Новый пароль'
                placeholder='Введите новый пароль'
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                required
                mt='md'
            />

            <PasswordInput
                label='Повторите пароль'
                placeholder='Повторите новый пароль'
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.currentTarget.value)}
                required
                mt='md'
            />

            <Group justify='flex-end' mt='md'>
                <Button
                    onClick={handleSubmit}
                    loading={changePasswordMutation.isPending}
                    fullWidth
                >
                    Сохранить пароль
                </Button>
            </Group>
        </Box>
    )
}
