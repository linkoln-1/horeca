import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api, uploadFile } from '@/shared/lib/horekaApi'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'
import { Image } from '@/shared/types/types'

type UseUploadImageMutation = {
    file: File
}

export function useGetImageByIdQuery({ id }: { id: number }) {
    return useCustomQuery({
        queryKey: ['image', id],
        queryFn: () => api.uploadsControllerRead(id),
        enabled: !!id,
    })
}

export function useImageUploadMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ file }: UseUploadImageMutation) =>
            uploadFile<Image>(file, '/api/uploads'),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['image'] })
        },
    })
}
