'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { userQueries } from '@/entities/user'
import {
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

interface FormValues extends UpdateUserDto {
    repeatPassword: string
}

export function EditViews() {
    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validate: {
            name: value =>
                value?.trim().length ? null : 'Поле обязательно для заполнения',
            phone: value =>
                value?.trim().length ? null : 'Поле обязательно для заполнения',
            email: value =>
                value?.trim().length ? null : 'Поле обязательно для заполнения',
            password: value =>
                value?.trim().length ? null : 'Поле обязательно для заполнения',
            repeatPassword: (value, values) => {
                if (!value?.trim().length) {
                    return 'Поле обязательно для заполнения'
                }
                return value === values.password ? null : 'Пароли не совпадают'
            },
        },
    })

    const { mutateAsync: updateUser, isPending } =
        userQueries.useUpdateUserMutation()
    const { data } = userQueries.useGetMeQuery()

    useEffect(() => {
        if (data) {
            form.setValues({
                name: data.name || '',
                phone: data.phone || '',
                email: data.email || '',
                password: '',
                repeatPassword: '',
            })
        }
    }, [data])

    const handleSubmit = async (values: FormValues) => {
        const validation = form.validate()
        if (validation.hasErrors) {
            toast.error(
                'Все поля должны быть заполнены и пароли должны совпадать'
            )
            return
        }

        try {
            const { repeatPassword, ...dto } = values
            await updateUser(dto)
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
            <Title order={2} mb='md'>
                Редактировать профиль
            </Title>
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
                    label='Фактическое наименование компании:'
                    placeholder='ООО “Рыба моя”'
                    {...form.getInputProps('name')}
                    withAsterisk
                />
                <TextInput
                    label='Контактный номер для связи с покупателем:'
                    placeholder='+7 (965) 999-99-99'
                    {...form.getInputProps('phone')}
                    withAsterisk
                />
                <TextInput
                    label='Электронная почта:'
                    placeholder='ivanov.ivan@ryba.com'
                    {...form.getInputProps('email')}
                    withAsterisk
                />
                <PasswordInput
                    label='Текущий пароль:'
                    className='w-full'
                    leftSection={<IconLock />}
                    {...form.getInputProps('password')}
                    withAsterisk
                />
                <PasswordInput
                    label='Повторите пароль:'
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
