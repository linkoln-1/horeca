import { Api, QueryParamsType } from './Api'
import { getAuthHeader } from '@/entities/user'

export class ApiSearchQuerySupported<
    SecurityDataType,
> extends Api<SecurityDataType> {
    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {}
        const keys = Object.keys(query).filter(
            key => 'undefined' !== typeof query[key]
        )
        return keys
            .map(key =>
                Array.isArray(query[key])
                    ? this.addArrayQueryParam(query, key)
                    : typeof query[key] === 'object'
                      ? this.buildQueryString(query[key], key)
                      : this.addQueryParam(query, key)
            )
            .join('&')
    }

    protected buildQueryString = (obj: any, parentKey = ''): string[] => {
        return Object.entries(obj).flatMap(([key, value]) => {
            const newKey = parentKey
                ? `${parentKey}[${encodeURIComponent(key)}]`
                : encodeURIComponent(key)

            if (value === undefined || value === null) return [] // Ignore null/undefined values

            if (Array.isArray(value)) {
                return value.map(v => `${newKey}=${encodeURIComponent(v)}`)
            } else if (typeof value === 'object') {
                return this.buildQueryString(value, newKey)
            } else {
                return `${newKey}=${encodeURIComponent(value as any)}`
            }
        })
    }
}

export const { api } = new ApiSearchQuerySupported({
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
