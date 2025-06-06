import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    HorecaRequestProviderStatusDto,
    ProviderHorecaRequestSearchDto,
    ProviderRequestCreateDto,
    ProviderRequestSearchDto,
} from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

interface GetProviderRequestIncomeQuery {
    hiddenAndViewed?: boolean
    search?: ProviderHorecaRequestSearchDto
    sort?: string
}

interface GetRequestQueryParams {
    offset?: number
    limit?: number
    search?: ProviderRequestSearchDto
    sort?: string
}

export function useProviderRequestIncomeQuery(
    params: GetProviderRequestIncomeQuery
) {
    return useCustomQuery({
        queryKey: ['provider', 'request', params],
        queryFn: () =>
            api.providerRequestsControllerIncomeHorecaRequests(params),
    })
}

export function useProviderRequestGetIncomeByID(id: number) {
    return useCustomQuery({
        queryKey: ['request', id],
        queryFn: () => api.providerRequestsControllerGetIncomeHorecaRequest(id),
    })
}

export function useProviderRequestGetStatusMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: HorecaRequestProviderStatusDto) =>
            api.providerRequestsControllerSetStatusForIncomeHorecaRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['provider', 'request'],
                exact: false,
            })

            queryClient.invalidateQueries({
                queryKey: ['request'],
                exact: false,
            })
        },
    })
}

export function useProviderRequestMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ProviderRequestCreateDto) =>
            api.providerRequestsControllerCreate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['provider', 'request'],
                exact: false,
            })

            queryClient.invalidateQueries({
                queryKey: ['request'],
                exact: false,
            })
        },
    })
}

export function useGetAllProviderRequestQuery(params: GetRequestQueryParams) {
    return useCustomInfiniteQuery({
        queryKey: ['request', params, params.search?.status],
        queryFn: () => api.providerRequestsControllerFindAll(params),
    })
}
