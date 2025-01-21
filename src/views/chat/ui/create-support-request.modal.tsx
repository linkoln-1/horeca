import { FormEvent } from 'react'
import { toast } from 'react-toastify'

import { supportQueries } from '@/entities/support'
import { Button, Flex, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'

import { errors } from '@/shared/constants'
import { SupportRequestCreateDto } from '@/shared/lib/horekaApi/Api'

export function CreateSupportRequestModal() {
    const form = useForm<SupportRequestCreateDto>({
        initialValues: {
            content: '',
        },
    })

    const { mutateAsync: createRequestSupport } =
        supportQueries.useSupportCreateRequestChatMutation()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await createRequestSupport({
                data: {
                    content: form.values.content,
                },
            })

            toast.success('Запрос на чат с поддержкой успешно создан!')

            modals.close('support-request')
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
        <Flex direction='column' gap='md'>
            <form
                onSubmit={e => handleSubmit(e)}
                className='flex flex-col gap-7'
            >
                <Textarea
                    label='Введите ваше обращение'
                    placeholder='Введите ваще сообщение'
                    {...form.getInputProps('content')}
                />

                <Button type='submit' bg='pink.5'>
                    Отправить запрос
                </Button>
            </form>
        </Flex>
    )
}
