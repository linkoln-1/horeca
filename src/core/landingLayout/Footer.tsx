import { Container, Flex, Paper, PaperProps } from '@mantine/core'
import { IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
    return (
        <Paper w='100%' bg='#EDF2FF'>
            <Container my='md' fluid>
                <Flex
                    justify='space-between'
                    align='flex-start'
                    className='text-[12px] sm:text-[14px] md:text-[15px] xl:text-[16px] flex-col gap-y-5 text-[#454545] lg:flex-row xl:py-[60px] xl:px-[74px]'
                >
                    <Flex className='flex-col sm:flex-row sm:justify-between sm:w-full lg:flex-col xl:gap-y-[42px]'>
                        <div className='relative w-[130px] h-[120px] sm:h-[120px] sm:w-[160px] md:h-[120px] md:w-[140px] lg:h-[62px] lg:w-[160px] lg:my-[9px] lg:ml-[60px] xl:ml-0'>
                            <Image
                                src='/assets/icons/logo.svg'
                                alt='Horeka logo'
                                layout='fill'
                                objectFit='contain'
                                className='object-contain'
                            />
                        </div>
                        <Flex
                            direction={'column'}
                            className='justify-center gap-y-2 lg:gap-y-[4px] lg:text-[14px] w-max'
                        >
                            <a
                                href='/Политика конфиденциальности Сфера HoReCa.pdf'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='cursor-pointer hover:underline'
                            >
                                Политика конфиденциальности
                            </a>
                            <a
                                href='/Пользовательское соглашение Сфера HoReCa.pdf'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='cursor-pointer hover:underline'
                            >
                                Пользовательское соглашение
                            </a>
                        </Flex>
                    </Flex>

                    <Flex className='flex-col sm:flex-row sm:w-full justify-between lg:items-center gap-y-5'>
                        <Flex
                            direction={'column'}
                            className='gap-y-2 lg:gap-y-[20px]'
                        >
                            <div>
                                <Link href={'#clients'}>Клиенты</Link>
                            </div>
                            <div>
                                <Link href={'#establishments'}>
                                    Преимущества
                                </Link>
                            </div>
                            <div>
                                <Link href={'#steps'}>Как это работает</Link>
                            </div>
                            <div>
                                <Link href={'#stats'}>О нас</Link>
                            </div>
                        </Flex>

                        <Flex
                            direction={'column'}
                            className='sm:w-[206px] gap-y-2 lg:gap-y-[20px]'
                        >
                            <div className='font-semibold'>
                                Связаться с нами
                            </div>
                            <Flex direction={'row'}>
                                <div className='rounded-full bg-[#F8F9FA] p-2'>
                                    <Link
                                        href={'https://t.me/sphere_horeca'}
                                        target='_blank'
                                    >
                                        <IconBrandTelegram
                                            size={19}
                                            color='#56A8E3'
                                        />
                                    </Link>
                                </div>
                                <div className='rounded-full bg-[#F8F9FA] p-2'>
                                    <Link
                                        href={'https://wa.me/79530890553'}
                                        target='_blank'
                                    >
                                        <IconBrandWhatsapp
                                            size={19}
                                            color='#1FAF38'
                                        />
                                    </Link>
                                </div>
                                <div className='rounded-full bg-[#F8F9FA] p-2'>
                                    <Link
                                        href={'https://dzen.ru/sphere_horeca_'}
                                        target='_blank'
                                    >
                                        <Image
                                            src='/assets/images/dzen-logo.png'
                                            height={19}
                                            width={19}
                                            alt='Norway'
                                        />
                                    </Link>
                                </div>
                            </Flex>
                            <div>+7 (953) 089-05-53</div>
                            <div>info@sphere-horeca.ru</div>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Paper>
    )
}
