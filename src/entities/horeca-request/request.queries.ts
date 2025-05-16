import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    HorecaRequestCreateDto,
    HorecaRequestSearchDto,
    HorecaRequestSetStatusDto,
} from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

interface GetRequestQueryParams {
    offset?: number
    limit?: number
    search?: HorecaRequestSearchDto
    sort?: string
}

export function useGetRequestQuery(params: GetRequestQueryParams) {
    return useCustomInfiniteQuery({
        queryKey: ['horeca-request', params.search?.status],
        queryFn: () => api.horecaRequestsControllerFindAll(params),
    })
}

export function useGetRequestByIdQuery(id: number) {
    return useCustomQuery({
        queryKey: ['horeca-request-id', id],
        queryFn: () => api.horecaRequestsControllerGet(id),
    })
}
export function useDeleteRequestByIdMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => api.horecaRequestsControllerCancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['horeca-request'],
            })
            queryClient.invalidateQueries({
                queryKey: ['horeca-request-id'],
            })
        },
    })
}

export function useCreateRequestMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: HorecaRequestCreateDto) =>
            api.horecaRequestsControllerCreate(data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({
                queryKey: ['horeca-request'],
            })
        },
    })
}

export function useApproveRequestMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: HorecaRequestSetStatusDto) =>
            api.horecaRequestsControllerApproveProviderRequest(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['horeca-request'],
            })
        },
    })
}
