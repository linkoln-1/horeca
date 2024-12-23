import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { ProductCreateDto, ProductUpdateDto } from '@/shared/lib/horekaApi/Api'
import { ProductPaginatedQuery } from '@/shared/lib/horekaApi/types'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useProductMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ data }: { data: ProductCreateDto }) => {
            return api.productsControllerCreate(data)
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['product'] })
        },
    })
}

export function useGetProductsInfiniteQuery(query: ProductPaginatedQuery) {
    return useCustomInfiniteQuery({
        queryKey: ['product'],
        queryFn: ({ pageParam }) =>
            api.productsControllerFindAll({
                ...query,
                offset: pageParam,
            }),
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
