import { useMutation } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    HorecaRequestProviderStatusDto,
    ProviderRequestCreateDto,
} from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useProviderRequestIncomeQuery() {
    return useCustomQuery({
        queryKey: ['provider', 'request'],
        queryFn: () => api.providerRequestsControllerIncomeHorecaRequests(),
    })
}

export function useProviderRequestGetStatusMutation() {
    return useMutation({
        mutationFn: (data: HorecaRequestProviderStatusDto) =>
            api.providerRequestsControllerSetStatusForIncomeHorecaRequest(data),
    })
}

export function useProviderRequestMutation() {
    return useMutation({
        mutationFn: (data: ProviderRequestCreateDto) =>
            api.providerRequestsControllerCreate(data),
    })
}

export function useGetAllProviderRequestQuery() {
    return useCustomInfiniteQuery({
        queryKey: ['provider', 'all', 'request'],
        queryFn: () => api.providerRequestsControllerFindAll(),
    })
}
