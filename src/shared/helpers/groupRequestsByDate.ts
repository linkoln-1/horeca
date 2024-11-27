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
