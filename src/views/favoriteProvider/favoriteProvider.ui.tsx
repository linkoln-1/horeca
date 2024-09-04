import { Box, Button, Divider, Flex, Paper, Text, Title } from '@mantine/core'

type Supplier = {
    name: string
    categories: string[]
}

const suppliers: Supplier[] = [
    {
        name: 'ООО МОРЕАНИ',
        categories: ['Рыба, морепродукты, бакалея'],
    },
    {
        name: 'ИП ИВАНОВ',
        categories: ['Молочные продукты, яйца'],
    },
    {
        name: 'ИП ПЕТРОВ',
        categories: ['Посуда и кухонные принадлежности'],
    },
    {
        name: 'ООО РОМАШКА',
        categories: [
            'Посуда и кухонные принадлежности',
            'Прикасса (чипсы, снеки, семечки)',
            'Продукты быстрого приготовления, лапша',
            'Рыба и морепродукты',
            'Свежие овощи, фрукты, зелень, грибы',
            'Уборка и чистящие средства',
            'Хлеб, хлебобулочные изделия',
            'Чай, кофе, какао, заменители',
        ],
    },
]

export function FavoriteProviderViews() {
    return (
        <Flex direction='column' gap='md' p='md'>
            <Title order={2}>Избранные поставщики</Title>

            <Paper bg='gray.0' radius='md' p='md'>
                {/* Header Section */}
                <Flex
                    justify='space-between'
                    mb='sm'
                    className='border-b pb-[8px]'
                >
                    <Text fw={500}>Мои поставщики</Text>
                    <Text fw={500}>Категория товаров</Text>
                </Flex>

                {/* Supplier List */}
                {suppliers.map((supplier, index) => (
                    <Flex
                        key={index}
                        justify='space-between'
                        align='flex-start'
                        mb='md'
                        className='pb-[8px]'
                        style={{
                            '&:last-child': { borderBottom: 'none' },
                        }}
                    >
                        {/* Supplier Name */}
                        <Box
                            style={{
                                flex: '0 0 20%',
                            }}
                        >
                            <Text fw={index === 0 ? 700 : 500}>
                                {supplier.name}
                            </Text>
                        </Box>

                        {/* Supplier Categories */}
                        <Box style={{ flex: '1 0 60%' }}>
                            {supplier.categories.map((category, idx) => (
                                <Text key={idx}>{category}</Text>
                            ))}
                        </Box>

                        {/* Chat Button */}
                        <Box style={{ flex: '0 0 15%', textAlign: 'right' }}>
                            <Button variant='subtle' color='green'>
                                открыть чат
                            </Button>
                        </Box>
                    </Flex>
                ))}
            </Paper>
        </Flex>
    )
}
