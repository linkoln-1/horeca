import { Checkbox, Flex, MultiSelect, NumberInput, Text } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FormValues } from '@/shared/constants'
import { CategoryLabels } from '@/shared/constants'
import { DeliveryMethodsLabels } from '@/shared/constants'
import { Categories, DeliveryMethods } from '@/shared/lib/horekaApi/Api'

type StepTwoProps = {
    form: UseFormReturnType<FormValues>
}

const categoryOptions = Object.values(Categories).map(category => ({
    value: category,
    label: CategoryLabels[category as Categories],
}))

const deliveryMethodOptions = Object.values(DeliveryMethods).map(method => ({
    value: method,
    label: DeliveryMethodsLabels[method as DeliveryMethods],
}))

export function SignUpStepTwo({ form }: StepTwoProps) {
    const handleDeliveryMethodChange = (
        method: DeliveryMethods,
        checked: boolean
    ) => {
        const updatedMethods = checked
            ? [...form.values.profile.deliveryMethods, method]
            : form.values.profile.deliveryMethods.filter(
                  item => item !== method
              )
        form.setFieldValue('profile.deliveryMethods', updatedMethods)
    }

    return (
        <>
            <NumberInput
                label='Контактный номер для связи с покупателем'
                placeholder='Номер мобильного телефона'
                {...form.getInputProps('phone')}
            />

            <MultiSelect
                label='Категория товара'
                placeholder='Выберите категорию'
                data={categoryOptions}
                value={form.values.profile.categories.map(category =>
                    category.toString()
                )}
                onChange={(value: string[]) => {
                    form.setFieldValue(
                        'profile.categories',
                        value.map(val => val as Categories)
                    )
                }}
            />

            <NumberInput
                label='Минимальная сумма заказа'
                placeholder='Например, 3000 руб.'
                {...form.getInputProps('profile.minOrderAmount')}
            />

            <Flex direction='column' gap='md'>
                <Text size='md' fw={600}>
                    Возможный способ доставки
                </Text>
                {deliveryMethodOptions.map(option => (
                    <Checkbox
                        key={option.value}
                        label={option.label}
                        checked={form.values.profile.deliveryMethods.includes(
                            option.value as DeliveryMethods
                        )}
                        onChange={event =>
                            handleDeliveryMethodChange(
                                option.value as DeliveryMethods,
                                event.currentTarget.checked
                            )
                        }
                    />
                ))}
            </Flex>
        </>
    )
}
