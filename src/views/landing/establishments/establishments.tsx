import { Image } from '@mantine/core'

export function Establishments() {
    return (
        <div id='establishments' className='w-full xl:pt-12'>
            <div className='bg-[#FF8787] py-2 lg:py-4 px-6 lg:px-[84px] xl:text-[36px] w-max mt-[70px] xl:mt-[120px] mb-[40px] uppercase font-extrabold text-white'>
                Для заведений
            </div>
            <div className='flex flex-col lg:flex-row shadow-md rounded-sm py-8 justify-between px-14 xl:px-[84px] items-center gap-y-14 lg:divide-x'>
                <div className='flex flex-col items-center lg:items-start gap-y-5 md:w-1/2 justify-center'>
                    <div className='uppercase font-extrabold text-[14px] xl:text-2xl text-center md:text-left'>
                        Все предложения в одном месте
                    </div>
                    <div className='w-full max-w-[360px] mx-auto md:mx-0'>
                        <Image
                            src='/assets/images/image 3.png'
                            height={360}
                            width={360}
                            alt='Norway'
                            fit='contain'
                        />
                    </div>
                    <div className='text-[12px] xl:text-sm text-[#495057] text-center md:text-left'>
                        Получайте готовую аналитику по всем предложениям на ваши
                        заявки. Все данные у вас под рукой.
                    </div>
                </div>
                <div className='flex flex-col items-center lg:items-start gap-y-5 md:w-1/2 justify-center lg:pl-20'>
                    <div className='uppercase font-extrabold text-[14px] xl:text-2xl text-center md:text-left'>
                        Ваша универсальная заявка
                    </div>
                    <div className='w-full max-w-[360px] mx-auto md:mx-0'>
                        <Image
                            src='/assets/images/image 4.png'
                            height={360}
                            width={360}
                            alt='Norway'
                            fit='contain'
                        />
                    </div>
                    <div className='text-[12px] xl:text-sm items-start text-[#495057] text-center md:text-left'>
                        Создавайте единую заявку для всех категорий товара.
                        Система автоматически распределит её по нужным
                        поставщикам.
                    </div>
                </div>
            </div>
        </div>
    )
}
