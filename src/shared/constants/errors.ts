import { ErrorDto } from '@/shared/lib/horekaApi/Api'

export const errors: Record<NonNullable<ErrorDto['errorMessage']>, string> = {
    AUTH_FAIL: 'Authentication failed',
    PASSWORD_CHANGE_ERROR: 'Password change failed',
    GDPR_IS_NOT_APPROVED: 'GDPR is not approved',
    USER_ALREADY_EXISTS: 'User already exists',
    MAIL_IS_BUSY: 'Mail is busy. Please try different Email.',
    USER_DOES_NOT_EXISTS: 'User does not exist',
    ITEM_NOT_FOUND: 'Item not found',
}
