import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { FavouritesCreateDto } from '@/shared/lib/horekaApi/Api'

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
