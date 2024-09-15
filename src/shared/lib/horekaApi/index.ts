import { Api } from './Api'
import { getAuthHeader } from '@/entities/user'
export const { api, request } = new Api({
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_API,
    securityWorker() {
        return {
            headers: {
                ...getAuthHeader(),
            },
        }
    },
})

export * from './fileUploadFetch'
