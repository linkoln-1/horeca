import { toast } from 'react-toastify'

import { QueryClient } from '@tanstack/react-query'

import { errors } from '@/shared/constants/errors'
import { BackendError } from '@/shared/utils/backendError'

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
                    if (errors[error.errorMessage!].length) {
                        toast.error(errors[error.errorMessage!])
                        console.log(errors[error.errorMessage!])
                    }
                }
            },
        },
    },
})
