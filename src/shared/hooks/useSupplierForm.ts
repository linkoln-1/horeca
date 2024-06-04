import { useEffect, useState } from 'react'

import { useForm } from '@mantine/form'

export type FormValues = {
    companyName: string
    companyTaxId: string
    email: string
    password: string
    confirmPassword: string
    tos: boolean
    mobilePhone: string
    categories: string[]
    minOrderAmount: string
    pickup: boolean
    supplierDelivery: boolean
    sameDayDelivery: boolean
}

type UseSupplierFormProps = {
    initialValues?: FormValues
}

export function useSupplierForm({ initialValues }: UseSupplierFormProps) {
    const [prevValues, setPrevValues] = useState('')
    const form = useForm<FormValues>({
        initialValues: initialValues || {
            companyName: '',
            companyTaxId: '',
            email: '',
            password: '',
            confirmPassword: '',
            tos: false,
            mobilePhone: '',
            categories: [],
            minOrderAmount: '',
            pickup: false,
            supplierDelivery: false,
            sameDayDelivery: false,
        },
        validate: {
            companyName: value =>
                value ? null : 'Название компании обязательно',
            companyTaxId: value => (value ? null : 'ИНН компании обязателен'),
            email: value => (value ? null : 'Email обязателен'),
            password: value => (value ? null : 'Пароль обязателен'),
            confirmPassword: (value, values) =>
                value === values.password ? null : 'Пароли не совпадают',
            mobilePhone: value =>
                value ? null : 'Мобильный телефон обязателен',
            categories: value =>
                value.length > 0 ? null : 'Выберите категорию товара',
            minOrderAmount: value =>
                value ? null : 'Минимальная сумма заказа обязательна',
        },
    })

    useEffect(() => {
        if (initialValues) {
            const jsonValues = JSON.stringify(initialValues)
            if (jsonValues === prevValues) return

            setPrevValues(jsonValues)
            form.setValues(initialValues)
        }
    }, [initialValues, form])

    return form
}
