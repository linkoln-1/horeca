type Supplier = {
    img: string
    name: string
    rating: number
    categories: string[]
}

export const suppliers: Supplier[] = [
    {
        img: '/assets/images/bg-5.png',
        name: 'ООО МОРЕАНИ',
        rating: 4.6,
        categories: ['Рыба, морепродукты, бакалея'],
    },
    {
        img: '/assets/images/bg-5.png',
        name: 'ИП ИВАНОВ',
        rating: 4.8,
        categories: ['Молочные продукты, яйца'],
    },
    {
        img: '/assets/images/bg-5.png',
        name: 'ИП ПЕТРОВ',
        rating: 3.0,
        categories: ['Посуда и кухонные принадлежности'],
    },
    {
        img: '/assets/images/bg-5.png',
        name: 'ООО РОМАШКА',
        rating: 5.0,
        categories: [
            'Посуда и кухонные принадлежности',
            'Прикасса (чипсы, снеки, семечки)',
            'Продукты быстрого приготовления, лапша',
            'Рыба и морепродукты',
            'Свежие овощи, фрукты, зелень, грибы',
            'Уборка и чистящие средства',
            'Хлеб, хлебобулочные изделия',
            'Чай, кофе, какао, заменители',
        ],
    },
]
