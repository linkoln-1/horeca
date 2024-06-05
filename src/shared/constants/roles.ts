import { ProfileType } from '@/shared/lib/horekaApi/Api'

// export enum Roles {
//     SupplierManufacturer = 'Поставщик, производитель',
//     PublicCatering = 'Общепит',
// }

export const roles = [
    {
        label: 'Поставщик, производитель',
        role: ProfileType.Provider,
    },
    {
        label: 'Общепит',
        role: ProfileType.Horeca,
    },
]
