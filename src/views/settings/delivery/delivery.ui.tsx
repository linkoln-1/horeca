'use client'

import { useEffect } from 'react'

import { userQueries } from '@/entities/user'
import {
    Button,
    Checkbox,
    Flex,
    MultiSelect,
    NumberInput,
    Text,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { CategoryLabels } from '@/shared/constants'
import {
    Categories,
    ProfileType,
    ProviderProfileDto,
    UpdateUserDto,
} from '@/shared/lib/horekaApi/Api'
import { Page } from '@/shared/ui/Page'

type DeliveryFormType = Omit<
    ProviderProfileDto,
    | 'profileType'
    | 'categories'
    | 'id'
    | 'info'
    | 'addresses'
    | 'userId'
    | 'createdAt'
    | 'updatedAt'
> & {
    categories: { value: string; label: string }[]
}

function transformCategories(
    categories: string[],
    categoryLabels: Record<string, string>
) {
    return categories.map(x => ({
        value: x,
        label: categoryLabels[x as Categories],
    }))
}

export function DeliveryViews() {
    const form = useForm<DeliveryFormType>({
        initialValues: {
            categories: [],
            minOrderAmount: 0,
            deliveryMethods: [],
        },
        validate: {
            categories: value =>
                value.length > 0 ? null : 'категория не может быть пустой',
        },
    })

    const { data } = userQueries.useGetMeQuery()
    const { mutate: updateUser, isPending } =
        userQueries.useUpdateUserMutation()

    useEffect(() => {
        if (data) {
            form.setValues({
                categories: transformCategories(
                    (data.profile as ProviderProfileDto).categories,
                    CategoryLabels
                ),
                minOrderAmount: (data.profile as ProviderProfileDto)
                    .minOrderAmount,
                deliveryMethods: (data.profile as ProviderProfileDto)
                    .deliveryMethods,
            })
        }
    }, [data])

    return (
        <Page>
            <Title>Категория товара №1</Title>

            <form
                className='flex flex-col gap-7'
                onSubmit={form.onSubmit(async values => {
                    if (form.validate().hasErrors) {
                        return
                    }
                    if (data && (data.profile as ProviderProfileDto)) {
                        const updateUserDto: UpdateUserDto = {
                            profile: {
                                ...values,
                                profileType: data.profile
                                    .profileType as ProfileType.Provider,
                                categories: values.categories.map(
                                    x => x.value as Categories
                                ),
                            },
                        }
                        updateUser(updateUserDto)
                    }
                })}
            >
                <MultiSelect
                    label='Категория товара'
                    placeholder='Выберите категорию'
                    data={form.values.categories}
                    value={form.values.categories.map(c => c.value)}
                    onChange={value => {
                        const transformedValue = value.map(v => ({
                            value: v,
                            label: CategoryLabels[v as Categories],
                        }))
                        form.setFieldValue('categories', transformedValue)
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

                <Button
                    type='submit'
                    color='blue'
                    size='large'
                    loading={isPending}
                >
                    Сохранить изменения
                </Button>
            </form>
        </Page>
    )
}
