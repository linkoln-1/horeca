export type detailsType = {
    workTime: string
    accomodationTime: string
}

export type ratesContentType = {
    id: number
    name: string
    about: string
    price: string
    time: string
    details: detailsType
}

export const ratesContent: ratesContentType[] = [
    {
        id: 1,
        name: '1:1',
        about: '1 объявление на 1 неделю',
        price: '1000руб',
        time: '(за 1 неделю)',
        details: {
            workTime: 'до 5 рабочих дней',
            accomodationTime: 'на 1 неделю',
        },
    },
    {
        id: 2,
        name: 'Срочный',
        about: 'Идеально для компании',
        price: '2000руб',
        time: '(на весь срок)',
        details: {
            workTime: 'в течении 3 часов',
            accomodationTime: 'макс. 2 недели',
        },
    },
    {
        id: 3,
        name: 'Акция',
        about: 'Для скоропортящихся товаров',
        price: '2500руб',
        time: '(за 5 дней)',
        details: {
            workTime: 'до 2 рабочих дней',
            accomodationTime: 'до 5 дней',
        },
    },
]
