'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { userQueries } from '@/entities/user'
import {
    Box,
    Button,
    Flex,
    LoadingOverlay,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock } from '@tabler/icons-react'

import { errors } from '@/shared/constants'
import { UpdateUserDto } from '@/shared/lib/horekaApi/Api'
import { Page } from '@/shared/ui/Page'

export function EditViews() {
    const form = useForm<UpdateUserDto>({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            repeatPassword: '',
        },

        validate: {
            repeatPassword: (value, values) =>
                value === values.password ? null : 'Пароли не совпадают',
        },
    })

    const { mutateAsync: updateUser, isPending } =
        userQueries.useUpdateUserMutation()
    const { data } = userQueries.useGetMeQuery()

    useEffect(() => {
        if (data) {
            form.setValues({
                name: data.name,
                phone: data.phone,
                email: data.email,
            })
        }
    }, [data])

    const handleSubmit = async (values: UpdateUserDto) => {
        if (form.validate().hasErrors) {
            return
        }

        try {
            await updateUser(values)
            toast.success('Данные успешно обновлены!')
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    return (
        <Page>
            <LoadingOverlay
                zIndex={1000}
                overlayProps={{ blur: 2 }}
                visible={isPending}
            />

            <form
                className='flex flex-col gap-7'
                onSubmit={form.onSubmit(handleSubmit)}
            >
                <TextInput
                    type='text'
                    label='Фактическое наименование компании:'
                    placeholder='ООО “Рыба моя”'
                    {...form.getInputProps('name')}
                />
                <TextInput
                    type='text'
                    label='Контактный номер для связи с покупателем:'
                    placeholder='+7 (965) 999-99-99'
                    {...form.getInputProps('phone')}
                />
                <TextInput
                    type='text'
                    label='Электронная почта:'
                    placeholder='ivanov.ivan@ryba.com'
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    label='Текущий пароль:'
                    placeholder='XXX_xx123'
                    className='w-full'
                    leftSection={<IconLock />}
                    {...form.getInputProps('password')}
                />

                <PasswordInput
                    label='Повторите пароль:'
                    placeholder='XXX_xx123'
                    className='w-full'
                    leftSection={<IconLock />}
                    {...form.getInputProps('repeatPassword')}
                    withAsterisk
                />

                <Flex justify='center'>
                    <Button
                        type='submit'
                        color='indigo.4'
                        size='large'
                        loading={isPending}
                    >
                        Сохранить изменения
                    </Button>
                </Flex>
            </form>
        </Page>
    )
}
