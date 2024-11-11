import { useMutation } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    HorecaRequestTemplateCreateDto,
    HorecaRequestTemplateUpdateDto,
} from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

export function useGetHorecaTemplateQuery() {
    return useCustomInfiniteQuery({
        queryKey: ['template'],
        queryFn: () => api.horecaRequestsTemplateControllerFindAll(),
    })
}

export function useGetByIdHorecaTemplateQuery({
    id,
    enabled = true,
}: {
    id: number
    enabled?: boolean
}) {
    return useCustomQuery({
        queryKey: ['template-id'],
        queryFn: () => api.horecaRequestsTemplateControllerFind(id),

        enabled,
    })
}

export function useCreateHorecaTemplateMutation() {
    return useMutation({
        mutationFn: ({ data }: { data: HorecaRequestTemplateCreateDto }) =>
            api.horecaRequestsTemplateControllerCreate(data),
    })
}

export function useUpdateHorecaTemplateMutation(id: number) {
    return useMutation({
        mutationFn: ({ data }: { data: HorecaRequestTemplateUpdateDto }) =>
            api.horecaRequestsTemplateControllerUpdate(id, data),
    })
}

export function useDeleteHorecaTemplateMutation(id: number) {
    return useMutation({
        mutationFn: () => api.horecaRequestsTemplateControllerDelete(id),
    })
}
