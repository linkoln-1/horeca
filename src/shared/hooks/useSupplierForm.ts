// import { useEffect, useState } from 'react'
//
// import { useForm } from '@mantine/form'
//
// export type FormValues = {
//     companyName: string
//     companyTaxId: string
//     email: string
//     password: string
//     confirmPassword: string
//     tos: boolean
//     mobilePhone: string
//     categories: string[]
//     minOrderAmount: string
//     pickup: boolean
//     supplierDelivery: boolean
//     sameDayDelivery: boolean
// }
//
// type UseSupplierFormProps = {
//     initialValues?: FormValues
// }
//
// export function useSupplierForm({ initialValues }: UseSupplierFormProps) {
//     const [prevValues, setPrevValues] = useState('')
//
//
//     useEffect(() => {
//         if (initialValues) {
//             const jsonValues = JSON.stringify(initialValues)
//             if (jsonValues === prevValues) return
//
//             setPrevValues(jsonValues)
//             form.setValues(initialValues)
//         }
//     }, [initialValues, form])
//
//     return form
// }
