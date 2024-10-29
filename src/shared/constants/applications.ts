import { ProfileType } from '@/shared/lib/horekaApi/Api'

export const applications = [
    {
        label: 'В работе',
        role: ProfileType.Provider,
    },
    {
        label: 'Ожидают откликов',
        role: ProfileType.Horeca,
    },
    {
        label: "Завершённые"
    }
]
