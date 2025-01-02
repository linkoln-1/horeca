'use client'

import React, { useState } from 'react'

import { Burger, Button, Drawer, Flex, Paper } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function Header() {
    const [opened, setOpened] = useState(false)

    const toggleMenu = () => {
        setOpened(prev => !prev)
    }

    const isMobile = useBreakpoint('sm')
    return (
        <Paper w='100%'>
            <Flex justify='space-between' align='center'>
                <Flex align='center'>
                    <Link href={`/landing`}>
                        <div className='relative ml-5 lg:ml-[40px] xl:ml-[84px] w-[130px] h-[120px] sm:h-[120px] sm:w-[160px] md:h-[120px] md:w-[140px] lg:h-[62px] lg:w-[160px] lg:my-[20px]'>
                            <Image
                                src='/assets/icons/logo.svg'
                                alt='Horeka logo'
                                layout='fill'
                                objectFit='contain'
                                className='object-contain justify-start items-start'
                            />
                        </div>
                    </Link>
                    {isMobile && (
                        <div className='absolute right-6 sm:right-8 top-10'>
                            <Burger
                                opened={opened}
                                onClick={toggleMenu}
                                size='sm'
                            />
                        </div>
                    )}

                    <Drawer
                        opened={opened}
                        onClose={toggleMenu}
                        size='100%'
                        position='right'
                    >
                        <Flex direction='column' gap='lg'>
                            <Flex gap={20} align='center' pos='relative'>
                                Клиенты
                            </Flex>
                            <Flex gap={20} align='center' pos='relative'>
                                Преимущества
                            </Flex>
                            <Flex gap={20} align='center' pos='relative'>
                                Как это работает
                            </Flex>
                            <Flex gap={20} align='center' pos='relative'>
                                О нас
                            </Flex>
                            <Flex gap={20} align='center' pos='relative'>
                                <Button
                                    variant='filled'
                                    color='#FF8787'
                                    h={48}
                                    w={206}
                                    radius='xs'
                                >
                                    <Link href={'#contact-us'}>
                                        ОСТАВИТЬ ЗАЯВКУ
                                    </Link>
                                </Button>
                            </Flex>
                        </Flex>
                    </Drawer>
                </Flex>
                {!isMobile && (
                    <Flex
                        align='center'
                        className='gap-x-5 lg:gap-x-14 xl:gap-x-[158px] pr-[20px] lg:pr-[40px] xl:pr-[84px]'
                    >
                        <div className='flex text-sm lg:text-base justify-center items-center gap-x-5 xl:gap-x-[60px]'>
                            <div>Клиенты</div>
                            <div>Преимущества</div>
                            <div>Как это работает</div>
                            <div>О нас</div>
                        </div>
                        <Link
                            href={'#contact-us'}
                            className='bg-[#FF8787] font-semibold text-[14px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[24px] rounded-[4px]'
                        >
                            ОСТАВИТЬ ЗАЯВКУ
                        </Link>
                    </Flex>
                )}
            </Flex>
        </Paper>
    )
}
