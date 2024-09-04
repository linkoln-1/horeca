import {
    IconChecklist,
    IconFilePencil,
    IconLayout2Filled,
    IconTablePlus,
    IconHelpSquareRounded,
    IconSettings,
} from '@tabler/icons-react'

export const horecaMenu = [
    {
        id: 1,
        name: 'Мои заявки',
        icon: IconChecklist,
        description: 'История ваших заявок и чат с поставщиками',
        link: '/applications',
        button: 'Перейти к заказам',
    },
    {
        id: 2,
        name: 'Сделать запрос',
        icon: IconFilePencil,
        description:
            'Если хотите найти редкий товар или собрать эксклюзивные предложения поставщиков',
        link: '/create/request',
        button: 'Перейти к запросу',
    },
    {
        id: 3,
        name: 'Избранные поставщики',
        icon: IconLayout2Filled,
        description: 'Все поставщики находятся в одном месте',
        link: '/favorite/provider',
    },
    {
        id: 4,
        name: 'Шаблоны',
        icon: IconTablePlus,
        description: 'Заполните матрицу и сравнивайте цены прямо внутри',
        link: '/template/application',
    },
    {
        id: 5,
        name: 'Личный помощник',
        icon: IconHelpSquareRounded,
        description:
            'Здесь вы можете следить за минимальным остатком и планировать закупки',
        subDescription: 'В разработке',
        link: '/assistant',
    },
    {
        id: 6,
        name: 'Настройки',
        icon: IconSettings,
        description:
            'Здесь вы можете изменить условия приемки и контактный номер',
        link: '/settings/edit',
    },
]
