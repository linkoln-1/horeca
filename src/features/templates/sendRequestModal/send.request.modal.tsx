import { Text, Button, Flex } from '@mantine/core'

export function SendRequestModal() {
    return (
        <Flex direction='column' align='center'>
            <Text mb='lg' fw='500' w='80%' ta='center'>
                Вы уверены, что хотите отправить новую заявку на биржу?
            </Text>
            <Flex w='90%' gap='md'>
                <Button flex={1} fw='400' size='md' radius='xl' bg='indigo'>
                    Нет, не отправлять
                </Button>
                <Button flex={1} fw='400' size='md' radius='xl' bg='pink'>
                    Да, отправить
                </Button>
            </Flex>
        </Flex>
    )
}
