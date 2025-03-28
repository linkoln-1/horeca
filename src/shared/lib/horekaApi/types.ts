import {
    ProductSearchDto,
    UsersSearchAdminDto,
} from '@/shared/lib/horekaApi/Api'

export type ProductPaginatedQuery = {
    offset?: number
    limit?: number
    search?: ProductSearchDto
    sort?: string
}

export type UsersPaginatedQuery = {
    offset?: number
    limit?: number
    search?: UsersSearchAdminDto
    sort?: string
}
