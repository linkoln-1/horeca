import { api } from '@/shared/lib/horekaApi'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useProviderRequestIncomeQuery() {
    return useCustomQuery({
        queryKey: ['provider', 'request'],
        queryFn: () => api.providerRequestsControllerFindForProvider(),
    })
}

export function useProviderRequestGetStatusQuery() {}

export function useProviderRequestMutation() {}

export function useProviderRequestUpdateQuery() {}
