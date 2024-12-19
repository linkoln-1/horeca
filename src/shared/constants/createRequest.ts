import { Categories } from '@/shared/lib/horekaApi/Api'

export type HorecaRequestFormCategoryItems = {
    name: string
    amount: number | string
    unit: string
}

export type HorecaRequestFormItem = {
    category: Categories
    products: [] | HorecaRequestFormCategoryItems[]
}

export type HorecaRequestForm = {
    items: HorecaRequestFormItem[]
    imageIds?: number[]
    address: string
    deliveryTime: Date
    acceptUntill: Date
    paymentType: 'Prepayment' | 'Deferment' | 'PaymentUponDelivery'
    name: string
    phone: string
    comment?: string
}
