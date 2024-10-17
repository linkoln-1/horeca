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

export interface UploadDto {
    id: number
    name: string
    mimetype: string
    size: number
    path: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

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
        | 'INVALID_QUERY_STRING'
        | 'FORBIDDEN_ACTION'
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
    role: object
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    activationLink: string
    isActivated: boolean
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
    moFrom?: string
    moTo?: string
    tuFrom?: string
    tuTo?: string
    weFrom?: string
    weTo?: string
    thFrom?: string
    thTo?: string
    frFrom?: string
    frTo?: string
    saFrom?: string
    saTo?: string
    suFrom?: string
    suTo?: string
}

export interface HorecaProfileDto {
    profileType: 'Provider' | 'Horeca'
    info?: string
    /** @minItems 1 */
    addresses: Address[]
    id: number
    userId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    categories: string[]
    deliveryMethods: string[]
    minOrderAmount: number
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
    id: number
    userId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    info: string | null
    addresses: string[]
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

export interface LoginUserDto {
    email: string
    password: string
}

export interface AuthResultDto {
    accessToken: string
    refreshToken: string
}

export interface SuccessDto {
    status: string
}

export interface HorecaRequestItemCreateDto {
    name: string
    amount: number
    unit: string
    category: Categories
}

export interface HorecaRequestCreateDto {
    /** @minItems 1 */
    items: HorecaRequestItemCreateDto[]
    /** @default [] */
    imageIds?: number[]
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

export interface HorecaRequestItemDto {
    id: number
    horecaRequestId: number
    name: string
    amount: number
    unit: string
    category: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface HorecaRequestDto {
    id: number
    userId: number
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    paymentType: object
    name: string
    phone: string
    items: HorecaRequestItemDto[]
    comment: string
    activeProviderRequestId: number | null
    chatId: number | null
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    images?: UploadDto[]
}

export interface ProviderRequestItemDto {
    id: number
    providerRequestId: number
    horecaRequestItemId: number
    available: boolean
    manufacturer: string
    cost: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    images?: UploadDto[]
}

export interface HRProviderRequestDto {
    cover: number
    id: number
    userId: number
    horecaRequestId: number
    comment: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    items: ProviderRequestItemDto[]
}

export interface HorecaRequestWithProviderRequestDto {
    id: number
    userId: number
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    paymentType: object
    name: string
    phone: string
    items: HorecaRequestItemDto[]
    comment: string
    activeProviderRequestId: number | null
    chatId: number | null
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    images?: UploadDto[]
    providerRequests: HRProviderRequestDto[]
}

export interface PaginatedDto {
    /** Data items */
    data: any[]
    /** Total number of items */
    total: number
}

export interface HorecaRequestApproveProviderRequestDto {
    horecaRequestId: number
    providerRequestId: number
}

export interface HorecaRequestTemplateCreateDto {
    name: string
    content: HorecaRequestCreateDto
}

export interface HorecaRequestTemplateDto {
    id: number
    name: string
    content: object
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface HorecaRequestProviderStatusDto {
    horecaRequestId: number
    viewed?: boolean
    hidden?: boolean
}

export interface ProviderRequestItemCreateDto {
    /** @default [] */
    imageIds?: number[]
    available: boolean
    manufacturer: string
    cost: number
    horecaRequestItemId: number
}

export interface ProviderRequestCreateDto {
    horecaRequestId: number
    comment?: string
    items: ProviderRequestItemCreateDto[]
}

export interface ProviderRequestDto {
    id: number
    userId: number
    horecaRequestId: number
    comment: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    items: ProviderRequestItemDto[]
}

export enum ProductPackagingType {
    Bottle = 'Bottle',
    Box = 'Box',
    Pallet = 'Pallet',
}

export interface ProductCreateDto {
    packagingType: ProductPackagingType
    category:
        | 'alcoholicDrinks'
        | 'grocerySpicesSeasonings'
        | 'softDrinks'
        | 'readyMeals'
        | 'stationery'
        | 'confectionery'
        | 'cannedFoods'
        | 'dairyProducts'
        | 'iceCream'
        | 'meat'
        | 'lowAlcoholDrinks'
        | 'semiFinishedProducts'
        | 'dishes'
        | 'cashDesk'
        | 'instantFoods'
        | 'fish'
        | 'fruitsAndVegetables'
        | 'cleaningProducts'
        | 'bakeryProducts'
        | 'teeAndCoffee'
    name: string
    description: string
    producer: string
    cost: number
    count: number
    imageIds: number[]
}

export interface ProductDto {
    packagingType: ProductPackagingType
    isEditable: boolean
    id: number
    userId: number
    category:
        | 'alcoholicDrinks'
        | 'grocerySpicesSeasonings'
        | 'softDrinks'
        | 'readyMeals'
        | 'stationery'
        | 'confectionery'
        | 'cannedFoods'
        | 'dairyProducts'
        | 'iceCream'
        | 'meat'
        | 'lowAlcoholDrinks'
        | 'semiFinishedProducts'
        | 'dishes'
        | 'cashDesk'
        | 'instantFoods'
        | 'fish'
        | 'fruitsAndVegetables'
        | 'cleaningProducts'
        | 'bakeryProducts'
        | 'teeAndCoffee'
    name: string
    description: string
    producer: string
    cost: number
    count: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    images?: UploadDto[]
}

export interface ProductSearchDto {
    category?:
        | 'alcoholicDrinks'
        | 'grocerySpicesSeasonings'
        | 'softDrinks'
        | 'readyMeals'
        | 'stationery'
        | 'confectionery'
        | 'cannedFoods'
        | 'dairyProducts'
        | 'iceCream'
        | 'meat'
        | 'lowAlcoholDrinks'
        | 'semiFinishedProducts'
        | 'dishes'
        | 'cashDesk'
        | 'instantFoods'
        | 'fish'
        | 'fruitsAndVegetables'
        | 'cleaningProducts'
        | 'bakeryProducts'
        | 'teeAndCoffee'
}

export interface ProductUpdateDto {
    packagingType: ProductPackagingType
    category:
        | 'alcoholicDrinks'
        | 'grocerySpicesSeasonings'
        | 'softDrinks'
        | 'readyMeals'
        | 'stationery'
        | 'confectionery'
        | 'cannedFoods'
        | 'dairyProducts'
        | 'iceCream'
        | 'meat'
        | 'lowAlcoholDrinks'
        | 'semiFinishedProducts'
        | 'dishes'
        | 'cashDesk'
        | 'instantFoods'
        | 'fish'
        | 'fruitsAndVegetables'
        | 'cleaningProducts'
        | 'bakeryProducts'
        | 'teeAndCoffee'
    name: string
    description: string
    producer: string
    cost: number
    count: number
    imageIds: number[]
}

export interface ChatCreateDto {
    opponentId: number
    horecaRequestId?: number
    type: 'Support' | 'Order' | 'Private'
}

export interface ChatMessageDto {
    id: number
    chatId: number
    message: string
    authorId: number | null
    /** @default false */
    isServer: boolean
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface ChatDto {
    id: number
    opponents: number[]
    type: object
    providerRequestId: number | null
    messages?: ChatMessageDto[]
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface FavouritesCreateDto {
    providerId: number
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this horeca-request */
    secure?: boolean
    /** horeca-request path */
    path: string
    /** content type of horeca-request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat
    /** horeca-request body */
    body?: unknown
    /** base url */
    baseUrl?: string
    /** horeca-request cancellation token */
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
         * @horeca-request POST:/api/uploads
         * @secure
         */
        uploadsControllerUpload: (
            data: {
                /** @format binary */
                file?: File
            },
            params: RequestParams = {}
        ) =>
            this.request<UploadDto, any>({
                path: `/api/uploads`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.FormData,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Uploads
         * @name UploadsControllerRead
         * @horeca-request GET:/api/uploads/{id}
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
         * @horeca-request DELETE:/api/uploads/{id}
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
         * @horeca-request PUT:/api/users/me
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
         * @horeca-request GET:/api/users/me
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
         * @horeca-request POST:/api/auth/registration
         */
        authorizationControllerRegistrate: (
            data: RegistrateUserDto,
            params: RequestParams = {}
        ) =>
            this.request<UserDto, ErrorDto>({
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
         * @horeca-request POST:/api/auth/login
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
         * @horeca-request GET:/api/auth/activate/{uuid}
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
         * @tags HorecaRequests
         * @name HorecaRequestsControllerCreate
         * @summary Create products(categories) set proposal required for HoReCa
         * @horeca-request POST:/api/horeca/requests
         * @secure
         */
        horecaRequestsControllerCreate: (
            data: HorecaRequestCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<HorecaRequestDto, ErrorDto>({
                path: `/api/horeca/requests`,
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
         * @tags HorecaRequests
         * @name HorecaRequestsControllerFindAll
         * @summary All Horeca requests
         * @horeca-request GET:/api/horeca/requests
         * @secure
         */
        horecaRequestsControllerFindAll: (
            query?: {
                offset?: number
                limit?: number
                search?: string
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: HorecaRequestDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/horeca/requests`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags HorecaRequests
         * @name HorecaRequestsControllerGet
         * @summary Get Horeca horeca-request with Provider's requests to compare
         * @horeca-request GET:/api/horeca/requests/{id}
         * @secure
         */
        horecaRequestsControllerGet: (id: number, params: RequestParams = {}) =>
            this.request<HorecaRequestWithProviderRequestDto, ErrorDto>({
                path: `/api/horeca/requests/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags HorecaRequests
         * @name HorecaRequestsControllerApproveProviderRequest
         * @summary Approve one of providers horeca-request to be able to start chat with
         * @horeca-request POST:/api/horeca/requests/approve
         * @secure
         */
        horecaRequestsControllerApproveProviderRequest: (
            data: HorecaRequestApproveProviderRequestDto,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/horeca/requests/approve`,
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
         * @tags HorecaRequests Template
         * @name HorecaRequestsTemplateControllerCreateTemplate
         * @summary Create template of products(categories) set proposal required for HoReCa to use later
         * @horeca-request POST:/api/horeca/requests/template
         * @secure
         */
        horecaRequestsTemplateControllerCreateTemplate: (
            data: HorecaRequestTemplateCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<HorecaRequestTemplateDto, ErrorDto>({
                path: `/api/horeca/requests/template`,
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
         * @tags HorecaRequests Template
         * @name HorecaRequestsTemplateControllerGetTemplate
         * @summary Get template of products(categories) set proposal required for HoReCa
         * @horeca-request GET:/api/horeca/requests/template/{id}
         * @secure
         */
        horecaRequestsTemplateControllerGetTemplate: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<HorecaRequestTemplateDto, ErrorDto>({
                path: `/api/horeca/requests/template/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ProviderRequests
         * @name ProviderRequestsControllerFindForProvider
         * @summary List of HoReCa proposals that matches with provider's offers
         * @horeca-request GET:/api/provider/requests/income
         * @secure
         */
        providerRequestsControllerFindForProvider: (
            query?: {
                offset?: number
                limit?: number
                search?: string
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: HorecaRequestDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/provider/requests/income`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ProviderRequests
         * @name ProviderRequestsControllerSetStatus
         * @summary Hide or view income horeca-request
         * @horeca-request POST:/api/provider/requests/income/status
         * @secure
         */
        providerRequestsControllerSetStatus: (
            data: HorecaRequestProviderStatusDto,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/provider/requests/income/status`,
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
         * @tags ProviderRequests
         * @name ProviderRequestsControllerCreate
         * @summary Create provider horeca-request on horeca's one
         * @horeca-request POST:/api/provider/requests
         * @secure
         */
        providerRequestsControllerCreate: (
            data: ProviderRequestCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<ProviderRequestDto, ErrorDto>({
                path: `/api/provider/requests`,
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
         * @tags ProviderRequests
         * @name ProviderRequestsControllerFindAll
         * @summary Get all provider requests
         * @horeca-request GET:/api/provider/requests
         * @secure
         */
        providerRequestsControllerFindAll: (
            query?: {
                offset?: number
                limit?: number
                search?: string
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: HorecaRequestDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/provider/requests`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Products
         * @name ProductsControllerCreate
         * @summary Create product from provider's offer
         * @horeca-request POST:/api/products/provider
         * @secure
         */
        productsControllerCreate: (
            data: ProductCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<ProductDto, ErrorDto>({
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
         * @name ProductsControllerFindAll
         * @summary Gat all products from provider's offer
         * @horeca-request GET:/api/products/provider
         * @secure
         */
        productsControllerFindAll: (
            query?: {
                offset?: number
                limit?: number
                search?: ProductSearchDto
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: ProductDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/products/provider`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Products
         * @name ProductsControllerGet
         * @summary Get the specific product
         * @horeca-request GET:/api/products/provider/{id}
         * @secure
         */
        productsControllerGet: (id: number, params: RequestParams = {}) =>
            this.request<ProductDto, ErrorDto>({
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
         * @name ProductsControllerUpdate
         * @summary Update the specific product
         * @horeca-request PUT:/api/products/provider/{id}
         * @secure
         */
        productsControllerUpdate: (
            id: number,
            data: ProductUpdateDto,
            params: RequestParams = {}
        ) =>
            this.request<ProductDto, ErrorDto>({
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
         * @name ProductsControllerDelete
         * @summary Delete the specific product
         * @horeca-request DELETE:/api/products/provider/{id}
         * @secure
         */
        productsControllerDelete: (id: number, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/products/provider/${id}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Chats
         * @name ChatsControllerCreateChat
         * @summary Creates chat
         * @horeca-request POST:/api/chats
         * @secure
         */
        chatsControllerCreateChat: (
            data: ChatCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<ChatDto, ErrorDto>({
                path: `/api/chats`,
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
         * @tags Chats
         * @name ChatsControllerFindAll
         * @summary Get all chats
         * @horeca-request GET:/api/chats
         * @secure
         */
        chatsControllerFindAll: (
            query?: {
                offset?: number
                limit?: number
                search?: string
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: ChatDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/chats`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Chats
         * @name ChatsControllerGetChat
         * @summary Get chat
         * @horeca-request GET:/api/chats/{id}
         * @secure
         */
        chatsControllerGetChat: (
            id: number,
            query?: {
                offset?: number
                limit?: number
                search?: string
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: ChatDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/chats/${id}`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Favourites
         * @name FavouritesControllerCreate
         * @summary Add provider in favourites to be able to chat
         * @horeca-request POST:/api/horeca/favourites
         * @secure
         */
        favouritesControllerCreate: (
            data: FavouritesCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/horeca/favourites`,
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
         * @tags Favourites
         * @name FavouritesControllerGet
         * @summary Delete provider from favourites
         * @horeca-request DELETE:/api/horeca/favourites/{providerId}
         * @secure
         */
        favouritesControllerGet: (
            providerId: number,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/horeca/favourites/${providerId}`,
                method: 'DELETE',
                secure: true,
                format: 'json',
                ...params,
            }),
    }
}
