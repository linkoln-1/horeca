import {
    Address,
    Categories,
    CreateHorecaProfileDto,
    CreateProviderProfileDto,
    DeliveryMethods,
    ProfileType,
} from '../lib/horekaApi/Api'

// this FormValue for SignUp form for Provider Step 1 and Step 2
export type FormValues = {
    name: string
    tin: string
    GDPRApproved: boolean
    email: string
    phone: string
    password: string
    repeatPassword: string
    profile: CreateProviderProfileDto & {
        profileType: ProfileType
        minOrderAmount: number
        categories: Categories[]
        deliveryMethods: DeliveryMethods[]
    }
}

// this FormValue for SignUp form for Horeca Steps 1 and 2
type AddressWithoutAddress = Omit<Address, 'address'>

export type HorecaFormValues = {
    name: string
    tin: string
    GDPRApproved: boolean
    email: string
    phone: string
    password: string
    repeatPassword: string
    profile: CreateHorecaProfileDto & {
        profileType: ProfileType
        info?: string
        addresses: ({
            address: string
        } & AddressWithoutAddress)[]
    }
}

type Product = {
    name: string
    amount: number
    unit: string
}

type HorecaRequestFormItem = {
    category: Categories
    products: Product[]
}

type HorecaRequestItemCreateDto = {
    category: string
    name: string
    amount: number
    unit: string
}

export type HorecaTemplateDto = {
    items: HorecaRequestItemCreateDto[]
    address: string
    deliveryTime: string
    acceptUntill: string
    paymentType: string
    name: string
    phone: string
}
