import {
    Checkbox,
    Flex,
    MultiSelect,
    NumberInput,
    Text,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { Page } from '@/shared/ui/Page'

export function DeliveryForm() {
    const form = useForm({
        initialValues: {
            categories: [] as string[],
            minOrderAmount: '',
            pickup: false,
            supplierDelivery: false,
            sameDayDelivery: false,
        },
        validate: {
            categories: value =>
                value.length > 0 ? null : 'Выберите хотя бы одну категорию',
        },
    })
    return (
        <Page>
            <Title>Категория товара №1</Title>

            <form className='flex flex-col gap-7'>
                <MultiSelect
                    label='Категория товара'
                    placeholder='Выберите категорию'
                    data={[
                        { value: 'beverages', label: 'Напитки' },
                        { value: 'bakery', label: 'Пекарня' },
                    ]}
                    value={form.values.categories}
                    onChange={value => {
                        form.setFieldValue('categories', value)
                        form.validateField('categories')
                    }}
                />

                <NumberInput
                    label='Минимальная сумма заказа'
                    placeholder='Например, 3000 руб.'
                    {...form.getInputProps('minOrderAmount')}
                />

                <Flex direction='column' gap='md'>
                    <Text size='md' fw={600}>
                        Возможный способ доставки
                    </Text>
                    <Checkbox
                        label='Самовывоз'
                        {...form.getInputProps('pickup', { type: 'checkbox' })}
                    />
                    <Checkbox
                        label='Доставка транспортом поставщика'
                        {...form.getInputProps('supplierDelivery', {
                            type: 'checkbox',
                        })}
                    />
                    <Checkbox
                        label='Доставка в день заказа'
                        {...form.getInputProps('sameDayDelivery', {
                            type: 'checkbox',
                        })}
                    />
                </Flex>
            </form>
        </Page>
    )
}
