import { Text, Image as MantineImage, Flex } from '@mantine/core'

export function ThanksModal() {
    return (
        <>
            <Text size='lg'>Ваша заявка создана</Text>
            <Flex py='lg' justify='center'>
                <MantineImage
                    w='140px'
                    h='140px'
                    radius='md'
                    src='/assets/images/bg-4.png'
                />
            </Flex>
        </>
    )
}
