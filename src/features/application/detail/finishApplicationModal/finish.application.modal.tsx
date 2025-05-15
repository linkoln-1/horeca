import { useDeleteRequestByIdMutation } from '@/entities/horeca-request/request.queries'
import { Text, Button, Flex } from '@mantine/core'

interface FinishApplicationModalProps {
    requestId: number
    onCancel: () => void
    onSuccess?: () => void
}

export function FinishApplicationModal({
    requestId,
    onCancel,
    onSuccess,
}: FinishApplicationModalProps) {
    const { mutate: deleteRequest, isPending } = useDeleteRequestByIdMutation()

    const handleFinishApplication = () => {
        deleteRequest(requestId, {
            onSuccess: () => {
                onSuccess?.()
            },
        })
    }

    return (
        <Flex direction='column' align='center'>
            <Text mb='lg' fw='500' w='80%' ta='center'>
                Вы уверены, что хотите завершить заявку? Вы больше не сможете
                принимать по ней отклики
            </Text>
            <Flex w='90%' gap='md'>
                <Button
                    flex={1}
                    fw='400'
                    size='md'
                    radius='xl'
                    bg='indigo'
                    onClick={onCancel}
                    disabled={isPending}
                >
                    Нет, отменить
                </Button>
                <Button
                    flex={1}
                    fw='400'
                    size='md'
                    radius='xl'
                    bg='pink'
                    onClick={handleFinishApplication}
                    loading={isPending}
                >
                    Да, завершить
                </Button>
            </Flex>
        </Flex>
    )
}
