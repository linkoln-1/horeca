import { Text, Button, Flex } from '@mantine/core'

export function DeleteCategoryModal() {
    return (
        <Flex direction='column' align='center'>
            <Text mb='lg' fw='500' w='80%' ta='center'>
                Вы уверены, что хотите удалить всю категорию товаров? Отменить
                это действие будет невозможно
            </Text>
            <Flex w='90%' gap='md'>
                <Button flex={1} fw='400' size='md' radius='xl' bg='indigo'>
                    Все равно удалить
                </Button>
                <Button flex={1} fw='400' size='md' radius='xl' bg='pink'>
                    Не удалять
                </Button>
            </Flex>
        </Flex>
    )
}
