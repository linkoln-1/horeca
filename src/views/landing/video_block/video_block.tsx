import { IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react'

export function VideoBlock() {
    return (
        <div className='flex flex-col xl:px-[84px] lg:flex-row lg:gap-x-14 xl:gap-x-[70px] gap-y-8 justify-center items-center pt-[60px] lg:items-start'>
            <div className='w-full lg:w-1/2 flex justify-center items-center'>
                <iframe
                    src='https://www.youtube.com/embed/b9c40uMAiEw?si=P1wpR1ubigzAhtBX'
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                    className='w-full aspect-video sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[300px] lg:w-full lg:h-auto rounded-2xl'
                ></iframe>
            </div>
            <div className='w-full h-full lg:w-1/2 flex flex-col items-center justify-center gap-y-4 lg:items-start'>
                <div className='flex flex-col lg:gap-y-3 justify-center items-center lg:items-start'>
                    <div className='text-[13px] lg:text-[20px] xl:text-[32px] font-bold text-[#454545]'>
                        Присоединяйтесь к сообществу профессионалов индустрии
                        гостеприимства
                    </div>
                    <div className='text-[12px] lg:text-[16px] xl:text-[20px] text-[#495057]'>
                        С нами работают лучшие
                    </div>
                </div>
                <div className='flex mt-4 lg:mt-0'>
                    <div className='rounded-full bg-[#F8F9FA] p-2'>
                        <IconBrandTelegram
                            className='w-[19px] h-[19px] xl:h-[40px] xl:w-[40px]'
                            size={60}
                            color='#56A8E3'
                        />
                    </div>
                    <div className='rounded-full bg-[#F8F9FA] p-2'>
                        <IconBrandWhatsapp
                            className='w-[19px] h-[19px] xl:h-[40px] xl:w-[40px]'
                            size={60}
                            color='#1FAF38'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
