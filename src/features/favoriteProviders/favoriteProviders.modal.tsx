'use client'

import { toast } from 'react-toastify'

import { useDeleteFavoriteProviderMutation } from '@/entities/favorites/favorites.queries'
import { Text, Flex, Button, Paper, Modal } from '@mantine/core'

type Props = {
    providerId: number
    onClose: () => void
}

export function FavoriteProvidersModal({ providerId, onClose }: Props) {
    const deleteFavoriteMutation = useDeleteFavoriteProviderMutation()

    const handleConfirm = () => {
        deleteFavoriteMutation.mutate(
            { providerId },
            {
                onSuccess: () => {
                    toast.success('Поставщик удалён из избранного')
                    onClose()
                },
                onError: () => {
                    toast.error('Ошибка при удалении из избранного')
                    onClose()
                },
            }
        )
    }

    return (
        <Modal
            opened
            onClose={onClose}
            centered
            radius='lg'
            size='xl'
            withCloseButton={false}
        >
            <Paper p='md'>
                <Text fw='500' mb='20px' size='xl' ta='center'>
                    Вы уверены, что хотите удалить из избранного? Отменить это
                    действие будет невозможно
                </Text>
                <Flex justify='center' gap='md'>
                    <Button
                        size='md'
                        radius='xl'
                        w='40%'
                        bg='indigo'
                        onClick={onClose}
                    >
                        Нет
                    </Button>
                    <Button
                        size='md'
                        radius='xl'
                        w='40%'
                        bg='pink.7'
                        onClick={handleConfirm}
                    >
                        Да
                    </Button>
                </Flex>
            </Paper>
        </Modal>
    )
}
