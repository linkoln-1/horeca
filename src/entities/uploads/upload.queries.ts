import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api, uploadFile } from '@/shared/lib/horekaApi'
import { UploadDto } from '@/shared/lib/horekaApi/Api'
import { useCustomQuery } from '@/shared/lib/reactQuery/useCustomQuery'
import { Image } from '@/shared/types/types'

type UseUploadImageMutation = {
    file: File
}

export function useImageUploadMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ file }: UseUploadImageMutation) =>
            uploadFile<UploadDto>(file, '/api/uploads'),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['image'] })
        },
    })
}
