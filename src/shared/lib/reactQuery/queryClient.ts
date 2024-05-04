import { toast } from 'react-toastify'

import { BackendError } from '@/utils/backendError'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 3,
        },
        mutations: {
            onError(e: any) {
                const error = e?.error
                if (error && BackendError.isBackendError(error)) {
                    const errorMessage = error.msg
                    if (errorMessage) {
                        toast.error(errorMessage)
                    } else {
                        toast.error('Произошла неизвестная ошибка')
                    }
                }
            },
        },
    },
})
