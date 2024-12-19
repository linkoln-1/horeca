import { HorecaRequestDto } from '@/shared/lib/horekaApi/Api'

export function groupRequestsByDate(requests: HorecaRequestDto[]) {
    return requests.reduce(
        (acc, request) => {
            const date = new Date(request.createdAt).toLocaleDateString()
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(request)
            return acc
        },
        {} as Record<string, HorecaRequestDto[]>
    )
}

export function groupByCategory<T, K extends keyof T>(
    items: T[],
    categoryKey: K
): Record<string, T[]> {
    return items.reduce(
        (acc, item) => {
            const key = String(item[categoryKey])
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(item)
            return acc
        },
        {} as Record<string, T[]>
    )
}
