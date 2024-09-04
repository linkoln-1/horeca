import { roles } from '@/shared/constants'
import { UserDto } from '@/shared/lib/horekaApi/Api'

export function role({ user }: { user: UserDto }): string {
    if (user && user.profile.profileType === roles[0].role) {
        return '/provider'
    } else {
        return '/horeca'
    }
}
