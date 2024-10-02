import { Text, Flex, Box, Divider, Table } from '@mantine/core'

export function OpenApplicationModal() {
    return (
        <Flex gap='lg' direction='column' align='center'>
            <Flex w='100%' gap='md' justify='space-between'>
                <Text fw='600' w='35%'>
                    Информация по заказчику:
                </Text>
                <Flex direction='column' gap='sm' flex={1}>
                    <Text>Наименование заказчика: ООО &#34;Ромашка&#34;</Text>
                    <Text>Менеджер: Макаров Василий Сергеевич</Text>
                    <Text>Телефон для связи: + 7 (866) 765 -55-90</Text>
                    <Text>Принимать заявки до: 14.12.2024</Text>
                </Flex>
            </Flex>
            <Divider w='100%' />
            <Flex w='100%' gap='md' justify='space-between'>
                <Text fw='600' w='35%'>
                    Информация для поставщиков:
                </Text>
                <Flex direction='column' gap='sm' flex={1}>
                    <Text>Адрес доставки: г. Сочи, ул. Горького, д. 51</Text>
                    <Text>Привезите товар не позднее: 15.06.2024, 22.30</Text>
                    <Text>Способ оплаты: Предоплата</Text>
                </Flex>
            </Flex>
            <Divider mb='lg' w='100%' />
            <Box w='100%'>
                <Text fw='600'>Категория товаров:</Text>
                <Box>
                    <Text my='lg'>Безалкогольные напитки, вода, соки</Text>
                    <Table
                        borderColor='white'
                        verticalSpacing='xl'
                        horizontalSpacing='lg'
                        withColumnBorders
                        h='120px'
                        mb='sm'
                    >
                        <Table.Tbody className='text-base'>
                            <Table.Tr>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    1
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Вода эвиа
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    30 литров
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Отсрочки нет
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Самовывоз
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Нет фотографий
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Table
                        borderColor='white'
                        verticalSpacing='xl'
                        horizontalSpacing='lg'
                        withColumnBorders
                        h='120px'
                    >
                        <Table.Tbody className='text-base'>
                            <Table.Tr>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    1
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Вода эвиа
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    30 литров
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Отсрочки нет
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Самовывоз
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Нет фотографий
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Box>
                <Box>
                    <Text my='lg'>Шоколад</Text>
                    <Table
                        borderColor='white'
                        verticalSpacing='xl'
                        horizontalSpacing='lg'
                        withColumnBorders
                        h='120px'
                    >
                        <Table.Tbody className='text-base'>
                            <Table.Tr>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    1
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Вода эвиа
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    30 литров
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Отсрочки нет
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Самовывоз
                                </Table.Td>
                                <Table.Td className='border-b-blue-800 border-b-2 bg-blue-50'>
                                    Нет фотографий
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Box>
            </Box>
            <Text w='100%' fw='600' size='lg'>
                Комментарий к заказу:
            </Text>
            <Box className='border-2 border-gray rounded-xl' w='100%' p='md'>
                <Text>
                    По категории Горький шоколад допустимо предлагать продукт с
                    содержанием какаобобов не менее 70%
                </Text>
            </Box>
        </Flex>
    )
}
