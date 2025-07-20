import { ProfileType } from '@/shared/lib/horekaApi/Api'

export const applications = [
    {
        label: 'Ожидают откликов',
        role: ProfileType.Horeca,
        status: 'PENDING',
    },
    {
        label: 'В работе',
        role: ProfileType.Provider,
        status: 'ACTIVE',
    },
    {
        label: 'Завершённые',
        status: 'FINISHED',
    },
    {
        label: 'Завершённые неуспешно',
        status: 'CompletedUnsuccessfully',
    },
]
