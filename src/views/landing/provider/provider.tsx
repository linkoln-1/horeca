import { Image } from '@mantine/core'

export function Provider() {
    return (
        <div className='w-full px-4 py-12'>
            <div className='flex justify-end mt-[120px] mb-[40px]'>
                <div className='bg-[#364FC7] py-2 lg:py-4 px-6 lg:px-[84px] w-max xl:text-[36px] uppercase font-extrabold text-white'>
                    Для поставщиков
                </div>
            </div>
            <div className='flex flex-col lg:flex-row shadow-lg py-8 justify-between px-14 items-center gap-y-14 lg:divide-x'>
                <div className='flex flex-col items-center lg:items-start gap-y-5 md:w-1/2 justify-center '>
                    <div className='uppercase font-extrabold text-[14px] xl:text-2xl text-center md:text-left'>
                        Клиенты ищут вас сами
                    </div>
                    <div className='w-full max-w-[360px] mx-auto md:mx-0'>
                        <Image
                            src='/assets/images/image 5.png'
                            height={360}
                            width={360}
                            alt='Norway'
                            fit='contain'
                        />
                    </div>
                    <div className='text-[12px] xl:text-sm text-[#495057] text-center md:text-left'>
                        Получайте входящие заявки по вашим категориям товара.
                    </div>
                </div>
                <div className='flex flex-col items-start lg:items-start gap-y-5 md:w-1/2 justify-center lg:pl-20'>
                    <div className='uppercase font-extrabold text-[14px] xl:text-2xl text-center md:text-left'>
                        Откликайтесь на разные заявки
                    </div>
                    <div className='w-full max-w-[360px] mx-auto md:mx-0'>
                        <Image
                            src='/assets/images/img.png'
                            height={360}
                            width={360}
                            alt='Norway'
                            fit='contain'
                        />
                    </div>
                    <div className='text-[12px] xl:text-sm items-start text-[#495057] text-center md:text-left'>
                        Получайте новых клиентов и расширяйте свою клиентскую
                        базу ежедневно.
                    </div>
                </div>
            </div>
        </div>
    )
}
