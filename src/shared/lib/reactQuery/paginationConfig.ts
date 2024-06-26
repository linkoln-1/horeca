import { InfiniteQueryPageParamsOptions } from '@tanstack/react-query'

import { HttpResponse } from '@/shared/lib/horekaApi/Api'

export function paginationConfig<
    T extends HttpResponse<{ data: B[]; total: number }>,
    B = T['data']['data'][number],
>(): InfiniteQueryPageParamsOptions<T, number> {
    return {
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            const total = lastPage?.data.total ?? 0
            const items = pages
                .map(x => x?.data.data.length ?? 0)
                .reduce((curr, prev) => curr + prev, 0)
            if (total > items) return items
            return undefined
        },
    }
}
