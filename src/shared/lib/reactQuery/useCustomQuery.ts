import { QueryClient, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { HttpResponse } from '@/shared/lib/horekaApi/Api'

export function useCustomQuery<T>(
    options: UseQueryOptions<HttpResponse<T>>,
    queryClient?: QueryClient
) {
    return useQuery({ ...options, select: ({ data }) => data }, queryClient)
}
