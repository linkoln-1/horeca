import {
    Address,
    Categories,
    CreateHorecaProfileDto,
    CreateProviderProfileDto,
    DeliveryMethods,
    ProfileType,
} from '../lib/horekaApi/Api'

// step 1
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
