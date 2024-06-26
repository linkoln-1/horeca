import { productsQueries } from '@/entities/products'
import {
    Button,
    Group,
    NumberInput,
    Select,
    Textarea,
    TextInput,
    Text,
    Flex,
    Grid,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { CreateProductProviderDto } from '@/shared/lib/horekaApi/Api'
import { CustomDropzone } from '@/shared/ui/CustomDropzone'

export function ProductsModal() {
    const form = useForm<CreateProductProviderDto>({
        initialValues: {
            category: '',
            name: '',
            description: '',
            producer: '',
            cost: 0,
            count: 0,
            packagingType: '',
            imageIds: [],
        },
    })
    const { mutate: createProduct } = productsQueries.useProductMutation()
    return (
        <Flex direction='column' gap='lg'>
            <Text fw={700} size='xl' className='text-center'>
                Добавить Новый товар
            </Text>
            <form
                className='flex flex-col gap-8'
                onSubmit={async () => {
                    createProduct(form.values)
                }}
            >
                <Grid>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 6,
                        }}
                    >
                        <TextInput
                            label='Наименование'
                            placeholder='Введите наименование'
                            required
                            {...form.getInputProps('name')}
                        />
                    </Grid.Col>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 6,
                        }}
                    >
                        <TextInput
                            label='Производитель'
                            placeholder='Введите производителя'
                            required
                            {...form.getInputProps('producer')}
                        />
                    </Grid.Col>
                </Grid>
                <Textarea
                    label='Характеристики товара'
                    placeholder='Максимум 500 символов (с пробелами)'
                    required
                    minRows={4}
                    maxRows={4}
                    {...form.getInputProps('description')}
                />
                <Group grow>
                    <Select
                        label='Фасовка'
                        placeholder='Выберите фасовку'
                        data={['Option 1', 'Option 2', 'Option 3']}
                        {...form.getInputProps('packagingType')}
                    />
                    <NumberInput
                        label='Цена (за ед.)'
                        placeholder='Введите цену'
                        required
                        hideControls
                        {...form.getInputProps('cost')}
                    />
                    <NumberInput
                        label='Кол-во'
                        placeholder='Введите количество'
                        required
                        hideControls
                        {...form.getInputProps('count')}
                    />
                </Group>

                <CustomDropzone onDrop={() => {}} />

                <Group justify='center' mt='md'>
                    <Button variant='default'>Предпросмотр</Button>
                    <Button type='submit'>Опубликовать товар</Button>
                </Group>
            </form>
        </Flex>
    )
}
