import { Text, Button, Flex } from '@mantine/core'
import { modals } from '@mantine/modals'

type DeleteCategoryModal = {
    handleDeleteCategory: () => void
}

export function DeleteCategoryModal({
    handleDeleteCategory,
}: DeleteCategoryModal) {
    const handleClose = () => {
        modals.close('deleteCategory')
    }

    return (
        <Flex direction='column' align='center'>
            <Text mb='lg' fw='500' w='80%' ta='center'>
                Вы уверены, что хотите удалить всю категорию товаров? Отменить
                это действие будет невозможно
            </Text>
            <Flex w='90%' gap='md'>
                <Button
                    flex={1}
                    fw='400'
                    size='md'
                    radius='xl'
                    bg='indigo.4'
                    onClick={() => {
                        {
                            handleDeleteCategory()
                            handleClose()
                        }
                    }}
                >
                    Все равно удалить
                </Button>
                <Button
                    flex={1}
                    fw='400'
                    size='md'
                    radius='xl'
                    bg='pink'
                    onClick={handleClose}
                >
                    Не удалять
                </Button>
            </Flex>
        </Flex>
    )
}
