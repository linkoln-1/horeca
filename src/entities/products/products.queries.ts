import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { ProductUpdateDto } from '@/shared/lib/horekaApi/Api'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useProductMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.productsControllerCreate,
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['product'] })
        },
    })
}

export function useGetProductsInfiniteQuery() {
    return useCustomQuery({
        queryKey: ['product'],
        queryFn: () => api.productsControllerFindAll(),
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
