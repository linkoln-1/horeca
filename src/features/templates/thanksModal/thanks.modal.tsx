import { Image as MantineImage, Flex, Title } from '@mantine/core'

export function ThanksModal() {
    return (
        <Flex direction='column' justify='center' align='center'>
            <Title order={3}>Ваша заявка создана</Title>
            <Flex py='lg' justify='center'>
                <MantineImage
                    w='140px'
                    h='140px'
                    radius='md'
                    src='/assets/icons/success_bid.svg'
                />
            </Flex>
        </Flex>
    )
}
