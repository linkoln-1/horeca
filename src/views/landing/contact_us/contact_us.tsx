'use client'

import { useState } from 'react'
import { IMaskInput } from 'react-imask'

import { Flex, Image, Input, Radio } from '@mantine/core'

export function ContactUs() {
    const [value, setValue] = useState('Поставщик, производитель')
    return (
        <div
            id='contact-us'
            className='py-[80px] lg:py-[140px] xl:py-[61px] xl:mx-[84px] flex items-center lg:items-start justify-center shadow-md bg-white xl:mb-[180px] rounded-2xl px-[20px]'
        >
            <div className='mr-9 w-[491px] xl:w-[591px]'>
                <div className='font-bold lg:text-[24px] xl:text-[32px]'>
                    Свяжитесь с нами сегодня
                </div>
                <div className='flex flex-col gap-y-2 pt-4 xl:pt-[40px] lg:gap-y-7 lg:w-[350px]'>
                    <div className='xl:flex xl:flex-col xl:gap-y-[8px]'>
                        <div className='text-[12px] text-[#454545]'>ИМЯ</div>
                        <div>
                            <Input />
                        </div>
                    </div>
                    <div className='xl:flex xl:flex-col xl:gap-y-[8px]'>
                        <div className='text-[12px] text-[#454545]'>
                            НОМЕР ТЕЛЕФОНА
                        </div>
                        <div>
                            <Input
                                component={IMaskInput}
                                placeholder='+7 (000) 00-00-00'
                                mask='+7 (000) 000-00-00'
                            />
                        </div>
                    </div>
                    <div className='xl:flex xl:flex-col xl:gap-y-[8px]'>
                        <div className='text-[12px] text-[#454545]'>ГОРОД</div>
                        <div>
                            <Input />
                        </div>
                    </div>
                    <div className='xl:flex xl:flex-col xl:gap-y-[8px]'>
                        <div className='text-[12px] text-[#454545]'>
                            КОММЕНТАРИЙ
                        </div>
                        <div>
                            <Input
                                styles={theme => ({
                                    input: {
                                        height: '100px',
                                        '@media (min-width: 1280px)': {
                                            height: '100px',
                                        },
                                    },
                                })}
                            />
                        </div>
                    </div>
                </div>
                <div className='xl:pt-[30px]'>
                    <Flex
                        direction={'column'}
                        mt='xs'
                        className='gap-y-3 lg:gap-y-5'
                    >
                        <Radio
                            className='text-[12px]'
                            label='Поставщик, производитель'
                            checked={value === 'Поставщик, производитель'}
                            onChange={() =>
                                setValue('Поставщик, производитель')
                            }
                        />
                        <Radio
                            label='Ресторан, отель, кафе'
                            checked={value === 'Ресторан, отель, кафе'}
                            onChange={() => setValue('Ресторан, отель, кафе')}
                        />
                        <Radio
                            label='Рекламодатель'
                            checked={value === 'Рекламодатель'}
                            onChange={() => setValue('Рекламодатель')}
                        />
                    </Flex>
                </div>
                <div className='flex flex-col gap-y-2 gap-x-3 items-center lg:items-start xl:items-center xl:flex-row xl:mt-10'>
                    <div className='bg-[#FF8787] w-[200px] lg:w-[216px] mt-8 xl:mt-0 font-semibold text-[14px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-0 rounded-[4px] flex items-center justify-center'>
                        Отправить заявку
                    </div>
                    <div className='text-[12px] flex justify-center xl:items-center w-[355px]'>
                        Нажимая на кнопку вы соглашаетесь на обработку
                        персональных данных и с политикой конфиденциальности
                    </div>
                </div>
            </div>
            <div className='hidden lg:flex'>
                <div className='absolute h-[150px] -mt-[30px] ml-[300px] xl:-mt-[35px] xl:ml-[350px] w-[190px] z-10'>
                    <Image
                        src='/assets/images/Group 290.png'
                        alt='main_image'
                    />
                </div>
            </div>
            <div className='hidden lg:flex'>
                <Image
                    src='/assets/images/contact_us.png'
                    alt='Norway'
                    className=''
                    w={494}
                    h={737}
                />
            </div>
        </div>
    )
}
