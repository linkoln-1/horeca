import { Text, Button, Flex } from '@mantine/core'

export function PageLeaveModal() {
    return (
        <Flex direction='column' align='center'>
            <Text mb='lg' fw='500' w='80%' ta='center'>
                Вы уверены, что хотите покинуть страницу? Изменения не
                сохранятся
            </Text>
            <Flex w='90%' gap='md'>
                <Button flex={1} fw='400' size='md' radius='xl' bg='indigo'>
                    Сохранить изменения
                </Button>
                <Button flex={1} fw='400' size='md' radius='xl' bg='pink'>
                    Да, все равно выйти
                </Button>
            </Flex>
        </Flex>
    )
}
