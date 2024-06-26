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
    profileType: ProfileType
    profile: CreateProviderProfileDto & {
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
    profileType: ProfileType
    profile: CreateHorecaProfileDto & {
        info?: string
        addresses: ({
            address: string
        } & AddressWithoutAddress)[]
    }
}
