import React from 'react'

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

    return (
        <form
            onSubmit={form.onSubmit(async values => {
                signInUser(values).then(form.reset)
            })}
            className='relative'
        >
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

                <div className='flex justify-center'>
                    <Button
                        variant='filled'
                        color='blue'
                        size='lg'
                        type='submit'
                        loading={isPending}
                    >
                        Войти
                    </Button>
                </div>
            </Flex>
        </form>
    )
}
