/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Template {
    /** Уникальный идентификатор шаблона */
    templateId: string
    /** Название шаблона */
    name: string
}

export interface Order {
    /** Идентификатор потребителя */
    consumerId?: string
}

export interface Product {
    /** Имя продукта. */
    name?: string
}

export interface Error {
    /** Error message detailing what went wrong. */
    msg?: string
}

export interface ConsumerResponse {
    consumer?: {
        /** @format email */
        email?: string
        companyName?: string
        deliveryAddress?: string
        deliveryTime?: string
        isVerificated?: boolean
        inn?: string
        _id?: string
    }
    token?: string
}

export interface ProviderResponse {
    provider?: {
        /** @format email */
        email?: string
        companyName?: string
        productCategory?: string
        minOrder?: string
        deliveryMethod?: string
        _id?: string
        inn?: string
        isVerificated?: boolean
    }
    token?: string
}

export interface BadRequestResponse {
    message?: string
}

export interface UnauthorizedResponse {
    message?: string
}

export interface ServerErrorResponse {
    message?: string
}

export interface Consumer {
    /** @format email */
    email: string
    password: string
    phone: string
    companyName: string
    /** @format int64 */
    inn: number
    deliveryAddress: {
        address?: string
        info?: string
        deliveryTime?: {
            day?: string
            from?: string
            to?: string
        }[]
    }[]
    /** @format int32 */
    code?: number
    /** @default false */
    isVerificated?: boolean
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    /** content type of request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat
    /** request body */
    body?: unknown
    /** base url */
    baseUrl?: string
    /** request cancellation token */
    cancelToken?: CancelToken
}

export type RequestParams = Omit<
    FullRequestParams,
    'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<RequestParams | void> | RequestParams | void
    customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
    extends Response {
    data: D
    error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = 'undefined'
    private securityData: SecurityDataType | null = null
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
    private abortControllers = new Map<CancelToken, AbortController>()
    private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
        fetch(...fetchParams)

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig)
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data
    }

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key)
        return `${encodedKey}=${encodeURIComponent(
            typeof value === 'number' ? value : `${value}`
        )}`
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key])
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key]
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {}
        const keys = Object.keys(query).filter(
            key => 'undefined' !== typeof query[key]
        )
        return keys
            .map(key =>
                Array.isArray(query[key])
                    ? this.addArrayQueryParam(query, key)
                    : this.addQueryParam(query, key)
            )
            .join('&')
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery)
        return queryString ? `?${queryString}` : ''
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null &&
            (typeof input === 'object' || typeof input === 'string')
                ? JSON.stringify(input)
                : input,
        [ContentType.Text]: (input: any) =>
            input !== null && typeof input !== 'string'
                ? JSON.stringify(input)
                : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key]
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === 'object' && property !== null
                        ? JSON.stringify(property)
                        : `${property}`
                )
                return formData
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    }

    protected mergeRequestParams(
        params1: RequestParams,
        params2?: RequestParams
    ): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        }
    }

    protected createAbortSignal = (
        cancelToken: CancelToken
    ): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken)
            if (abortController) {
                return abortController.signal
            }
            return void 0
        }

        const abortController = new AbortController()
        this.abortControllers.set(cancelToken, abortController)
        return abortController.signal
    }

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken)

        if (abortController) {
            abortController.abort()
            this.abortControllers.delete(cancelToken)
        }
    }

    public request = async <T = any, E = any>(
        {
            body,
            secure,
            path,
            type,
            query,
            format,
            baseUrl,
            cancelToken,
            ...params
        }: FullRequestParams
    ): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === 'boolean'
                ? secure
                : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {}
        const requestParams = this.mergeRequestParams(params, secureParams)
        const queryString = query && this.toQueryString(query)
        const payloadFormatter =
            this.contentFormatters[type || ContentType.Json]
        const responseFormat = format || requestParams.format

        return this.customFetch(
            `${baseUrl || this.baseUrl || ''}${path}${
                queryString ? `?${queryString}` : ''
            }`,
            {
                ...requestParams,
                headers: {
                    ...(requestParams.headers || {}),
                    ...(type && type !== ContentType.FormData
                        ? { 'Content-Type': type }
                        : {}),
                },
                signal:
                    (cancelToken
                        ? this.createAbortSignal(cancelToken)
                        : requestParams.signal) || null,
                body:
                    typeof body === 'undefined' || body === null
                        ? null
                        : payloadFormatter(body),
            }
        ).then(async response => {
            const r = response as HttpResponse<T, E>
            r.data = null as unknown as T
            r.error = null as unknown as E

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then(data => {
                          if (r.ok) {
                              r.data = data
                          } else {
                              r.error = data
                          }
                          return r
                      })
                      .catch(e => {
                          r.error = e
                          return r
                      })

            if (cancelToken) {
                this.abortControllers.delete(cancelToken)
            }

            if (!response.ok) throw data
            return data
        })
    }
}

