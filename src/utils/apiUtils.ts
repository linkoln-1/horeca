// utils for requests to api
import { toast } from 'react-toastify'

// import { userStore } from '@/entities/user'
import { BackendError } from '@/utils/backendError'

import { type paths } from '@/api/types'

type Path = keyof paths
type PathMethod<T extends Path> = keyof paths[T]

export type RequestBodyType<
    P extends Path,
    M extends PathMethod<P>,
> = paths[P][M] extends {
    requestBody: {
        content: {
            'application/json': any
        }
    }
}
    ? paths[P][M]['requestBody']['content']['application/json']
    : {}

export type RequestParams<
    P extends Path,
    M extends PathMethod<P>,
> = paths[P][M] extends {
    parameters: any
}
    ? paths[P][M]['parameters'] & RequestBodyType<P, M>
    : RequestBodyType<P, M>

type HasResponses<
    P extends Path,
    M extends PathMethod<P>,
> = M extends keyof paths[P]
    ? 'responses' extends keyof paths[P][M]
        ? paths[P][M]['responses']
        : never
    : never

type SuccessResponse<T> = T extends {
    '200': { content: { 'application/json': infer U } }
}
    ? U
    : never

export type ResponseType<
    P extends Path,
    M extends PathMethod<P>,
> = SuccessResponse<HasResponses<P, M>>

type PathParameters<
    P extends Path,
    M extends PathMethod<P>,
> = paths[P][M] extends {
    parameters: { path: infer U }
}
    ? U
    : never

export type NoStatusCodeResponse<
    Endpoint extends Path,
    Method extends PathMethod<Endpoint>,
> =
    ResponseType<Endpoint, Method> extends { statusCode: any }
        ? never
        : ResponseType<Endpoint, Method>

type QueryParameters<
    P extends Path,
    M extends PathMethod<P>,
> = paths[P][M] extends {
    parameters: { query: infer U }
}
    ? U
    : never

export type CombinedRequestParams<P extends Path, M extends PathMethod<P>> = {
    path?: PathParameters<P, M>
    query?: QueryParameters<P, M> | { [key: string]: string }
}

export function customFetch<
    P extends Path,
    M extends Extract<PathMethod<P>, 'get'>,
>(
    url: P,
    method: M,
    params?: RequestParams<P, M> extends undefined ? [] : [RequestParams<P, M>]
): Promise<ResponseType<P, M> | undefined>

export function customFetch<P extends Path, M extends PathMethod<P>>(
    url: P,
    method: M,
    body: RequestBodyType<P, M>,
    ...params: CombinedRequestParams<P, M> extends undefined
        ? []
        : [CombinedRequestParams<P, M>]
): Promise<ResponseType<P, M>>

export async function customFetch<P extends Path, M extends PathMethod<P>>(
    url: P,
    method: M,
    body: RequestBodyType<P, M> = {},
    params: CombinedRequestParams<P, M> = {}
): Promise<ResponseType<P, M> | undefined> {
    const baseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_API}`
    let fullUrl = baseUrl + url

    const isFormData = body instanceof FormData

    const headers: Record<string, string> = isFormData
        ? {}
        : {
              'Content-Type': 'application/json',
          }

    // if (userStore.getState().accessToken) {
    //     const token = userStore.getState().accessToken
    //     if (token) {
    //         headers['Authorization'] = `Bearer ${token}`
    //     }
    // } else {
    //     // next server handling
    // }

    const requestOptions: RequestInit = {
        method: method as string,
        headers,
    }

    if (method !== 'get' && !isFormData) {
        requestOptions.body = JSON.stringify(body)
    } else if (isFormData) {
        requestOptions.body = body
    }

    if (params.path) {
        Object.entries(params.path).forEach(([key, value]) => {
            fullUrl = fullUrl.replace(
                `{${key}}`,
                encodeURIComponent(String(value))
            )
        })
    }

    if (params.query) {
        const queryStr = new URLSearchParams(
            params.query as Record<string, string>
        ).toString()
        if (queryStr) fullUrl += `?${queryStr}`
    }

    const response = await fetch(fullUrl, requestOptions)

    if (!response.ok) {
        const error = (await response.json()) as object

        if (BackendError.isBackendError(error)) {
            if (error.msg) {
                toast.error(error.msg)
            }
            throw new BackendError(
                error.error,
                error.statusCode,
                error.msg,
                error.message
            )
        } else if (error instanceof Error) {
            toast.error('Unknown API error')
            throw new Error(
                `API Error: ${error.message} with status code ${response.status}`
            )
        } else {
            toast.error('Unknown API error')
            throw new Error(
                `API Error: unknown with status code ${response.status}`
            )
        }
    }

    try {
        return (await response.json()) as Promise<ResponseType<P, M>>
    } catch (e) {
        return {} as ResponseType<P, M>
    }
}
