import {
    QueryClient,
    QueryKey,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import { ErrorDto, HttpResponse } from '@/shared/lib/horekaApi/Api'
import { paginationConfig } from '@/shared/lib/reactQuery/paginationConfig'

export function useCustomInfiniteQuery<
    TQueryFnData extends HttpResponse<{ data: TData[]; total: number }, TError>,
    TError extends ErrorDto,
    TData = TQueryFnData['data']['data'][number],
>(
    options: Omit<
        UseInfiniteQueryOptions<
            TQueryFnData,
            TError,
            TData[],
            TQueryFnData,
            QueryKey,
            number
        >,
        'initialPageParam' | 'getNextPageParam' | 'select'
    >,
    queryClient?: QueryClient
) {
    return useInfiniteQuery(
        {
            ...options,
            select: data => {
                return data.pages.map(x => x.data.data).flat()
            },
            ...paginationConfig(),
        },
        queryClient
    )
}
