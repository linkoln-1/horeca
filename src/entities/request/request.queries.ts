import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { HorecaRequestCreateDto } from '@/shared/lib/horekaApi/Api'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useGetRequestQuery() {
    return useCustomQuery({
        queryKey: ['request, horeca'],
        queryFn: () => api.horecaRequestsControllerFindAll(),
    })
}

export function useCreateRequestMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: HorecaRequestCreateDto) =>
            api.horecaRequestsControllerCreate(data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({
                queryKey: ['request, horeca'],
            })
        },
    })
}
