import { Container, Paper } from '@mantine/core'
import Image from 'next/image'

export function MainPartViews() {
    return (
        <Paper w='100%' className=''>
            <div className='hidden xl:flex w-full justify-center items-center'>
                <div className='absolute h-[150px] mt-[200px] mr-[95px] w-[190px] z-10'>
                    <Image
                        src='/assets/images/dots.png'
                        layout='fill'
                        objectFit='cover'
                        alt='main_image'
                    />
                </div>
            </div>
            <div className='relative h-[488px] md:hidden'>
                <Image
                    src='/assets/images/landing_image.png'
                    layout='fill'
                    objectFit='cover'
                    alt='main_image'
                    className='transition duration-500 ease-in-out transform hover:scale-110 blur-sm md:blur-0'
                />
                <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center px-4 gap-y-2'>
                    <h1 className='text-white text-3xl md:text-4xl font-bold text-center'>
                        Сфера HoReCa
                    </h1>
                    <h4 className='text-white text-sm md:text-4xl text-center'>
                        Размещайте и получайте заказы в пару кликов
                    </h4>
                    <div className='bg-[#FF8787] mt-8 font-semibold text-[14px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[24px] rounded-[4px]'>
                        НАЧАТЬ УЖЕ СЕГОДНЯ
                    </div>
                </div>
            </div>

            <div className='hidden md:flex w-full'>
                <div className='bg-[#364FC7] w-full flex items-center xl:justify-center'>
                    <div className='flex flex-col items-start justify-start px-4 gap-y-9 xl:gap-y-20'>
                        <div className='flex flex-col items-start justify-start gap-y-1 xl:gap-y-14'>
                            <h1 className='text-white text-base lg:text-2xl xl:text-[74px] font-bold text-center'>
                                Сфера HoReCa
                            </h1>
                            <h4 className='text-white text-sm lg:text-base xl:text-xl text-center font-light'>
                                Размещайте и получайте заказы в пару кликов
                            </h4>
                        </div>
                        <div className='bg-[#FF8787] font-semibold text-[14px] xl:text-[20px] lg:text-base text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[24px] rounded-[4px]'>
                            НАЧАТЬ УЖЕ СЕГОДНЯ
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-[488px] lg:h-[530px] xl:h-[700px] 2xl:h-[900px]'>
                    <Image
                        src='/assets/images/landing_image.png'
                        layout='fill'
                        objectFit='cover'
                        alt='main_image'
                    />
                </div>
            </div>
            <div className='bg-[#FF8787] text-white px-3 py-3 font-semibold text-sm sm:flex sm:justify-center items-center sm:py-5 sm:text-base lg:font-bold lg:text-xl xl:text-[32px]'>
                Специально для поставщиков и ресторанов, которые ищут друг друга
            </div>
        </Paper>
    )
}
