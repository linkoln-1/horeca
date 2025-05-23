import React from 'react'
import { toast } from 'react-toastify'

import { userQueries } from '@/entities/user'
import {
    Button,
    Flex,
    LoadingOverlay,
    PasswordInput,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt } from '@tabler/icons-react'

export function SignIn() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: value => (value.length > 0 ? null : 'Email is required'),
            password: value =>
                value.length > 0 ? null : 'Password is required',
        },
    })

    const { mutateAsync: signInUser, isPending } =
        userQueries.useLoginUserMutation()

    const handleSubmit = async () => {
        try {
            await signInUser(form.values).then(form.reset)
            toast.success('Вы успешно авторизовались!')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className='relative'>
            <LoadingOverlay
                zIndex={1000}
                overlayProps={{ blur: 2 }}
                visible={isPending}
            />

            <Flex direction='column' gap='lg'>
                <TextInput
                    label='Электронная почта'
                    type='email'
                    placeholder='Введите адрес электронной почты'
                    leftSection={<IconAt size={16} />}
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    label='Пароль'
                    placeholder='Введите свой пароль'
                    {...form.getInputProps('password')}
                />

                <div className='flex justify-center m-auto w-[350px]'>
                    <Button
                        variant='filled'
                        color='indigo.4'
                        size='md'
                        type='submit'
                        fullWidth
                        loading={isPending}
                    >
                        Войти
                    </Button>
                </div>
            </Flex>
        </form>
    )
}
