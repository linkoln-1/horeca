import { Categories } from '@/shared/lib/horekaApi/Api'

export type HorecaRequestFormCategoryItems = {
    name: string
    amount: number
    unit: string
}

export type HorecaRequestFormItem = {
    category: '' | Categories
    products: [] | HorecaRequestFormCategoryItems[]
}

export type HorecaRequestForm = {
    /** @minItems 1 */
    items: HorecaRequestFormItem[]
    /** @default [] */
    imageIds?: number[]
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    paymentType: 'Prepayment' | 'Deferment' | 'PaymentUponDelivery'
    name: string
    phone: string
    comment?: string
}
