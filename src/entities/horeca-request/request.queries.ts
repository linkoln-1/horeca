import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    HorecaRequestCreateDto,
    HorecaRequestSearchDto,
} from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'

interface GetRequestQueryParams {
    offset?: number
    limit?: number
    search?: HorecaRequestSearchDto
    sort?: string
}

export function useGetRequestQuery(params: GetRequestQueryParams) {
    console.log(params)
    return useCustomInfiniteQuery({
        queryKey: ['horeca-request', params],
        queryFn: () => api.horecaRequestsControllerFindAll(params),
    })
}

export function useCreateRequestMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: HorecaRequestCreateDto) =>
            api.horecaRequestsControllerCreate(data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({
                queryKey: ['horeca-request, horeca'],
            })
        },
    })
}
