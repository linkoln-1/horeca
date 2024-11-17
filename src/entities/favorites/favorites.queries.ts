import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { FavouritesCreateDto } from '@/shared/lib/horekaApi/Api'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useGetFavoriteProviderQuery() {
    return useCustomQuery({
        queryKey: ['favourites'],
        queryFn: () => api.favouritesControllerFindAll(),
    })
}

export function useFavoriteProviderMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ data }: { data: FavouritesCreateDto }) =>
            api.favouritesControllerCreate(data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: ['favourites'] })
        },
    })
}

export function useDeleteFavoriteProviderMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ providerId }: { providerId: number }) =>
            api.favouritesControllerDelete(providerId),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: ['favourites'] })
        },
    })
}
