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

export type StreamableFile = object

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
        | 'UPLOAD_NOT_FOUND'
        | 'ACTIVATION_LINK_ERROR'
    /** @example ["password|IS_NOT_EMPTY"] */
    message?: string[]
    /** @example "Bad Request" */
    error: string
    /** @example 400 */
    statusCode: number
}

export interface UpdateUserDto {
    name?: string
    email?: string
    phone?: string
    password?: string
    repeatPassword?: string
    profile?: CreateHorecaProfileDto | CreateProviderProfileDto
}

export interface UserDto {
    id: number
    name: string
    tin: string
    email: string
    phone: string
    password: string
    profile: HorecaProfileDto | ProviderProfileDto
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
    profileType: 'Provider' | 'Horeca'
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

export enum DeliveryMethods {
    SelfPickup = 'selfPickup',
    DeliveryBySupplier = 'deliveryBySupplier',
    SameDayDelivery = 'sameDayDelivery',
    Weekends = 'weekends',
}

export interface ProviderProfileDto {
    profileType: 'Provider' | 'Horeca'
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

export interface CreateHorecaProfileDto {
    profileType: ProfileType
    info?: string
    /** @minItems 1 */
    addresses: Address[]
}

export interface CreateProviderProfileDto {
    profileType: ProfileType
    minOrderAmount: number
    /** @minItems 1 */
    categories: Categories[]
    /** @minItems 1 */
    deliveryMethods: DeliveryMethods[]
}

export interface RegistrateUserDto {
    name: string
    tin: string
    GDPRApproved: boolean
    email: string
    phone: string
    password: string
    repeatPassword: string
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

export interface SuccessDto {
    status: string
}

export interface CreateProposalItemDto {
    name: string
    amount: number
    unit: string
    category: Categories
}

export interface CreateProposalDto {
    /** @minItems 1 */
    items: CreateProposalItemDto[]
    imageIds: number[]
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    paymentType: 'Prepayment' | 'Deferment' | 'PaymentUponDelivery'
    name: string
    phone: string
    comment?: string
}

export interface ProposalDto {
    id: number
    profileId: number
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    paymentType: string
    name: string
    phone: string
    items: string[]
    images: string[]
    comment: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface CreateProposalTemplateDto {
    name: string
    content: CreateProposalDto
}

export interface ProposalTemplateDto {
    id: number
    name: string
    content: object
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export enum ProductPackagingType {
    Bottle = 'Bottle',
    Box = 'Box',
    Pallet = 'Pallet',
}

export interface CreateProductProviderDto {
    category: Categories
    name: string
    description: string
    producer: string
    cost: number
    count: number
    packagingType: ProductPackagingType
    imageIds: number[]
}

export interface Image {
    id: number
    name: string
    mimetype: string
    path: string
    size: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface ProductImage {
    image: Image
}

export interface ProductResponse {
    id: number
    profileId: number
    category: string
    name: string
    description: string
    producer: string
    cost: number
    count: number
    packagingType: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    productImage: ProductImage[]
    isEditable: boolean
}

export interface UpdateProductProviderDto {
    category?: Categories
    name?: string
    description?: string
    producer?: string
    cost?: number
    count?: number
    packagingType?: ProductPackagingType
    imageIds: number[]
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
         * @tags Uploads
         * @name UploadsControllerUpload
         * @request POST:/api/uploads
         * @secure
         */
        uploadsControllerUpload: (
            data: {
                /** @format binary */
                file?: File
            },
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/uploads`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Uploads
         * @name UploadsControllerRead
         * @request GET:/api/uploads/{id}
         * @secure
         */
        uploadsControllerRead: (id: number, params: RequestParams = {}) =>
            this.request<StreamableFile, ErrorDto>({
                path: `/api/uploads/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Uploads
         * @name UploadsControllerDelete
         * @request DELETE:/api/uploads/{id}
         * @secure
         */
        uploadsControllerDelete: (id: number, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/uploads/${id}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Users
         * @name UsersControllerUpdate
         * @summary Update users profile
         * @request PUT:/api/users/me
         * @secure
         */
        usersControllerUpdate: (
            data: UpdateUserDto,
            params: RequestParams = {}
        ) =>
            this.request<UserDto, ErrorDto>({
                path: `/api/users/me`,
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
         * @summary Get users profile
         * @request GET:/api/users/me
         * @secure
         */
        usersControllerGet: (params: RequestParams = {}) =>
            this.request<UserDto, ErrorDto>({
                path: `/api/users/me`,
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
         * @summary Registrate user
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
         * @summary Authenticate user
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
         * @tags Authorization
         * @name AuthorizationControllerActivateAccount
         * @summary Activate profile by link in the confirmation email
         * @request GET:/api/auth/activate/{uuid}
         */
        authorizationControllerActivateAccount: (
            uuid: string,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/auth/activate/${uuid}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Proposals
         * @name ProposalsHorecaControllerCreate
         * @summary Create products(categories) set proposal required for HoReCa
         * @request POST:/api/proposals/horeca
         * @secure
         */
        proposalsHorecaControllerCreate: (
            data: CreateProposalDto,
            params: RequestParams = {}
        ) =>
            this.request<ProposalDto, ErrorDto>({
                path: `/api/proposals/horeca`,
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
         * @tags Proposals
         * @name ProposalsHorecaControllerCreateTemplate
         * @summary Create template of products(categories) set proposal required for HoReCa to use later
         * @request POST:/api/proposals/horeca/template
         * @secure
         */
        proposalsHorecaControllerCreateTemplate: (
            data: CreateProposalTemplateDto,
            params: RequestParams = {}
        ) =>
            this.request<ProposalTemplateDto, ErrorDto>({
                path: `/api/proposals/horeca/template`,
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
         * @tags Proposals
         * @name ProposalsHorecaControllerGetTemplate
         * @summary Get template of products(categories) set proposal required for HoReCa
         * @request GET:/api/proposals/horeca/template/{id}
         * @secure
         */
        proposalsHorecaControllerGetTemplate: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<ProposalTemplateDto, ErrorDto>({
                path: `/api/proposals/horeca/template/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Proposals
         * @name ProposalsProviderControllerFindAppropriateProposals
         * @summary List of HoReCa proposals that matches with provider's offers
         * @request GET:/api/proposals/provider
         * @secure
         */
        proposalsProviderControllerFindAppropriateProposals: (
            params: RequestParams = {}
        ) =>
            this.request<ProposalDto[], ErrorDto>({
                path: `/api/proposals/provider`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Products
         * @name ProductsProviderControllerCreate
         * @summary Create product from provider's offer
         * @request POST:/api/products/provider
         * @secure
         */
        productsProviderControllerCreate: (
            data: CreateProductProviderDto,
            params: RequestParams = {}
        ) =>
            this.request<ProductResponse, ErrorDto>({
                path: `/api/products/provider`,
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
         * @tags Products
         * @name ProductsProviderControllerFindAll
         * @summary Gat all products from provider's offer
         * @request GET:/api/products/provider
         * @secure
         */
        productsProviderControllerFindAll: (params: RequestParams = {}) =>
            this.request<ProductResponse[], ErrorDto>({
                path: `/api/products/provider`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Products
         * @name ProductsProviderControllerGet
         * @summary Get the specific product
         * @request GET:/api/products/provider/{id}
         * @secure
         */
        productsProviderControllerGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<ProductResponse, ErrorDto>({
                path: `/api/products/provider/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Products
         * @name ProductsProviderControllerUpdate
         * @summary Update the specific product
         * @request PUT:/api/products/provider/{id}
         * @secure
         */
        productsProviderControllerUpdate: (
            id: number,
            data: UpdateProductProviderDto,
            params: RequestParams = {}
        ) =>
            this.request<ProductResponse, ErrorDto>({
                path: `/api/products/provider/${id}`,
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
         * @tags Products
         * @name ProductsProviderControllerDelete
         * @summary Delete the specific product
         * @request DELETE:/api/products/provider/{id}
         * @secure
         */
        productsProviderControllerDelete: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/products/provider/${id}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),
    }
}
