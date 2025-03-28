import { UserDto } from '@/shared/lib/horekaApi/Api'

export function role({ user }: { user: UserDto }): string {
    return '/' + user?.role?.toLowerCase()
}
