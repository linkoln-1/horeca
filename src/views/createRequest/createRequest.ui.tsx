import { Flex, Select, Text, Box, Paper, TextInput } from '@mantine/core'

export function CreateRequestView() {
    return (
        <Flex mt='md' gap='130px'>
            <Box>
                <Select
                    label='Шаблоны'
                    placeholder='Новый шаблон'
                    data={[
                        'Рыба (красная)',
                        'Палтус',
                        'Шоколад темный с орехами 85%',
                        'Креветка магаданская',
                    ]}
                />
            </Box>
            <Paper p='md' w='720px' shadow='md' withBorder>
                <Text fw='500'>Каталог</Text>
                <form action=''>
                    <Select
                        placeholder='Безалкогольные напитки, вода, соки'
                        data={[
                            'Безалкогольные напитки, вода, соки',
                            'Шоколад',
                            'Мясные продукты',
                            'Молочные продукты',
                        ]}
                        mb='md'
                    />
                    <Flex justify='space-between' gap='5px'>
                        <TextInput label='Название' />
                        <TextInput type='number' label='Кол-во' />
                        <TextInput label='Ед. изм.' />
                    </Flex>
                </form>
            </Paper>
        </Flex>
    )
}