/**
 * @title Express API for JSONPlaceholder
 * @version 1.0.0
 *
 * This is a REST API application made with Express. It retrieves data from JSONPlaceholder.
 */
export class Api<
    SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @tags Регистрация/Верификация/Авторизация общепита
         * @name AuthConsumerChangePasswordCreate
         * @summary Изменение пароля
         * @request POST:/api/auth/consumer/changePassword
         */
        authConsumerChangePasswordCreate: (
            data: {
                /** @format email */
                email: string
                newPassword: string
                code: number
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    provider?: {
                        /** @format email */
                        email?: string
                        phone?: string
                        companyName?: string
                        productCategory?: string
                        minOrder?: string
                        deliveryMethod?: string
                        isVerificated?: boolean
                        inn?: string
                        _id?: string
                    }
                    token?: string
                },
                {
                    message?: string
                }
            >({
                path: `/api/auth/consumer/changePassword`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Регистрация/Верификация/Авторизация поставщика
         * @name AuthProviderChangePasswordCreate
         * @summary Изменение пароля
         * @request POST:/api/auth/provider/changePassword
         */
        authProviderChangePasswordCreate: (
            data: {
                /** @format email */
                email: string
                newPassword: string
                code: number
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    provider?: {
                        /** @format email */
                        email?: string
                        phone?: string
                        companyName?: string
                        productCategory?: string
                        minOrder?: string
                        deliveryMethod?: string
                        isVerificated?: boolean
                        inn?: string
                        _id?: string
                    }
                    token?: string
                },
                {
                    message?: string
                }
            >({
                path: `/api/auth/provider/changePassword`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Шаблоны
         * @name ConsumerDeleteTemplateDelete
         * @summary Удаление шаблона по идентификатору
         * @request DELETE:/api/consumer/delete_template/{templateId}
         * @secure
         */
        consumerDeleteTemplateDelete: (
            templateId: string,
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    /** @example "Шаблон успешно удален" */
                    message?: string
                },
                | {
                      /** @example "Шаблон не найден" */
                      message?: string
                  }
                | {
                      /** @example "Произошла ошибка при удалении шаблона" */
                      message?: string
                      error?: string
                  }
            >({
                path: `/api/consumer/delete_template/${templateId}`,
                method: 'DELETE',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Изменение данных в личном кабинете
         * @name ConsumerEditExtraInfoCreate
         * @summary Изменение дополнительной информации общепита
         * @request POST:/api/consumer/edit_extra_info
         * @secure
         */
        consumerEditExtraInfoCreate: (
            data: {
                consumerId: string
                deliveryAddress?: {
                    address?: string
                    deliveryTime?: {
                        day?: string
                        from?: string
                        to?: string
                    }[]
                }[]
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    consumer?: {
                        email?: string
                        phone?: string
                        companyName?: string
                        deliveryAddress?: {
                            address?: string
                            deliveryTime?: {
                                day?: string
                                from?: string
                                to?: string
                            }[]
                        }[]
                        inn?: string
                        _id?: string
                    }
                    token?: string
                },
                {
                    message?: string
                }
            >({
                path: `/api/consumer/edit_extra_info`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Изменение данных в личном кабинете
         * @name ProviderEditExtraInfoCreate
         * @summary Изменение дополнительной информации поставщика
         * @request POST:/api/provider/edit_extra_info
         * @secure
         */
        providerEditExtraInfoCreate: (
            data: {
                /** Идентификатор поставщика */
                providerId: string
                /** Категории продуктов */
                productCategory?: string[]
                /** Минимальный размер заказа */
                minOrder?: number
                /** Способы доставки */
                deliveryMethod?: string[]
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    provider?: {
                        email?: string
                        phone?: string
                        companyName?: string
                        productCategory?: string[]
                        minOrder?: number
                        deliveryMethod?: string[]
                        isVerificated?: boolean
                        _id?: string
                        inn?: string
                    }
                    token?: string
                },
                {
                    message?: string
                }
            >({
                path: `/api/provider/edit_extra_info`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Изменение данных в личном кабинете
         * @name ConsumerEditMainInfoCreate
         * @summary Изменение основной информации общепита
         * @request POST:/api/consumer/edit_main_info
         * @secure
         */
        consumerEditMainInfoCreate: (
            data: {
                phone?: string
                companyName?: string
                email?: string
                password?: string
                consumerId: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    consumer?: {
                        email?: string
                        phone?: string
                        companyName?: string
                        deliveryAddress?: string
                        deliveryTime?: string
                        inn?: string
                        _id?: string
                    }
                    token?: string
                },
                {
                    message?: string
                }
            >({
                path: `/api/consumer/edit_main_info`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Изменение данных в личном кабинете
         * @name ProviderEditMainInfoCreate
         * @summary Изменение основной информации поставщика
         * @request POST:/api/provider/edit_main_info
         * @secure
         */
        providerEditMainInfoCreate: (
            data: {
                phone?: string
                companyName?: string
                email?: string
                password?: string
                providerId: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    provider?: {
                        email?: string
                        companyName?: string
                        productCategory?: string
                        minOrder?: string
                        deliveryMethod?: string
                        _id?: string
                        inn?: string
                        isVerificated?: boolean
                    }
                    token?: string
                },
                {
                    message?: string
                }
            >({
                path: `/api/provider/edit_main_info`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Заявки
         * @name ConsumerAllOrdersDetail
         * @summary Получение всех заявок по определенному общепиту
         * @request GET:/api/consumer/allOrders/{consumerId}
         * @secure
         */
        consumerAllOrdersDetail: (
            consumerId: string,
            data?: any,
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    orders?: Order[]
                },
                any
            >({
                path: `/api/consumer/allOrders/${consumerId}`,
                method: 'GET',
                body: data,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Продукты
         * @name ExtraAllProductsList
         * @summary Получение списка продуктов
         * @request GET:/api/extra/allProducts
         */
        extraAllProductsList: (params: RequestParams = {}) =>
            this.request<Product[], Error>({
                path: `/api/extra/allProducts`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Шаблоны
         * @name ConsumerAlltemplatesDetail
         * @summary Получение всех шаблонов по определенному общепиту
         * @request GET:/api/consumer/alltemplates/{consumerId}
         * @secure
         */
        consumerAlltemplatesDetail: (
            consumerId: string,
            data?: any,
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    orders?: Template[]
                },
                any
            >({
                path: `/api/consumer/alltemplates/${consumerId}`,
                method: 'GET',
                body: data,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Авторизация
         * @name AuthLoginCreate
         * @summary Авторизация пользователя (поставщик или общепит)
         * @request POST:/api/auth/login
         */
        authLoginCreate: (
            data: {
                /**
                 * Электронная почта пользователя.
                 * @format email
                 */
                email: string
                /**
                 * Пароль пользователя.
                 * @format password
                 */
                password: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                ConsumerResponse | ProviderResponse,
                BadRequestResponse | UnauthorizedResponse | ServerErrorResponse
            >({
                path: `/api/auth/login`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Заявки
         * @name ConsumerNeworderCreate
         * @summary Создание новой заявки
         * @request POST:/api/consumer/neworder
         * @secure
         */
        consumerNeworderCreate: (
            data: {
                /** Спопоб оптаты */
                paymentMethod?: string
                /** Адрес доставки */
                deliveryAddress?: string
                /** consumer id */
                consumerId?: string
                /** Крайний день доставки */
                day?: string
                /** Крайнее время доставки */
                time?: string
                /** Время до которого принимается доставка */
                acceptTime?: string
                /** Описание заявки */
                description?: string
                images?: string[]
                categories?: {
                    /** Название категории */
                    categoryName?: string
                    products?: {
                        /** Название продукта */
                        productName?: string
                        /** Количество */
                        amount?: number
                        /** Единица измерения */
                        measure?: string
                    }[]
                }[]
            },
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/api/consumer/neworder`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Шаблоны
         * @name ConsumerNewtemplateCreate
         * @summary Создание нового шаблона
         * @request POST:/api/consumer/newtemplate
         * @secure
         */
        consumerNewtemplateCreate: (
            data: {
                /** Название шаблона */
                templateName?: string
                /** Спопоб оптаты */
                paymentMethod?: string
                /** Адрес доставки */
                deliveryAddress?: string
                /** consumer id */
                consumerId?: string
                /** Крайний день доставки */
                day?: string
                /** Крайнее время доставки */
                time?: string
                /** Время до которого принимается доставка */
                acceptTime?: string
                /** Описание заявки */
                description?: string
                images?: string[]
                categories?: {
                    /** Название категории */
                    categoryName?: string
                    products?: {
                        /** Название продукта */
                        productName?: string
                        /** Количество */
                        amount?: number
                        /** Единица измерения */
                        measure?: string
                    }[]
                }[]
            },
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/api/consumer/newtemplate`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Регистрация/Верификация/Авторизация общепита
         * @name AuthConsumerRegisterCreate
         * @summary Регистрация общепита
         * @request POST:/api/auth/consumer/register
         */
        authConsumerRegisterCreate: (
            data: {
                /**
                 * Электронная почта общепита.
                 * @format email
                 */
                email: string
                /** Пароль для входа. */
                password: string
                /** Контактный телефон. */
                phone: string
                /** Название компании общепита. */
                companyName: string
                /**
                 * ИНН компании общепита.
                 * @format int64
                 */
                inn: number
                /** Адреса и временные рамки доставки. */
                deliveryAddress: {
                    /** Адрес доставки. */
                    address?: string
                    /** Информация по приемке. */
                    info?: string
                    deliveryTime?: {
                        /** День доставки. */
                        day?: string
                        /** Время начала доставки. */
                        from?: string
                        /** Время окончания доставки. */
                        to?: string
                    }[]
                }[]
                /**
                 * Код для верификации (необязательный).
                 * @format int32
                 */
                code?: number
                /**
                 * Статус верификации (по умолчанию false).
                 * @default false
                 */
                isVerificated?: boolean
            },
            params: RequestParams = {}
        ) =>
            this.request<Consumer, void>({
                path: `/api/auth/consumer/register`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Регистрация/Верификация/Авторизация поставщика
         * @name AuthProviderRegisterCreate
         * @summary Регистрация поставщика
         * @request POST:/api/auth/provider/register
         */
        authProviderRegisterCreate: (
            data: {
                /**
                 * Электронная почта провайдера.
                 * @format email
                 */
                email: string
                /**
                 * Пароль для входа в систему.
                 * @format password
                 */
                password: string
                /**
                 * Контактный телефон.
                 * @format phone
                 */
                phone: string
                /** Название компании провайдера. */
                companyName: string
                /** Категории продуктов, которые предлагает компания. */
                productCategory: string[]
                /** Минимальный размер заказа. */
                minOrder: number
                /** Способы доставки. */
                deliveryMethod: string[]
                /** ИНН компании. */
                inn: number
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    provider?: {
                        email?: string
                        companyName?: string
                        productCategory?: string[]
                        minOrder?: number
                        deliveryMethod?: string[]
                        /** Статус верификации провайдера. */
                        isVerificated?: boolean
                        _id?: string
                        inn?: number
                    }
                    token?: string
                },
                {
                    message?: string
                } | void
            >({
                path: `/api/auth/provider/register`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * @description Отправляет на электронную почту общепита новый пароль, если указанный email зарегистрирован.
         *
         * @tags Регистрация/Верификация/Авторизация общепита
         * @name AuthConsumerRemindCreate
         * @summary Генерация и отправка кода для смены пароля.
         * @request POST:/api/auth/consumer/remind
         */
        authConsumerRemindCreate: (
            data: {
                /**
                 * Электронная почта общепита для восстановления пароля.
                 * @format email
                 */
                email: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    /** @example "Новый пароль сгенерирован и отправлен Вам на почту." */
                    message?: string
                },
                | {
                      /** @example "Не корректные данные." */
                      message?: string
                  }
                | {
                      /** @example "Указанный Email не зарегистрирован." */
                      message?: string
                  }
                | void
            >({
                path: `/api/auth/consumer/remind`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * @description Отправляет код для смены пароля, если указанный email зарегистрирован.
         *
         * @tags Регистрация/Верификация/Авторизация поставщика
         * @name AuthProviderRemindCreate
         * @summary Генерация и отправка кода для смены пароля.
         * @request POST:/api/auth/provider/remind
         */
        authProviderRemindCreate: (
            data: {
                /**
                 * Электронная почта поставщика для восстановления пароля.
                 * @format email
                 */
                email: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    /** @example "Новый код сгенерирован и отправлен Вам на почту." */
                    message?: string
                },
                | {
                      /** @example "Не корректные данные." */
                      message?: string
                  }
                | {
                      /** @example "Указанный Email не зарегистрирован." */
                      message?: string
                  }
                | void
            >({
                path: `/api/auth/provider/remind`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Регистрация/Верификация/Авторизация общепита
         * @name ConsumerVerificationCreate
         * @summary Верификация общепита
         * @request POST:/api/consumer/verification
         */
        consumerVerificationCreate: (
            data: {
                /** Код верификации, отправленный на электронную почту общепита. */
                code: string
                /** Идентификатор общепита, полученный при регистрации. */
                consumerId: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    consumer?: {
                        email?: string
                        companyName?: string
                        productCategory?: string[]
                        deliveryAddress?: string
                        deliveryTime?: {
                            day?: string
                            from?: string
                            to?: string
                        }[]
                        inn?: number
                        _id?: string
                    }
                    token?: string
                },
                {
                    /** @example "Ошибка верификации. Код не совпадает или пользователь не найден." */
                    message?: string
                } | void
            >({
                path: `/api/consumer/verification`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Регистрация/Верификация/Авторизация поставщика
         * @name ProviderVerificationCreate
         * @summary Верификация поставщика
         * @request POST:/api/provider/verification
         */
        providerVerificationCreate: (
            data: {
                /** Верификационный код, отправленный на электронную почту поставщика. */
                code: string
                /** Уникальный идентификатор поставщика. */
                providerId: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    provider?: {
                        email?: string
                        companyName?: string
                        productCategory?: string
                        minOrder?: string
                        deliveryMethod?: string
                        _id?: string
                        inn?: string
                        isVerificated?: boolean
                    }
                },
                void
            >({
                path: `/api/provider/verification`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),
    }
}
