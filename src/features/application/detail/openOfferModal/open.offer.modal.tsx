import {
    Text,
    Button,
    Flex,
    Box,
    Divider,
    Table,
    Image as MantineImage,
} from '@mantine/core'

export function OpenOfferModal() {
    return (
        <Flex gap='lg' direction='column' align='center'>
            <Text w='100%' c='gray.6'>
                Дата и время отклика: 11.12.2024, 19.25
            </Text>
            <Flex w='100%' gap='xl'>
                <MantineImage
                    w='120px'
                    h='120px'
                    radius='lg'
                    src='/assets/images/bg-5.png'
                />
                <Flex direction='column' gap='md'>
                    <Text>Поставщик: ООО “«МЕТРО Кэш энд Керри»”</Text>
                    <Text>Рейтинг: 4.9 / 5.0</Text>
                    <Text>Совпадение по заявке: 67%</Text>
                </Flex>
            </Flex>

            <Divider w='100%' />

            <Flex w='100%' my='md' justify='space-between'>
                <Text size='lg' fw='600' tt='uppercase'>
                    Итоговая сумма по заявке:
                </Text>
                <Text size='lg' fw='600'>
                    80, 000 руб.
                </Text>
            </Flex>
            <Divider mb='lg' w='100%' />
            <Box w='100%'>
                <Text fw='600'>Категория товаров:</Text>
                <Box>
                    <Text mt='lg'>Безалкогольные напитки, вода, соки</Text>
                    <Text my='lg' c='pink.7'>
                        Нет в наличии
                    </Text>
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
                                <Table.Td className='border-b-red-800 border-b-2 bg-red-200'>
                                    1
                                </Table.Td>
                                <Table.Td className='border-b-red-800 border-b-2 bg-red-200'>
                                    Вода эвиа
                                </Table.Td>
                                <Table.Td className='border-b-red-800 border-b-2 bg-red-200'>
                                    30 литров
                                </Table.Td>
                                <Table.Td className='border-b-red-800 border-b-2 bg-red-200'>
                                    Отсрочки нет
                                </Table.Td>
                                <Table.Td className='border-b-red-800 border-b-2 bg-red-200'>
                                    Самовывоз
                                </Table.Td>
                                <Table.Td className='border-b-red-800 border-b-2 bg-red-200'>
                                    Нет фотографий
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Text my='lg' c='green.7'>
                        Есть в наличии
                    </Text>
                    <Table
                        borderColor='white'
                        verticalSpacing='xl'
                        horizontalSpacing='lg'
                        withColumnBorders
                        h='120px'
                    >
                        <Table.Tbody className='text-base'>
                            <Table.Tr>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    1
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    Вода эвиа
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    30 литров
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    Отсрочки нет
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    Самовывоз
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    <Flex wrap='wrap' gap='5px'>
                                        <MantineImage
                                            src='/assets/images/bg-5.png'
                                            w='50px'
                                            h='50px'
                                            radius='lg'
                                            fit='cover'
                                        />
                                        <MantineImage
                                            src='/assets/images/bg-5.png'
                                            w='50px'
                                            h='50px'
                                            radius='lg'
                                            fit='cover'
                                        />
                                        <MantineImage
                                            src='/assets/images/bg-5.png'
                                            w='50px'
                                            h='50px'
                                            radius='lg'
                                            fit='cover'
                                        />
                                    </Flex>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Box>
                <Box>
                    <Text my='lg'>Шоколад</Text>
                    <Text my='lg' c='green.7'>
                        Есть в наличии
                    </Text>
                    <Table
                        borderColor='white'
                        verticalSpacing='xl'
                        horizontalSpacing='lg'
                        withColumnBorders
                        h='120px'
                    >
                        <Table.Tbody className='text-base'>
                            <Table.Tr>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    1
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    Вода эвиа
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    30 литров
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    Отсрочки нет
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    Самовывоз
                                </Table.Td>
                                <Table.Td className='border-b-green-800 border-b-2 bg-green-200'>
                                    Нет фотографий
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Box>
            </Box>
            <Text w='100%' fw='600' size='lg'>
                Комментарий поставщика:
            </Text>
            <Box className='border-2 border-gray rounded-xl' w='100%' p='md'>
                <Text>
                    Есть Горький шоколад содержанием какаобобов более 80%
                </Text>
            </Box>
            <Flex mt='lg' w='100%' justify='space-between' gap='sm'>
                <Button flex={1} bg='indigo' radius='lg'>
                    Вернуться в списку предложений
                </Button>
                <Button flex={1} bg='pink.7' radius='lg'>
                    Согласовать и перейти в чат с поставщиком
                </Button>
            </Flex>
        </Flex>
    )
}
