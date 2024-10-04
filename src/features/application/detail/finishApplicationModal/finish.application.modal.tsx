import { Text, Button, Flex } from '@mantine/core'

export function FinishApplicationModal() {
    return (
        <Flex direction='column' align='center'>
            <Text mb='lg' fw='500' w='80%' ta='center'>
                Вы уверены, что хотите завершить заявку? Вы больше не сможете
                принимать по ней отклики
            </Text>
            <Flex w='90%' gap='md'>
                <Button flex={1} fw='400' size='md' radius='xl' bg='indigo'>
                    Нет, отменить
                </Button>
                <Button flex={1} fw='400' size='md' radius='xl' bg='pink'>
                    Да, завершить
                </Button>
            </Flex>
        </Flex>
    )
}
