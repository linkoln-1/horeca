import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
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

export function useProductsInfiniteQuery() {
    return useCustomQuery({
        queryKey: ['product'],
        queryFn: () => api.productsControllerFindAll(),
    })
}
