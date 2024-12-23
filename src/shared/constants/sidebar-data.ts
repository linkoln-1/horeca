import { FC } from 'react'

import { BadgeProps } from '@mantine/core'
import {
    IconCalendarClock,
    IconChecklist,
    IconFilePencil,
    IconHelpSquareRounded,
    IconLayout2Filled,
    IconLayoutBoardSplit,
    IconLayoutList,
    IconSettings,
    IconTablePlus,
    IconHeart,
    IconMail,
} from '@tabler/icons-react'

type SidebarLinkItem = {
    id: number
    type: 'link'
    icon: FC
    label: string
    link?: string
    badge?: FC<BadgeProps>
    button?: string
    description: string
    subDescription?: string
    iconRight?: FC
    match?: string[]
}

type SidebarDividerItem = {
    type: 'divider'
}

type SidebarItem = SidebarLinkItem | SidebarDividerItem

export const horecaSidebarData: SidebarItem[] = [
    {
        id: 1,
        type: 'link',
        label: 'Мои заявки',
        icon: IconChecklist,
        description: 'История ваших заявок и чат с поставщиками',
        link: '/applications',
        button: 'Перейти к заказам',
        iconRight: IconMail,
    },
    {
        id: 2,
        type: 'link',
        label: 'Создать заявку',
        icon: IconFilePencil,
        description:
            'Если хотите найти редкий товар или собрать эксклюзивные предложения поставщиков',
        link: '/create/request',
        button: 'Перейти к запросу',
    },
    {
        id: 3,
        type: 'link',
        label: 'Избранные поставщики',
        icon: IconLayout2Filled,
        description: 'Все поставщики находятся в одном месте',
        link: '/favorite/provider',
        iconRight: IconMail,
    },
    { type: 'divider' },
    {
        id: 4,
        type: 'link',
        label: 'Шаблоны моих заявок',
        icon: IconTablePlus,
        description: 'Заполните матрицу и сравнивайте цены прямо внутри',
        link: '/template/application',
        match: ['/template/edit'],
    },
    {
        id: 5,
        type: 'link',
        label: 'Настройки профиля',
        icon: IconSettings,
        description:
            'Здесь вы можете изменить условия приемки и контактный номер',
        link: '/settings/edit',
        match: ['/settings/product-acceptance-terms'],
    },
    {
        id: 6,
        type: 'link',
        label: 'Служба заботы',
        icon: IconHelpSquareRounded,
        description:
            'Здесь вы можете следить за минимальным остатком и планировать закупки',
        subDescription: 'В разработке',
        link: '/support',
        iconRight: IconMail,
    },
]

export const providerSidebarData: SidebarItem[] = [
    {
        id: 1,
        type: 'link',
        label: 'Входящие заявки',
        icon: IconLayoutList,
        description: 'Вы можете откликаться на любые заявки!',
        link: '/products/applications',
        button: 'Перейти к заявкам',
        iconRight: IconMail,
    },
    {
        id: 2,
        type: 'link',
        label: 'История заявок',
        icon: IconCalendarClock,
        description: 'История ваших предложений и чаты с покупателями',
        link: '/requests',
        button: 'Перейти к предложениям',
        iconRight: IconMail,
    },
    {
        id: 3,
        type: 'link',
        label: 'Мой каталог',
        icon: IconLayoutBoardSplit,
        description: 'Предложите ваши товары всему общепиту на площадке!',
        link: '/catalog',
    },

    { type: 'divider' },

    {
        id: 4,
        type: 'link',
        label: 'Постоянные клиенты',
        icon: IconHeart,
        description: 'Здесь можно купить рекламу на площадке',
        link: '/advertising/advertisement',
        iconRight: IconMail,
    },
    {
        id: 5,
        type: 'link',
        label: 'Настройки профиля',
        icon: IconSettings,
        description:
            'Вы можете изменить условия доставки и категории товара, по которым принимаете заявки',
        link: '/settings/edit',
    },
    {
        id: 6,
        type: 'link',
        label: 'Служба заботы',
        icon: IconHelpSquareRounded,
        description: 'У вас пока нет ни одного запроса к нам',
        subDescription: 'В разработке',
        link: '/support',
        iconRight: IconMail,
    },
]
