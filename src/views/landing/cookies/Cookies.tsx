import { useState, useEffect } from 'react'

import {
    Button,
    Text,
    Anchor,
    useMantineTheme,
    Transition,
} from '@mantine/core'
import { IconCookie, IconX } from '@tabler/icons-react'

export default function CookieConsent() {
    const [visible, setVisible] = useState(false)
    const theme = useMantineTheme()
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent')
        if (consent !== 'true') {
            const timer = setTimeout(() => setVisible(true), 500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true')
        setVisible(false)
    }

    return (
        <div className='fixed bottom-0 left-0 right-0 flex justify-center z-50 pb-6'>
            <Transition
                mounted={visible}
                transition='slide-up'
                duration={400}
                timingFunction='cubic-bezier(0.19, 1, 0.22, 1)'
            >
                {styles => (
                    <div
                        style={{
                            ...styles,
                            backgroundColor: theme.white,
                            maxWidth: 'calc(100% - 32px)',
                            width: '100%',
                        }}
                        className='shadow-2xl rounded-xl border border-gray-100 p-5 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className='hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 flex-shrink-0'>
                            <IconCookie
                                size={28}
                                className='text-blue-500'
                                strokeWidth={1.5}
                            />
                        </div>

                        <div className='absolute -top-3 -right-3 w-16 h-16 rounded-full bg-blue-100 opacity-30'></div>
                        <div className='absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-blue-100 opacity-20'></div>

                        <Text
                            size='sm'
                            className='flex-1 text-center md:text-left text-gray-700'
                        >
                            <div className='mb-1'>
                                Куки необходимы для более удобного посещения
                                сайтов. Мы используем куки для вашего комфорта!
                                Узнайте больше про использование{' '}
                                <a
                                    href='/Политика конфиденциальности Сфера HoReCa.pdf'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='cursor-pointer text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-200 decoration-2'
                                >
                                    cookie
                                </a>
                                .{' '}
                            </div>
                            <div>
                                Нажимая кнопку «Согласен» или продолжая
                                пользоваться Сайтом вы предоставляете свое
                                согласие на обработку Cookie, а также
                                подтверждаете согласие с положениями Политики.
                            </div>
                        </Text>

                        <Button
                            onClick={handleAccept}
                            variant='filled'
                            size='md'
                            className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5'
                            radius='md'
                        >
                            Согласен
                        </Button>
                    </div>
                )}
            </Transition>
        </div>
    )
}
