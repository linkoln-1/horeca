type NestedObject<T> = {
    [K in keyof T]: T[K] extends string
        ? string
        : T[K] extends object
          ? NestedObject<T[K]>
          : never
}

export type LanguagePack = NestedObject<typeof en>

const en = {}

export default en
