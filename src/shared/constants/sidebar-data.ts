import { FC } from 'react'

import { BadgeProps } from '@mantine/core'
import {
    IconChecklist,
    IconFilePencil,
    IconHelpSquareRounded,
    IconLayout2Filled,
    IconSettings,
    IconTablePlus,
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
}

type SidebarDividerItem = {
    type: 'divider'
}

type SidebarItem = SidebarLinkItem | SidebarDividerItem

export const sidebarData: SidebarItem[] = [
    {
        id: 1,
        type: 'link',
        label: 'Создать заявку',
        icon: IconFilePencil,
        description:
            'Если хотите найти редкий товар или собрать эксклюзивные предложения поставщиков',
        link: '/create/request',
        button: 'Перейти к запросу',
    },
    {
        id: 2,
        type: 'link',
        label: 'Мои заявки',
        icon: IconChecklist,
        description: 'История ваших заявок и чат с поставщиками',
        link: '/applications',
        button: 'Перейти к заказам',
    },
    {
        id: 3,
        type: 'link',
        label: 'Избранные поставщики',
        icon: IconLayout2Filled,
        description: 'Все поставщики находятся в одном месте',
        link: '/favorite/provider',
    },
    { type: 'divider' },
    {
        id: 4,
        type: 'link',
        label: 'Шаблоны моих заявок',
        icon: IconTablePlus,
        description: 'Заполните матрицу и сравнивайте цены прямо внутри',
        link: '/template/application',
    },
    {
        id: 5,
        type: 'link',
        label: 'Настройки профиля',
        icon: IconSettings,
        description:
            'Здесь вы можете изменить условия приемки и контактный номер',
        link: '/settings/edit',
    },
    {
        id: 6,
        type: 'link',
        label: 'Служба заботы',
        icon: IconHelpSquareRounded,
        description:
            'Здесь вы можете следить за минимальным остатком и планировать закупки',
        subDescription: 'В разработке',
        link: '/assistant',
    },
]
