import { ProfileType } from '@/shared/lib/horekaApi/Api'

export const applications = [
    {
        label: 'Все заявки',
        role: ProfileType.Provider,
    },
    {
        label: 'Текущие заявки',
        role: ProfileType.Horeca,
    },
    {
        label: "Завершённые заявки"
    }
]
