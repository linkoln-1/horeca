'use client'

import { useState } from 'react'
import { IMaskInput } from 'react-imask'

import { Alert, Flex, Image, Input, Radio } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

export function ContactUs() {
    const [type, setType] = useState<string>('Поставщик, производитель')
    const [name, setName] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [alert, setAlert] = useState<{
        show: boolean
        message: string
        type: 'success' | 'error'
    }>({ show: false, message: '', type: 'success' })
    const icon = <IconInfoCircle />

    const handleSubmit = async () => {
        const body = {
            data: {
                Name: name,
                Number: number,
                City: city,
                Comment: comment,
                Type: type,
            },
        }

        try {
            const response = await fetch(
                'https://sphere-horeca.ru/cms/api/forms',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            )

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            setAlert({
                show: true,
                message: 'Заявка успешно отправлена!',
                type: 'success',
            })
            setName('')
            setNumber('')
            setCity('')
            setComment('')
            setType('Поставщик, производитель')
        } catch (error) {
            setAlert({
                show: true,
                message: 'Проверьте правильность заполненной формы!',
                type: 'error',
            })
        }
    }
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
                            <Input
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='xl:flex xl:flex-col xl:gap-y-[8px]'>
                        <div className='text-[12px] text-[#454545]'>
                            НОМЕР ТЕЛЕФОНА
                        </div>
                        <div>
                            <Input
                                required
                                value={number}
                                //@ts-ignore
                                onChange={e => setNumber(e.target.value)}
                                component={IMaskInput}
                                placeholder='+7 (000) 00-00-00'
                                mask='+7 (000) 000-00-00'
                            />
                        </div>
                    </div>
                    <div className='xl:flex xl:flex-col xl:gap-y-[8px]'>
                        <div className='text-[12px] text-[#454545]'>ГОРОД</div>
                        <div>
                            <Input
                                required={true}
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='xl:flex xl:flex-col xl:gap-y-[8px]'>
                        <div className='text-[12px] text-[#454545]'>
                            КОММЕНТАРИЙ
                        </div>
                        <div>
                            <Input
                                value={comment}
                                onChange={e => setComment(e.target.value)}
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
                            checked={type === 'Поставщик, производитель'}
                            onChange={() => setType('Поставщик, производитель')}
                        />
                        <Radio
                            label='Ресторан, отель, кафе'
                            checked={type === 'Ресторан, отель, кафе'}
                            onChange={() => setType('Ресторан, отель, кафе')}
                        />
                        <Radio
                            label='Рекламодатель'
                            checked={type === 'Рекламодатель'}
                            onChange={() => setType('Рекламодатель')}
                        />
                    </Flex>
                </div>
                <div className='flex flex-col gap-y-2 gap-x-3 items-center lg:items-start xl:items-center xl:flex-row xl:mt-10'>
                    <div
                        onClick={handleSubmit}
                        className='bg-[#FF8787] cursor-pointer w-[200px] lg:w-[216px] mt-8 xl:mt-0 font-semibold text-[14px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-0 rounded-[4px] flex items-center justify-center'
                    >
                        Отправить заявку
                    </div>
                    {alert.show && (
                        <Alert
                            className='absolute'
                            variant='light'
                            color={alert.type === 'success' ? 'green' : 'red'}
                            radius='md'
                            withCloseButton
                            title={
                                alert.type === 'success'
                                    ? 'Успешно отправлено!'
                                    : 'Проверьте правильность заполненной формы!'
                            }
                            icon={icon}
                            onClose={() => setAlert({ ...alert, show: false })}
                        ></Alert>
                    )}
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
