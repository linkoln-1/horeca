import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib/horekaApi'
import { SupportRequestCreateDto } from '@/shared/lib/horekaApi/Api'

export function useSupportCreateRequestChatMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ data }: { data: SupportRequestCreateDto }) =>
            api.supportRequestsControllerCreate(data),

        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [''] })
        },
    })
}

export function useGetAdminSupportListChatQuery() {
    return useQuery({
        queryKey: ['admin', 'support', 'list'],
        queryFn: async () => {
            const res = await api.supportRequestsAdminControllerList()
            return res.data.data
        },
    })
}

export function useAdminAssignRequestChatMutation() {
    return useMutation({
        mutationFn: ({ id }: { id: string }) =>
            api.supportRequestsAdminControllerAssignAdmin(+id),
    })
}
