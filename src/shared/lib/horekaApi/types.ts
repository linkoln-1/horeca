import { ProductSearchDto } from '@/shared/lib/horekaApi/Api'

export type ProductPaginatedQuery = {
    offset?: number
    limit?: number
    search?: ProductSearchDto
    sort?: string
}
