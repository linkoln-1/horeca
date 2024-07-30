import {
    IconCalendarClock,
    IconLayoutBoardSplit,
    IconLayoutList,
    IconQuestionMark,
    IconSettings,
    IconShoppingCart,
} from '@tabler/icons-react'

export const menuList = [
    {
        id: 1,
        name: 'История заявок',
        icon: IconCalendarClock,
        description: 'История ваших предложений и чаты с покупателями',
        link: '/user/warning',
        button: 'Перейти к предложениям',
    },
    {
        id: 2,
        name: 'Входящие заявки',
        icon: IconLayoutList,
        description: 'Вы можете откликаться на любые заявки!',
        link: '/user/products/applications',
        button: 'Перейти к заявкам',
    },
    {
        id: 3,
        name: 'Мой каталог',
        icon: IconLayoutBoardSplit,
        description: 'Предложите ваши товары всему общепиту на площадке!',
        link: '/user/catalog',
    },
    {
        id: 4,
        name: 'Реклама',
        icon: IconShoppingCart,
        description: 'Здесь можно купить рекламу на площадке',
        link: '/user/advertising/advertisement',
    },
    {
        id: 5,
        name: 'Служба заботы',
        icon: IconQuestionMark,
        description: 'У вас пока нет ни одного запроса к нам',
        link: '/user/service',
    },
    {
        id: 6,
        name: 'Настройки',
        icon: IconSettings,
        description:
            'Вы можете изменить условия доставки и категории товара, по которым принимаете заявки',
        link: '/user/settings/edit',
    },
]
