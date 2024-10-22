export type Info = {
    category: string
    name: string
    price: string
    manufacturer?: string
    deliveryAddres: string
    deliveryDate: string
    deliveryMethod?: string
}

export type HistoryItem = {
    id: number
    number: number
    data: string
    text: string
    title: string
    info: Info
    infoData: Info
    commentary?: string
}

export const requestsOne: HistoryItem[] = [
    {
        id: 1,
        number: 524252,
        data: '20.06.2023',
        text: 'В работе (1 новое сообщение в чате)',
        title: 'Информация по вашему предложению',
        info: {
            category: 'Морепродукты',
            name: 'Палтус (в наличии)',
            price: '50000 тыс.руб. (за 50 кг)',
            manufacturer: 'ООО "Ледокол"',
            deliveryAddres: 'ул. Белокобыльская, 69',
            deliveryDate: '12.08.2023',
            deliveryMethod: 'Транспортом поставщика',
        },
        infoData: {
            category: 'Категория',
            name: 'Название',
            price: 'Цена',
            manufacturer: 'Производитель',
            deliveryAddres: 'Адрес доставки',
            deliveryDate: 'Дата доставки',
            deliveryMethod: 'Способ доставки',
        },
        commentary:
            'свежее привезли вчера. Палтус — как и полагается представителю ' +
            '\n семейства камбаловых — рыба плоская; ее еще называют морским языком — ' +
            '\n но какую только рыбу так не называют. У палтуса вкусное жирное белое ' +
            '\n мясо и очень мало костей. Одна беда — если рыбу неправильно хранили, ' +
            '\n есть риск, что на сковородке она превратится в кашу',
    },

    {
        id: 2,
        number: 524252,
        data: '20.06.2023',
        text: 'Ожидает подтверждения (чат недоступен)',
        title: 'Информация по вашему предложению',
        info: {
            category: 'Морепродукты',
            name: 'Палтус (в наличии)',
            price: '50000 тыс.руб. (за 50 кг)',
            manufacturer: 'ООО "Ледокол"',
            deliveryAddres: 'ул. Красногвардейская, 25',
            deliveryDate: '12.08.2023',
            deliveryMethod: 'Транспортом поставщика',
        },
        infoData: {
            category: 'Категория',
            name: 'Название',
            price: 'Цена',
            manufacturer: 'Производитель',
            deliveryAddres: 'Адрес доставки',
            deliveryDate: 'Дата доставки',
            deliveryMethod: 'Способ доставки',
        },
        commentary: 'нет',
    },
]

export const requestsTwo: HistoryItem[] = [
    {
        id: 3,
        number: 524252,
        data: '20.05.2023',
        text: 'Завершена (успешно)',
        title: 'Информация по вашему предложению',
        info: {
            category: 'Морепродукты',
            name: 'Палтус (в наличии)',
            price: '50000 тыс.руб. (за 50 кг)',
            deliveryAddres: 'ул. Лесная, 6',
            deliveryDate: '12.08.2023',
        },
        infoData: {
            category: 'Категория',
            name: 'Название',
            price: 'Цена',
            deliveryAddres: 'Адрес доставки',
            deliveryDate: 'Дата доставки',
            deliveryMethod: 'Способ доставки',
        },
    },
    {
        id: 4,
        number: 524252,
        data: '20.05.2023',
        text: 'Завершена (неуспешно)',
        title: 'Информация по вашему предложению',
        info: {
            category: 'Морепродукты',
            name: 'Палтус (в наличии)',
            price: '50000 тыс.руб. (за 50 кг)',
            deliveryAddres: 'ул. Лесная, 6',
            deliveryDate: '12.08.2023',
        },
        infoData: {
            category: 'Категория',
            name: 'Название',
            price: 'Цена',
            deliveryAddres: 'Адрес доставки',
            deliveryDate: 'Дата доставки',
            deliveryMethod: 'Способ доставки',
        },
    },
]
