type chatRequest = {
    requestNumber: string
    requestDate: string
}

export const supplierMessages = [
    {
        type: 'request',
        from: 'me',
        inStock: true,
        products: [
            {
                id: 1,
                category: 'Безалкогольные напитки, вода, соки',
                items: [
                    {
                        id: 1,
                        name: 'Сок Рич Гранатовый',
                        price: '50,000 руб',
                        manufacturer: 'ООО “Суперджус”',
                        images: [
                            '/assets/images/bg-5.png',
                            '/assets/images/bg-5.png',
                            '/assets/images/bg-5.png',
                        ],
                    },
                ],
                comment: '',
            },
            {
                id: 2,
                category: 'Шоколад',
                items: [
                    {
                        id: 1,
                        name: 'Горький',
                        price: '30,000 руб.',
                        manufacturer: 'ООО “Линдт”',
                        images: ['/assets/images/bg-5.png'],
                    },
                ],
                comment:
                    'Есть Горький шоколад содержанием какаобобов более 80%',
            },
        ],
    },
    {
        type: 'message',
        from: 'me',
        text: 'Добрый день! Ваше предложение нас устраивает. Подскажите, не могли бы вы сделать 10% скидку на все, если мы закупим продукцию в большем объеме, чем изначально запрашивали?',
    },
    {
        type: 'message',
        from: 'supplier',
        text: 'Все обсуждаемо. Однако зависит от конечного объема и сроков поставки.',
    },
    {
        type: 'message',
        from: 'me',
        text: 'Хотели бы запас мороженного на два месяца вперед при условии сохранения его качества. По срокам - те же даты + можем дать 3 дня за поставку дополнительного объема.',
    },
    {
        type: 'message',
        from: 'supplier',
        text: 'Окей, справимся. Начинам подготовку продукции к поставке. Будем держать в курсе.',
    },
    {
        type: 'message',
        from: 'me',
        text: 'Спасибо большое за оперативность!',
    },
]
export const assistantMessages = [
    {
        type: 'message',
        from: 'support',
        text: 'Добрый день! Чем мы можем Вам помочь?',
    },
    {
        type: 'message',
        from: 'me',
        text: 'Добрый день! У меня возникла проблема с заполнением заявки. Не получается прикрепить фотографию. Не могу понять почему.',
    },
    {
        type: 'message',
        from: 'support',
        text: 'Спасибо за обращение! Сейчас разберемся.',
    },
]
export const supplierChats: chatRequest[] = [
    {
        requestNumber: '765434560',
        requestDate: '24.05.2024',
    },
    {
        requestNumber: '765234560',
        requestDate: '28.06.2024',
    },
    {
        requestNumber: '723434560',
        requestDate: '30.06.2024',
    },
    {
        requestNumber: '732334560',
        requestDate: '30.06.2024',
    },
]

export const assistantChats: chatRequest[] = [
    {
        requestNumber: '765434560',
        requestDate: '24.05.2024',
    },
    {
        requestNumber: '765234560',
        requestDate: '28.06.2024',
    },
    {
        requestNumber: '723434560',
        requestDate: '30.06.2024',
    },
    {
        requestNumber: '732334560',
        requestDate: '30.06.2024',
    },
]

export const adminChats = [
    { id: 1, name: 'ООО "АЛФАВИТ"', request: '766797' },
    { id: 2, name: 'ООО "АЗБУКА ВКУСА"', request: '766797' },
    { id: 3, name: 'ИП Григорян А.В.', request: '766797' },
]

export const adminMessages = [
    {
        id: 1,
        text: 'Добрый день! У меня проблема с доступом к личному кабинету',
        sender: 'client',
        time: '15:32',
    },
    {
        id: 2,
        text: 'Добрый день! Уточните, пожалуйста, ваши паспортные данные. Мы направим Вам ссылку для восстановления доступа.',
        sender: 'support',
        time: '15:32',
    },
    {
        id: 3,
        text: 'Спасибо! Сейчас отправлю. Можно ли будет поменять пароль?',
        sender: 'client',
        time: '15:32',
    },
]
