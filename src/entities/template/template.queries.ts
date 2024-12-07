import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import {
    HorecaRequestTemplateCreateDto,
    HorecaRequestTemplateUpdateDto,
} from '@/shared/lib/horekaApi/Api'
import { useCustomInfiniteQuery } from '@/shared/lib/reactQuery/useCustomInfiniteQuery'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'

type QueryType = {
    offset?: number
    limit?: number
    search?: string
    sort?: string
}

export function useGetHorecaTemplateQuery(
    query?: QueryType,
    enabled: boolean = true
) {
    return useCustomInfiniteQuery({
        queryKey: ['template', enabled],
        queryFn: () => api.horecaRequestsTemplateControllerFindAll(query),
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
        queryKey: ['template-id', id],
        queryFn: () => api.horecaRequestsTemplateControllerFind(id),

        enabled,
    })
}

export function useCreateHorecaTemplateMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ data }: { data: HorecaRequestTemplateCreateDto }) =>
            api.horecaRequestsTemplateControllerCreate(data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: ['template'] })
        },
    })
}

export function useUpdateHorecaTemplateMutation(id: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ data }: { data: HorecaRequestTemplateUpdateDto }) =>
            api.horecaRequestsTemplateControllerUpdate(id, data),

        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: ['template-id'] })
        },
    })
}

export function useDeleteHorecaTemplateMutation(id: number) {
    return useMutation({
        mutationFn: () => api.horecaRequestsTemplateControllerDelete(id),
    })
}
