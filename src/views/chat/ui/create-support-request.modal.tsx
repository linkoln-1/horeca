import { FormEvent } from 'react'

import { useChatCreateMutation } from '@/entities/chats/chats.queries'
import { supportQueries } from '@/entities/support'
import { Button, Flex, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

import { errors } from '@/shared/constants'
import { SupportRequestCreateDto } from '@/shared/lib/horekaApi/Api'

type Props = {
    opponentId?: number
    horecaRequestId?: number
    type?: string
    onSuccess: () => void
    onError: (message: string) => void
}

export function CreateSupportRequestModal({
    opponentId,
    horecaRequestId,
    type,
    onSuccess,
    onError,
}: Props) {
    const form = useForm<SupportRequestCreateDto>({
        initialValues: {
            content: '',
        },
    })
    const chatCreateMutation = useChatCreateMutation()
    const { mutateAsync: createRequestSupport } =
        supportQueries.useSupportCreateRequestChatMutation()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const requestSupport = await createRequestSupport({
                data: {
                    content: form.values.content,
                },
            })
            type === 'product-application' && opponentId !== undefined
                ? chatCreateMutation.mutateAsync({
                      data: {
                          opponentId: opponentId,
                          horecaRequestId: horecaRequestId,
                          supportRequestId: requestSupport.data.id,
                          type: 'Support',
                      },
                  })
                : ''
            onSuccess()
        } catch (e: any) {
            const errorKey = e?.error?.error
            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            onError(errorMessage)
        }
    }

    return (
        <Flex direction='column' gap='md'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                <Textarea
                    label='Введите ваше обращение'
                    placeholder='Введите ваше сообщение'
                    {...form.getInputProps('content')}
                />
                <Button type='submit' bg='pink.5'>
                    Отправить запрос
                </Button>
            </form>
        </Flex>
    )
}
