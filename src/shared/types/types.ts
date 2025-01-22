import { SupportRequestStatus } from '@/shared/lib/horekaApi/Api'

export type Image = {
    createdAt: string
    id: number
    name: string
    updatedAt: string
}

export type ImageUploadResultDto = {
    data: Image
}

export const StatusType: Record<SupportRequestStatus, string> = {
    [SupportRequestStatus.Active]: 'Активный',
    [SupportRequestStatus.Default]: 'Не просмотрен',
    [SupportRequestStatus.Resolved]: 'Завершен',
}
