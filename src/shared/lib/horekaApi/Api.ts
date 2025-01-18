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

export interface UpdateUserDto {
    name?: string
    email?: string
    phone?: string
    password?: string
    repeatPassword?: string
    profile?: CreateHorecaProfileDto | CreateProviderProfileDto
}

export enum UserRole {
    Admin = 'Admin',
    Horeca = 'Horeca',
    Provider = 'Provider',
}

export interface UserDto {
    role: UserRole
    profile: HorecaProfileDto | ProviderProfileDto
    id: number
    name: string
    tin: string
    email: string
    phone: string
    password: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    activationLink: string
    isActivated: boolean
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
        | 'UPLOAD_NOT_FOUND'
        | 'ACTIVATION_LINK_ERROR'
        | 'INVALID_QUERY_STRING'
        | 'FORBIDDEN_ACTION'
        | 'TEMPLATE_DOES_NOT_EXISTS'
        | 'VALIDATION_ERROR'
    /** @example ["password|IS_NOT_EMPTY"] */
    message?: any[][]
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
    FrozenVegetablesAndFruits = 'frozenVegetablesAndFruits',
    TextilesAndClothing = 'textilesAndClothing',
    Equipment = 'equipment',
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

export interface HorecaRequestTemplateCreateDto {
    name: string
    content: HorecaRequestCreateDto
}

export interface HorecaRequestTemplateDto {
    id: number
    name: string
    userId: number
    content: object
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface HorecaRequestUpdateDto {
    /** @minItems 1 */
    items?: HorecaRequestItemCreateDto[]
    /** @default [] */
    imageIds?: number[]
    address?: string
    /** @format date-time */
    deliveryTime?: string
    /** @format date-time */
    acceptUntill?: string
    paymentType?: 'Prepayment' | 'Deferment' | 'PaymentUponDelivery'
    name?: string
    phone?: string
    comment?: string
}

export interface HorecaRequestTemplateUpdateDto {
    name: string
    content: HorecaRequestUpdateDto
}

export interface PaginatedDto {
    /** Data items */
    data: any[]
    /** Total number of items */
    total: number
}

export enum PaymentType {
    Prepayment = 'Prepayment',
    Deferment = 'Deferment',
    PaymentUponDelivery = 'PaymentUponDelivery',
}

export enum HorecaRequestStatus {
    Pending = 'Pending',
    Active = 'Active',
    CompletedSuccessfully = 'CompletedSuccessfully',
    CompletedUnsuccessfully = 'CompletedUnsuccessfully',
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
    paymentType: PaymentType
    status: HorecaRequestStatus
    id: number
    userId: number
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    name: string
    phone: string
    items: HorecaRequestItemDto[]
    comment: string
    reviewNotificationSent: boolean
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
    horecaRequest?: HorecaRequestDto
    horecaRequestId: number
    comment: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    chatId: number | null
    items: ProviderRequestItemDto[]
    status: object
}

export interface HorecaRequestWithProviderRequestDto {
    paymentType: PaymentType
    status: HorecaRequestStatus
    id: number
    userId: number
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    name: string
    phone: string
    items: HorecaRequestItemDto[]
    comment: string
    reviewNotificationSent: boolean
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    images?: UploadDto[]
    providerRequests: HRProviderRequestDto[]
}

export interface HorecaRequestSearchDto {
    status: HorecaRequestStatus
}

export interface HorecaRequestSetStatusDto {
    horecaRequestId: number
    providerRequestId: number
}

export interface NotificationPayload {
    data:
        | ReviewNotificationPayload
        | ProviderRequestCreatedNotificationPayload
        | ProviderRequestStatusChangedNotificationPayload
        | ProviderAddedToFavouritesNotificationPayload
        | ProviderDeletedFromFavouritesNotificationPayload
}

export interface ReviewNotificationPayload {
    hRequestId: number
    pRequestId: number
    chatId: number
}

export interface ProviderRequestCreatedNotificationPayload {
    hRequestId: number
    pRequestId: number
}

export interface ProviderRequestStatusChangedNotificationPayload {
    pRequestId: number
    hRequestId: number
    status: HorecaRequestStatus
}

export interface ProviderAddedToFavouritesNotificationPayload {
    horecaId: number
}

export interface ProviderDeletedFromFavouritesNotificationPayload {
    horecaId: number
}

export interface ChatCreateDto {
    opponentId: number
    /** Required when type Order */
    providerRequestId?: number
    /** Required when type Order */
    horecaRequestId?: number
    /** Required when type Private */
    horecaFavouriteId?: number
    /** Required when type Support */
    supportRequestId?: number
    type: 'Support' | 'Order' | 'Private'
}

export enum ChatType {
    Support = 'Support',
    Order = 'Order',
    Private = 'Private',
}

export interface ChatMessageDto {
    id: number
    chatId: number
    message: string
    authorId: number | null
    /** @default false */
    isServer: boolean
    /** @default false */
    opponentViewed: boolean
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface ChatDto {
    opponents: number[]
    type: ChatType
    id: number
    messages: ChatMessageDto[]
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export enum ProviderRequestStatus {
    Pending = 'Pending',
    Active = 'Active',
    Canceled = 'Canceled',
    Finished = 'Finished',
}

export interface ChatProviderRequestReviewDto {
    id: number
    userId: number
    isDelivered: number
    isSuccessfully: number
    providerRequestId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface ChatHorecaRequestDto {
    paymentType: PaymentType
    status: HorecaRequestStatus
    id: number
    userId: number
    address: string
    /** @format date-time */
    deliveryTime: string
    /** @format date-time */
    acceptUntill: string
    comment: string
    name: string
    phone: string
    reviewNotificationSent: boolean
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface ChatProviderRequestDto {
    status: ProviderRequestStatus
    id: number
    comment: string
    userId: number
    horecaRequestId: number
    chatId: number
    providerRequestReview?: ChatProviderRequestReviewDto
    horecaRequest: ChatHorecaRequestDto
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface ChatHorecaFavouritesDto {
    id: number
    userId: number
    providerId: number
    chatId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export enum SupportRequestStatus {
    Default = 'Default',
    Active = 'Active',
    Resolved = 'Resolved',
}

export interface ChatSupportRequestDto {
    status: SupportRequestStatus
    id: number
    userId: number
    content: string
    adminId: number
    chatId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface ChatFullDto {
    opponents: number[]
    type: ChatType
    id: number
    providerRequest?: ChatProviderRequestDto
    horecaFavourites?: ChatHorecaFavouritesDto
    supportRequest?: ChatSupportRequestDto
    messages: ChatMessageDto[]
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface WsMessageCreateDto {
    chatId: number
    message: string
    authorId: number
}

export interface FavouritesCreateDto {
    providerId: number
}

export interface FavouritesUserDto {
    name: string
}

export interface FavouritesDto {
    providerId: number
    id: number
    userId: number
    chatId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    user: FavouritesUserDto
    provider: FavouritesUserDto
}

export interface SupportRequestCreateDto {
    content?: string
}

export interface SupportRequestDto {
    status: SupportRequestStatus
    id: number
    userId: number
    content: string | null
    adminId: number | null
    chatId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface SupportRequestSearchDto {
    status: SupportRequestStatus
    isNew?: boolean
}

export interface ProviderHorecaRequestSearchDto {
    /** @default false */
    includeHiddenAndViewed?: boolean
    category?: Categories
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
    /** @minItems 1 */
    items: ProviderRequestItemCreateDto[]
}

export interface ProviderRequestDto {
    id: number
    userId: number
    horecaRequest?: HorecaRequestDto
    horecaRequestId: number
    comment: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
    chatId: number | null
    items: ProviderRequestItemDto[]
    status: object
}

export interface ProviderRequestSearchDto {
    status: ProviderRequestStatus
}

export interface ProductCreateDto {
    category: Categories
    name: string
    description: string
    producer: string
    cost: number
    count: number
    packagingType: string
    imageIds: number[]
}

export interface ProductDto {
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
        | 'frozenVegetablesAndFruits'
        | 'textilesAndClothing'
        | 'equipment'
    name: string
    description: string
    producer: string
    cost: number
    count: number
    packagingType: string | null
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
        | 'frozenVegetablesAndFruits'
        | 'textilesAndClothing'
        | 'equipment'
}

export interface ProductUpdateDto {
    category: Categories
    name: string
    description: string
    producer: string
    cost: number
    count: number
    packagingType: string
    imageIds: number[]
}

export interface ReviewCreateDto {
    isDelivered: 0 | 1
    isSuccessfully: 0 | 1
    providerRequestId: number
}

export interface ReviewDto {
    id: number
    userId: number
    isDelivered: number
    isSuccessfully: number
    providerRequestId: number
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export interface HorecaRequestCreatePrivateDto {
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
    providerId: number
}

export interface HorecaPrivateRequestDto {
    horecaRequestId: number
    providerRequestId: number
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
         * @tags HorecaRequests Template
         * @name HorecaRequestsTemplateControllerCreate
         * @summary Create template of products(categories) set proposal required for HoReCa to use later
         * @request POST:/api/horeca/requests/templates
         * @secure
         */
        horecaRequestsTemplateControllerCreate: (
            data: HorecaRequestTemplateCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<HorecaRequestTemplateDto, ErrorDto>({
                path: `/api/horeca/requests/templates`,
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
         * @name HorecaRequestsTemplateControllerFindAll
         * @summary Get all templates
         * @request GET:/api/horeca/requests/templates
         * @secure
         */
        horecaRequestsTemplateControllerFindAll: (
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
                    data: HorecaRequestTemplateDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/horeca/requests/templates`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags HorecaRequests Template
         * @name HorecaRequestsTemplateControllerFind
         * @summary Get template of products(categories) set proposal required for HoReCa
         * @request GET:/api/horeca/requests/templates/{id}
         * @secure
         */
        horecaRequestsTemplateControllerFind: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<HorecaRequestTemplateDto, ErrorDto>({
                path: `/api/horeca/requests/templates/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags HorecaRequests Template
         * @name HorecaRequestsTemplateControllerUpdate
         * @summary Update template
         * @request PUT:/api/horeca/requests/templates/{id}
         * @secure
         */
        horecaRequestsTemplateControllerUpdate: (
            id: number,
            data: HorecaRequestTemplateUpdateDto,
            params: RequestParams = {}
        ) =>
            this.request<HorecaRequestTemplateDto, ErrorDto>({
                path: `/api/horeca/requests/templates/${id}`,
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
         * @tags HorecaRequests Template
         * @name HorecaRequestsTemplateControllerDelete
         * @summary Delete template
         * @request DELETE:/api/horeca/requests/templates/{id}
         * @secure
         */
        horecaRequestsTemplateControllerDelete: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/horeca/requests/templates/${id}`,
                method: 'DELETE',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags HorecaRequests
         * @name HorecaRequestsControllerCreate
         * @summary Create products(categories) set proposal needed for HoReCa
         * @request POST:/api/horeca/requests
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
         * @request GET:/api/horeca/requests
         * @secure
         */
        horecaRequestsControllerFindAll: (
            query?: {
                offset?: number
                limit?: number
                search?: HorecaRequestSearchDto
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
         * @summary Get Horeca request with Provider's requests to compare
         * @request GET:/api/horeca/requests/{id}
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
         * @summary Approve one of providers request to be able to start chat with
         * @request POST:/api/horeca/requests/approve
         * @secure
         */
        horecaRequestsControllerApproveProviderRequest: (
            data: HorecaRequestSetStatusDto,
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
         * @tags HorecaRequests
         * @name HorecaRequestsControllerCancelProviderRequest
         * @summary Cancel earlier chosen provider request
         * @request POST:/api/horeca/requests/cancelProviderRequest
         * @secure
         */
        horecaRequestsControllerCancelProviderRequest: (
            data: HorecaRequestSetStatusDto,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/horeca/requests/cancelProviderRequest`,
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
         * @name HorecaRequestsControllerCancel
         * @summary Cancel horeca request
         * @request GET:/api/horeca/requests/{id}/cancel
         * @secure
         */
        horecaRequestsControllerCancel: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/horeca/requests/${id}/cancel`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags WS
         * @name NotificationControllerGet
         * @request GET:/api/notifications
         * @secure
         */
        notificationControllerGet: (params: RequestParams = {}) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/notifications`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Chats
         * @name ChatsControllerCreateChat
         * @summary Creates chat
         * @request POST:/api/chats
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
         * @request GET:/api/chats
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
         * @request GET:/api/chats/{id}
         * @secure
         */
        chatsControllerGetChat: (id: number, params: RequestParams = {}) =>
            this.request<ChatFullDto, ErrorDto>({
                path: `/api/chats/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Chats
         * @name ChatsMessageControllerGetChatMessages
         * @summary Get chat messages
         * @request GET:/api/messages
         * @secure
         */
        chatsMessageControllerGetChatMessages: (
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
                    data: ChatMessageDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/messages`,
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
         * @name ChatsMessageControllerViewMessage
         * @summary Mark message viewed
         * @request PUT:/api/messages/{id}/view
         * @secure
         */
        chatsMessageControllerViewMessage: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, ErrorDto>({
                path: `/api/messages/${id}/view`,
                method: 'PUT',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Favourites
         * @name FavouritesControllerCreate
         * @summary Add provider in favourites to be able to chat
         * @request POST:/api/horeca/favourites
         * @secure
         */
        favouritesControllerCreate: (
            data: FavouritesCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<FavouritesDto, ErrorDto>({
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
         * @name FavouritesControllerFindAll
         * @summary Get all favourite providers/horecas
         * @request GET:/api/horeca/favourites
         * @secure
         */
        favouritesControllerFindAll: (
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
                    data: FavouritesDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/horeca/favourites`,
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
         * @name FavouritesControllerDelete
         * @summary Delete provider from favourites
         * @request DELETE:/api/horeca/favourites/{providerId}
         * @secure
         */
        favouritesControllerDelete: (
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

        /**
         * No description
         *
         * @tags SupportRequest
         * @name SupportRequestsControllerCreate
         * @summary Creates request to support
         * @request POST:/api/support/requests
         * @secure
         */
        supportRequestsControllerCreate: (
            data: SupportRequestCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<SupportRequestDto, ErrorDto>({
                path: `/api/support/requests`,
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
         * @tags SupportRequest
         * @name SupportRequestsAdminControllerList
         * @summary Admin get list of all support requests
         * @request GET:/api/support/requests
         * @secure
         */
        supportRequestsAdminControllerList: (
            query?: {
                offset?: number
                limit?: number
                search?: SupportRequestSearchDto
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: SupportRequestDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/support/requests`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags SupportRequest
         * @name SupportRequestsControllerResolve
         * @summary Marks request to support as resolved
         * @request POST:/api/support/requests/{id}/resolve
         * @secure
         */
        supportRequestsControllerResolve: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/support/requests/${id}/resolve`,
                method: 'POST',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags SupportRequest
         * @name SupportRequestsControllerList
         * @summary List of users's support requests
         * @request GET:/api/support/requests/mine
         * @secure
         */
        supportRequestsControllerList: (
            query?: {
                offset?: number
                limit?: number
                search?: SupportRequestSearchDto
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: SupportRequestDto[]
                    total: number
                },
                ErrorDto
            >({
                path: `/api/support/requests/mine`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags SupportRequest
         * @name SupportRequestsAdminControllerAssignAdmin
         * @summary Admin assigns himself to customer support request
         * @request POST:/api/support/requests/{id}/assign
         * @secure
         */
        supportRequestsAdminControllerAssignAdmin: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<SuccessDto, ErrorDto>({
                path: `/api/support/requests/${id}/assign`,
                method: 'POST',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ProviderRequests
         * @name ProviderRequestsControllerIncomeHorecaRequests
         * @summary List of HoReCa proposals that matches with provider's offers
         * @request GET:/api/provider/requests/income
         * @secure
         */
        providerRequestsControllerIncomeHorecaRequests: (
            query?: {
                offset?: number
                limit?: number
                search?: ProviderHorecaRequestSearchDto
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
         * @name ProviderRequestsControllerSetStatusForIncomeHorecaRequest
         * @summary Hide or view income request
         * @request POST:/api/provider/requests/income/status
         * @secure
         */
        providerRequestsControllerSetStatusForIncomeHorecaRequest: (
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
         * @summary Create provider request on horeca's one
         * @request POST:/api/provider/requests
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
         * @request GET:/api/provider/requests
         * @secure
         */
        providerRequestsControllerFindAll: (
            query?: {
                offset?: number
                limit?: number
                search?: ProviderRequestSearchDto
                /** fieldName(numeric)|ASC/DESC */
                sort?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    data: ProviderRequestDto[]
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
         * @tags ProviderRequests
         * @name ProviderRequestsControllerGet
         * @summary Get provider request
         * @request GET:/api/provider/requests/{id}
         * @secure
         */
        providerRequestsControllerGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<ProviderRequestDto, ErrorDto>({
                path: `/api/provider/requests/${id}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ProviderRequests
         * @name ProviderRequestsControllerCancel
         * @summary Cancel request
         * @request PUT:/api/provider/requests/{id}
         * @secure
         */
        providerRequestsControllerCancel: (
            id: number,
            data: ProviderRequestCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<ProviderRequestDto, ErrorDto>({
                path: `/api/provider/requests/${id}`,
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
         * @name ProductsControllerCreate
         * @summary Create product from provider's offer
         * @request POST:/api/products/provider
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
         * @request GET:/api/products/provider
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
         * @request GET:/api/products/provider/{id}
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
         * @request PUT:/api/products/provider/{id}
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
         * @request DELETE:/api/products/provider/{id}
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
         * @tags Reviews
         * @name ReviewsControllerCreate
         * @summary Create review on succesfully finished provider request
         * @request POST:/api/reviews/horeca
         * @secure
         */
        reviewsControllerCreate: (
            data: ReviewCreateDto,
            params: RequestParams = {}
        ) =>
            this.request<ReviewDto, ErrorDto>({
                path: `/api/reviews/horeca`,
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
         * @tags HorecaPrivateRequests
         * @name HorecaPrivateRequestsControllerCreatePrivate
         * @summary Create products(categories) set proposal needed for HoReCa and send to the favourite provider
         * @request POST:/api/horeca/requests/private
         * @secure
         */
        horecaPrivateRequestsControllerCreatePrivate: (
            data: HorecaRequestCreatePrivateDto,
            params: RequestParams = {}
        ) =>
            this.request<HorecaPrivateRequestDto, ErrorDto>({
                path: `/api/horeca/requests/private`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),
    }
}
