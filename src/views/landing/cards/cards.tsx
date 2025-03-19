'use client'

import { useState } from 'react'

import { Card, Image } from '@mantine/core'
import Link from 'next/link'

export function Cards() {
    const [hovered, setHovered] = useState(false)
    const [hovered1, setHovered1] = useState(false)
    const [hovered2, setHovered2] = useState(false)

    return (
        <div
            id='clients'
            className='flex px-[20px] flex-col gap-y-3 py-10 xl:pt-[100px] xl:pb-[180px] lg:flex-row justify-center items-center lg:items-stretch lg:gap-x-4 xl:px-[84px]'
        >
            <Card
                shadow='sm'
                padding='lg'
                radius='md'
                withBorder
                className={`flex-1 justify-between max-w-[370px] lg:max-w-none transition-all duration-500 ${hovered ? 'bg-gradient-to-b from-[#FA5252] to-[#3B5BDB]' : 'bg-white'}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div
                    className={`flex flex-col items-center gap-y-1 xl:gap-y-4 transition-colors duration-400 ${hovered ? 'text-white' : 'text-black'}`}
                >
                    <div className='font-extrabold xl:text-[24px]'>
                        ПОСТАВЩИКАМ
                    </div>
                    <div
                        className={`text-[12px] md:text-[13px] xl:text-[16px] ${hovered ? 'text-white' : 'text-[#868E96]'}`}
                    >
                        Хотите получать входящие заявки и новых клиентов?
                    </div>
                </div>
                <div className='lg:h-[360px] flex justify-center'>
                    <div className='relative w-full h-full flex justify-center'>
                        <Image
                            src='/assets/images/Vector 2.png'
                            height={360}
                            width={360}
                            alt='Norway'
                            className={` inset-0 transition-opacity duration-0 ${hovered ? 'opacity-0' : 'opacity-100'}`}
                            style={{ height: '100%', width: 'auto' }}
                        />
                        <div
                            className={`flex flex-col text-center text-white gap-y-4 justify-center items-center text-lg absolute inset-0 transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div>
                                Ищите клиентов удаленно, без расходов на поездки
                                и звонки.
                            </div>
                            <div>
                                Получайте входящие предложения и новые заказы
                                каждый день.
                            </div>
                            <div>Никаких комиссий со сделок, все честно.</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Link
                        href='/sign-in'
                        className='flex justify-center w-[200px] xl:w-[230px] bg-[#FF8787] font-semibold text-[12px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[20px] rounded-[4px]'
                    >
                        НАЙТИ НОВЫХ КЛИЕНТОВ
                    </Link>
                </div>
            </Card>

            <Card
                shadow='sm'
                padding='lg'
                radius='md'
                withBorder
                className={`flex-1 xl:gap-y-8 justify-between max-w-[370px] lg:max-w-none transition-all duration-500 ${hovered1 ? 'bg-gradient-to-b from-[#FA5252] to-[#3B5BDB]' : 'bg-white'}`}
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
            >
                <div
                    className={`flex flex-col items-center gap-y-1 xl:gap-y-4 transition-colors duration-400 ${hovered1 ? 'text-white' : 'text-black'}`}
                >
                    <div className='font-extrabold xl:text-[23px]'>
                        ЗАВЕДЕНИЯМ ОБЩЕПИТА
                    </div>
                    <div
                        className={`text-[12px] md:text-[13px] xl:text-[16px] ${hovered1 ? 'text-white' : 'text-[#868E96]'}`}
                    >
                        Хотите сравнивать все предложения без усилий?
                    </div>
                </div>
                <div className='lg:h-[360px] flex justify-center'>
                    <div className='relative w-full h-full flex justify-center'>
                        <Image
                            src='/assets/images/Vector 1.png'
                            height={360}
                            width={360}
                            alt='Norway'
                            className={` inset-0 transition-opacity duration-0 ${hovered1 ? 'opacity-0' : 'opacity-100'}`}
                            style={{ height: '100%', width: 'auto' }}
                        />
                        <div
                            className={`flex flex-col text-center text-white gap-y-4 justify-center items-center text-lg absolute inset-0 transition-opacity duration-200 ${hovered1 ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div>
                                Получайте готовый анализ всех предложений от
                                поставщиков на платформе.
                            </div>
                            <div>
                                Выбирайте лучшее предложение по цене-качеству
                                без лишних усилий
                            </div>
                            <div>
                                Создавайте шаблоны и массовые заявки на все
                                категории товаров.
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Link
                        href='/sign-in'
                        className='flex justify-center w-[200px] bg-[#FF8787] font-semibold text-[12px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[24px] rounded-[4px]'
                    >
                        СОЗДАТЬ ЗАЯВКУ
                    </Link>
                </div>
            </Card>

            <Card
                shadow='sm'
                padding='lg'
                radius='md'
                withBorder
                className={`flex-1 justify-between max-w-[370px] lg:max-w-none transition-all duration-500 ${hovered2 ? 'bg-gradient-to-b from-[#FA5252] to-[#3B5BDB]' : 'bg-white'}`}
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
            >
                <div
                    className={`flex flex-col items-center gap-y-1 xl:gap-y-4 transition-colors duration-400 ${hovered2 ? 'text-white' : 'text-black'}`}
                >
                    <div className='font-extrabold xl:text-[24px]'>
                        РЕКЛАМОДАТЕЛЯМ
                    </div>
                    <div
                        className={`text-[12px] md:text-[13px] xl:text-[16px] ${hovered2 ? 'text-white' : 'text-[#868E96]'}`}
                    >
                        Хотите, чтобы вашу рекламу увидели целевые клиенты?
                    </div>
                </div>
                <div className='lg:h-[360px] flex justify-center'>
                    <div className='relative w-full h-full flex justify-center'>
                        <Image
                            src='/assets/images/Vector 3.png'
                            height={360}
                            width={360}
                            alt='Norway'
                            className={` inset-0 transition-opacity duration-0 ${hovered2 ? 'opacity-0' : 'opacity-100'}`}
                            style={{ height: '100%', width: 'auto' }}
                        />
                        <div
                            className={`flex flex-col text-center text-white gap-y-4 justify-center items-center text-lg absolute inset-0 transition-opacity duration-200 ${hovered2 ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div>
                                Получите прямой доступ к вашей целевой
                                аудитории.
                            </div>
                            <div>
                                Владельцы HoReCa, закупщики, директора и
                                менеджеры по продажам b2b сегмента.
                            </div>
                            <div>Все ждут вашу рекламу на нашей платформе</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Link
                        href='#contact-us'
                        className='flex justify-center w-[200px] xl:w-[230px] bg-[#FF8787] font-semibold text-[12px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[20px] rounded-[4px]'
                    >
                        НАЙТИ НОВЫХ КЛИЕНТОВ
                    </Link>
                </div>
            </Card>
        </div>
    )
}
