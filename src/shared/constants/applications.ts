import { ProfileType } from '@/shared/lib/horekaApi/Api'

export const applications = [
    {
        label: 'В работе',
        role: ProfileType.Provider,
        status: 'ACTIVE',
    },
    {
        label: 'Ожидают откликов',
        role: ProfileType.Horeca,
        status: 'PENDING',
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
