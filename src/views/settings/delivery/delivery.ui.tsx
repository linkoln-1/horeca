'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { userQueries } from '@/entities/user'
import {
    Button,
    Checkbox,
    Flex,
    LoadingOverlay,
    MultiSelect,
    NumberInput,
    Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { CategoryLabels, errors } from '@/shared/constants'
import { packageTypeLabel } from '@/shared/constants/packageType'
import {
    Categories,
    DeliveryMethods,
    ProductPackagingType,
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

const categoryOptions = Object.values(Categories)
    .filter(value => typeof value === 'string')
    .map(x => ({
        value: x.trim(),
        label: CategoryLabels[x as Categories]?.trim() || 'Не указано',
    }))

export function DeliveryViews() {
    const form = useForm<DeliveryFormType>({
        initialValues: {
            categories: [],
            minOrderAmount: 0,
            deliveryMethods: [] as DeliveryMethods[],
        },
        validate: {
            categories: value =>
                value.length > 0 ? null : 'категория не может быть пустой',
        },
    })

    const { data } = userQueries.useGetMeQuery()
    const { mutateAsync: updateUser, isPending } =
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

    const handleSubmit = async () => {
        if (form.validate().hasErrors) {
            return
        }

        try {
            if (data && (data.profile as ProviderProfileDto)) {
                const updateUserDto: UpdateUserDto = {
                    profile: {
                        ...form.values,
                        profileType: data.profile
                            .profileType as ProfileType.Provider,
                        categories: form.values.categories.map(
                            x => x.value as Categories
                        ),
                    },
                }

                await updateUser(updateUserDto)
                toast.success('Данные успешно обновлены!')
            }
        } catch (e: any) {
            const errorKey = e?.error?.error
            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    return (
        <Page>
            <LoadingOverlay
                zIndex={1000}
                overlayProps={{ blur: 2 }}
                visible={isPending}
            />

            <form
                className='flex flex-col gap-7'
                onSubmit={form.onSubmit(handleSubmit)}
            >
                <MultiSelect
                    label='Категория товара'
                    placeholder='Выберите категорию'
                    data={categoryOptions}
                    value={form.values.categories.map(c => c.value)}
                    onChange={value => {
                        const transformedValue = value.map(v => ({
                            value: v,
                            label: CategoryLabels[v as Categories],
                        }))
                        form.setFieldValue('categories', transformedValue)
                        form.validateField('categories')
                    }}
                    searchable
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
                    <Checkbox
                        label='Выходные/праздничные дни'
                        {...form.getInputProps('weekends', {
                            type: 'checkbox',
                        })}
                    />
                </Flex>

                <Button
                    type='submit'
                    color='indigo.4'
                    size='large'
                    loading={isPending}
                >
                    Сохранить изменения
                </Button>
            </form>
        </Page>
    )
}
