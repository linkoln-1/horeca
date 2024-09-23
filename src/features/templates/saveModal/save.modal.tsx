import { TextInput, Button, Flex } from '@mantine/core'

export function SaveModal() {
    return (
        <form action=''>
            <TextInput
                label='Название шаблона'
                placeholder='Например, рыба (красная)'
            />
            <Flex w='100%' justify='center'>
                <Button my='lg' size='lg' variant='filled' bg='blue'>
                    Сохранить шаблон
                </Button>
            </Flex>
        </form>
    )
}
