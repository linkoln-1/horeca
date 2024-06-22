import { userQueries } from '@/entities/user'
import { Button, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock } from '@tabler/icons-react'

import { Page } from '@/shared/ui/Page'

export function SettingsForm() {
    const form = useForm({
        initialValues: {
            companyName: '',
            mobilePhone: '',
            email: '',
            password: '',
        },
    })

    const { mutateAsync: updateUser } = userQueries.useUpdateUserMutation()
    return (
        <Page>
            <Title>Общая информация</Title>

            <form className='flex flex-col gap-7'>
                <TextInput
                    type='text'
                    label='Фактическое наименование компании:'
                    placeholder='ООО “Рыба моя”'
                    {...form.getInputProps('companyName')}
                />
                <TextInput
                    type='text'
                    label='Контактный номер для связи с покупателем:'
                    placeholder='+7 (965) 999-99-99'
                    {...form.getInputProps('mobilePhone')}
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

                <Button type='submit' color='blue' size='large'>
                    Сохранить изменения
                </Button>
            </form>
        </Page>
    )
}
