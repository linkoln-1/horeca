export function maxLength(max: number, error: string) {
    return (value: string) => (value.length > max ? error : null)
}

export function minLength(min: number, error: string) {
    return (value: string) => (value.length < min ? error : null)
}

export function max(max: number, error: string) {
    return (value: number) => (value > max ? error : null)
}
export function min(min: number, error: string) {
    return (value: number) => (value < min ? error : null)
}

export function requiredValidate<T>(error: string) {
    return (value: T) => {
        if (typeof value === 'string' && value.trim() === '') {
            return error
        }
        if (!value) return error
        return null
    }
}

export function isValid<T>(
    validations: Array<(value: T) => string | null>,
    value: T
) {
    for (const validate of validations) {
        const error = validate(value)
        if (error) {
            return error
        }
    }
    return null
}
