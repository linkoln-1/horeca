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
import {
    Categories,
    DeliveryMethods,
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
    selfPickup: boolean
    deliveryBySupplier: boolean
    sameDayDelivery: boolean
    weekends: boolean
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
            selfPickup: false,
            deliveryBySupplier: false,
            sameDayDelivery: false,
            weekends: false,
        },
        validate: {
            categories: value =>
                value.length > 0 ? null : 'Выберите хотя бы одну категорию',
            minOrderAmount: value => {
                
                if (
                    value === null ||
                    value === undefined ||
                    isNaN(value) ||
                    // @ts-ignore
                    value === ''
                ) {
                    return 'Укажите минимальную сумму заказа'
                }
                if (Number(value) < 0) {
                    return 'Сумма не может быть отрицательной'
                }
                return null
            },
            selfPickup: (value, values) =>
                !value &&
                !values.deliveryBySupplier &&
                !values.sameDayDelivery &&
                !values.weekends
                    ? 'Выберите способ доставки'
                    : null,
        },
        validateInputOnBlur: true,
    })

    const { data } = userQueries.useGetMeQuery()
    const { mutateAsync: updateUser, isPending } =
        userQueries.useUpdateUserMutation()

    useEffect(() => {
        if (data) {
            const profile = data.profile as ProviderProfileDto
            form.setValues({
                categories: transformCategories(
                    profile.categories,
                    CategoryLabels
                ),
                minOrderAmount: profile.minOrderAmount,
                selfPickup: profile.deliveryMethods.includes(
                    DeliveryMethods.SelfPickup
                ),
                deliveryBySupplier: profile.deliveryMethods.includes(
                    DeliveryMethods.DeliveryBySupplier
                ),
                sameDayDelivery: profile.deliveryMethods.includes(
                    DeliveryMethods.SameDayDelivery
                ),
                weekends: profile.deliveryMethods.includes(
                    DeliveryMethods.Weekends
                ),
            })
        }
    }, [data])

    const handleSubmit = async (values: DeliveryFormType) => {
        try {
            const deliveryMethods: DeliveryMethods[] = []
            if (values.selfPickup)
                deliveryMethods.push(DeliveryMethods.SelfPickup)
            if (values.deliveryBySupplier)
                deliveryMethods.push(DeliveryMethods.DeliveryBySupplier)
            if (values.sameDayDelivery)
                deliveryMethods.push(DeliveryMethods.SameDayDelivery)
            if (values.weekends) deliveryMethods.push(DeliveryMethods.Weekends)

            const updateUserDto: UpdateUserDto = {
                profile: {
                    ...values,
                    profileType: data?.profile
                        .profileType as ProfileType.Provider,
                    categories: values.categories.map(
                        x => x.value as Categories
                    ),
                    deliveryMethods,
                },
            }

            await updateUser(updateUserDto)
            toast.success('Данные успешно обновлены!')
        } catch (e: any) {
            const errorKey = e?.error?.error
            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    const hasDeliveryError = !!form.errors.selfPickup

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
                    }}
                    error={form.errors.categories}
                    searchable
                    required
                />

                <NumberInput
                    label='Минимальная сумма заказа'
                    {...form.getInputProps('minOrderAmount')}
                    error={form.errors.minOrderAmount}
                    allowNegative={false}
                    required
                />

                <Flex direction='column' gap='md'>
                    <Text size='md' fw={600}>
                        Возможный способ доставки
                    </Text>
                    {hasDeliveryError && (
                        <Text size='sm' color='red' mt={-10} mb={5}>
                            {form.errors.selfPickup}
                        </Text>
                    )}
                    <Checkbox
                        label='Самовывоз'
                        {...form.getInputProps('selfPickup', {
                            type: 'checkbox',
                        })}
                        error={hasDeliveryError}
                    />
                    <Checkbox
                        label='Доставка транспортом поставщика'
                        {...form.getInputProps('deliveryBySupplier', {
                            type: 'checkbox',
                        })}
                        error={hasDeliveryError}
                    />
                    <Checkbox
                        label='Доставка в день заказа'
                        {...form.getInputProps('sameDayDelivery', {
                            type: 'checkbox',
                        })}
                        error={hasDeliveryError}
                    />
                    <Checkbox
                        label='Выходные/праздничные дни'
                        {...form.getInputProps('weekends', {
                            type: 'checkbox',
                        })}
                        error={hasDeliveryError}
                    />
                </Flex>

                <Flex justify='center'>
                    <Button
                        type='submit'
                        color='indigo.4'
                        size='large'
                        loading={isPending}
                    >
                        Сохранить изменения
                    </Button>
                </Flex>
            </form>
        </Page>
    )
}
