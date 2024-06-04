import {
    Checkbox,
    Flex,
    MultiSelect,
    NumberInput,
    Text,
    TextInput,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FormValues } from '@/shared/hooks/useSupplierForm'

type StepTwoProps = {
    form: UseFormReturnType<FormValues>
}

export function StepTwo({ form }: StepTwoProps) {
    return (
        <>
            <TextInput
                type='tel'
                label='Контактный номер для связи с покупателем'
                placeholder='Номер мобильного телефона'
                {...form.getInputProps('mobilePhone')}
            />
            <MultiSelect
                label='Категория товара'
                placeholder='Выберите категорию'
                data={[
                    { value: 'beverages', label: 'Напитки' },
                    { value: 'bakery', label: 'Пекарня' },
                    // More categories as needed
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
        </>
    )
}
