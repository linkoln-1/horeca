import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { HorecaRequestCreateDto } from '@/shared/lib/horekaApi/Api'

export function useCreateRequestMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: HorecaRequestCreateDto) =>
            api.horecaRequestsControllerCreate(data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
        },
    })
}
