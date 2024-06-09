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

export interface UpdateUserDto {
    name: string
    email: string
    phone: string
    profile: CreateHorecaProfileDto | CreateProviderProfileDto
}

export interface UserDto {
    id: number
    name: string
    tin: string
    email: string
    phone: string
    password: string
    profileType: string
    profile: HorecaProfileDto | ProviderProfileDto
}

export interface ErrorDto {
    /** @example "AUTH_FAIL" */
    errorMessage?:
        | 'AUTH_FAIL'
        | 'ITEM_NOT_FOUND'
        | 'MAIL_IS_BUSY'
        | 'PASSWORD_CHANGE_ERROR'
        | 'USER_ALREADY_EXISTS'
        | 'USER_DOES_NOT_EXISTS'
        | 'GDPR_IS_NOT_APPROVED'
    /** @example ["password|IS_NOT_EMPTY"] */
    message?: string[]
    /** @example "Bad Request" */
    error: string
    /** @example 400 */
    statusCode: number
}

export enum Weekday {
    Mo = 'mo',
    Tu = 'tu',
    We = 'we',
    Th = 'th',
    Fr = 'fr',
    Sa = 'sa',
    Su = 'su',
}

export interface Address {
    id?: number
    address: string
    weekdays: Weekday[]
    moFrom: string
    moTo: string
    tuFrom: string
    tuTo: string
    weFrom: string
    weTo: string
    thFrom: string
    thTo: string
    frFrom: string
    frTo: string
    saFrom: string
    saTo: string
    suFrom: string
    suTo: string
}

export interface HorecaProfileDto {
    info?: string
    /** @minItems 1 */
    addresses: Address[]
}

export enum Categories {
    AlcoholicDrinks = 'alcoholicDrinks',
    GrocerySpicesSeasonings = 'grocerySpicesSeasonings',
    SoftDrinks = 'softDrinks',
    ReadyMeals = 'readyMeals',
    Stationery = 'stationery',
    Confectionery = 'confectionery',
    CannedFoods = 'cannedFoods',
    DairyProducts = 'dairyProducts',
    IceCream = 'iceCream',
    Meat = 'meat',
    LowAlcoholDrinks = 'lowAlcoholDrinks',
    SemiFinishedProducts = 'semiFinishedProducts',
    Dishes = 'dishes',
    CashDesk = 'cashDesk',
    InstantFoods = 'instantFoods',
    Fish = 'fish',
    FruitsAndVegetables = 'fruitsAndVegetables',
    CleaningProducts = 'cleaningProducts',
    BakeryProducts = 'bakeryProducts',
    TeeAndCoffee = 'teeAndCoffee',
}
export const CategoryLabels: Record<Categories, string> = {
    alcoholicDrinks: 'Алкогольные напитки',
    grocerySpicesSeasonings: 'Бакалея, специи, приправы',
    softDrinks: 'Безалкогольные напитки, вода, соки',
    readyMeals: 'Готовые блюда',
    stationery: 'Канцтовары',
    confectionery: 'Кондитерские изделия',
    cannedFoods: 'Консервированные продукты',
    dairyProducts: 'Молочные продукты, яйца',
    iceCream: 'Мороженое',
    meat: 'Мясо, субпродукты, колбасные изделия',
    lowAlcoholDrinks: 'Пиво, слабоалкогольные напитки',
    semiFinishedProducts: 'Полуфабрикаты',
    dishes: 'Посуда и кухонные принадлежности',
    cashDesk: 'Прикасса (чипсы, снеки, семечки)',
    instantFoods: 'Продукты быстрого приготовления, лапша',
    fish: 'Рыба и морепродукты',
    fruitsAndVegetables: 'Свежие овощи, фрукты, зелень, грибы',
    cleaningProducts: 'Уборка и чистящие средства',
    bakeryProducts: 'Хлеб, хлебобулочные изделия',
    teeAndCoffee: 'Чай, кофе, какао, заменители',
}

export enum DeliveryMethods {
    SelfPickup = 'selfPickup',
    DeliveryBySupplier = 'deliveryBySupplier',
    SameDayDelivery = 'sameDayDelivery',
    Weekends = 'weekends',
}

export const DeliveryMethodsLabels: Record<DeliveryMethods, string> = {
    selfPickup: 'самовывоз',
    deliveryBySupplier: 'доставка транспортом поставщика',
    sameDayDelivery: 'доставка в день заказа',
    weekends: 'выходные праздничные дни',
}

export interface ProviderProfileDto {
    minOrderAmount: number
    /** @minItems 1 */
    categories: Categories[]
    /** @minItems 1 */
    deliveryMethods: DeliveryMethods[]
}

export interface CreateHorecaProfileDto {
    info?: string
    /** @minItems 1 */
    addresses: Address[]
}

export interface CreateProviderProfileDto {
    minOrderAmount: number
    /** @minItems 1 */
    categories: Categories[]
    /** @minItems 1 */
    deliveryMethods: DeliveryMethods[]
}

export enum ProfileType {
    Provider = 'Provider',
    Horeca = 'Horeca',
}

export interface RegistrateUserDto {
    name: string
    tin: string
    GDPRApproved: boolean
    email: string
    phone: string
    password: string
    repeatPassword: string
    profileType: ProfileType
    profile: CreateHorecaProfileDto | CreateProviderProfileDto
}

export interface AuthResultDto {
    accessToken: string
    refreshToken: string
}

export interface LoginUserDto {
    email: string
    password: string
}

export type CreateProposalHorecaDto = object

export type CreateProposalProviderDto = object

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
    public baseUrl: string = ''
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
        return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
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

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
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
            `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
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
            const r = response.clone() as HttpResponse<T, E>
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
 * @title HoReCa API
 * @version 1.0
 * @contact
 *
 * The API for HoReCa
 */
export class Api<
    SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @tags Users
         * @name UsersControllerUpdate
         * @request PUT:/api/users/{id}
         * @secure
         */
        usersControllerUpdate: (
            id: number,
            data: UpdateUserDto,
            params: RequestParams = {}
        ) =>
            this.request<UserDto, ErrorDto>({
                path: `/api/users/${id}`,
                method: 'PUT',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Users
         * @name UsersControllerGet
         * @request GET:/api/users/{id}
         * @secure
         */
        usersControllerGet: (id: number, params: RequestParams = {}) =>
            this.request<UserDto, ErrorDto>({
                path: `/api/users/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Authorization
         * @name AuthorizationControllerRegistrate
         * @request POST:/api/auth/registration
         */
        authorizationControllerRegistrate: (
            data: RegistrateUserDto,
            params: RequestParams = {}
        ) =>
            this.request<AuthResultDto, ErrorDto>({
                path: `/api/auth/registration`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Authorization
         * @name AuthorizationControllerLogin
         * @request POST:/api/auth/login
         */
        authorizationControllerLogin: (
            data: LoginUserDto,
            params: RequestParams = {}
        ) =>
            this.request<AuthResultDto, ErrorDto>({
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
         * @tags Proposals
         * @name ProposalsHorecaControllerCreate
         * @request POST:/api/proposals/horeca
         * @secure
         */
        proposalsHorecaControllerCreate: (
            data: CreateProposalHorecaDto,
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/proposals/horeca`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Proposals
         * @name ProposalsProviderControllerCreate
         * @request POST:/api/proposals/provider
         * @secure
         */
        proposalsProviderControllerCreate: (
            data: CreateProposalProviderDto,
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/proposals/provider`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),
    }
}
