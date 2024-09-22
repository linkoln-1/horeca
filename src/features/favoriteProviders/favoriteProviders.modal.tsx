import { Text, Flex, Button, Paper } from '@mantine/core'

export function FavoriteProvidersModal() {
    return (
        <Paper p='md'>
            <Text fw='500' mb='20px' size='xl' ta='center'>
                Вы уверены, что хотите удалить из избранного? Отменить это
                действие будет невозможно
            </Text>
            <Flex justify='center' gap='md'>
                <Button size='md' radius='xl' w='40%' bg='indigo'>
                    Нет
                </Button>
                <Button size='md' radius='xl' w='40%' bg='pink.7'>
                    Да
                </Button>
            </Flex>
        </Paper>
    )
}
