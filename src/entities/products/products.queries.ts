import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    HorecaRequestSearchDto,
    ProductSearchDto,
    ProductUpdateDto,
} from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

interface GetRequestQueryParams {
    offset?: number
    limit?: number
    search?: ProductSearchDto
    sort?: string
}

export function useProductMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.productsControllerCreate,
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['product'] })
        },
    })
}

export function useGetProductsInfiniteQuery(params: GetRequestQueryParams) {
    return useCustomInfiniteQuery({
        queryKey: ['product', params],
        queryFn: () => api.productsControllerFindAll(params),
    })
}

export function useGetProductByIdQuery(id: number) {
    return useCustomQuery({
        queryKey: ['product', id],
        queryFn: () => api.productsControllerGet(id),
    })
}

export function useUpdateProductMutation(id: number) {
    return useMutation({
        mutationFn: ({ data }: { data: ProductUpdateDto }) =>
            api.productsControllerUpdate(id, data),
    })
}

export function useDeleteProductMutation(id: number) {
    return useMutation({
        mutationFn: () => api.productsControllerDelete(id),
    })
}
