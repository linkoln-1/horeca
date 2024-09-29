export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone)
}
function validateAddress(address: string): string {
    const addressRegex = /^[^,]+,\s*[^,]+,\s*\d+$/

    return addressRegex.test(address)
        ? ''
        : 'Адрес должен быть в формате: город, улица, дом номер'
}

export function validateAddresses(addresses: any[]): Record<string, string> {
    const errors: Record<string, string> = {}
    addresses.forEach((address, index) => {
        const error = validateAddress(address.address)
        if (error) {
            errors[`profile.addresses.${index}.address`] =
                `Ошибка в адресе №${index + 1}: ${error}`
        }
    })
    return errors
}
