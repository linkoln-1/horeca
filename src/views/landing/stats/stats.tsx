import { Image } from '@mantine/core'

export function Stats() {
    return (
        <div id='stats' className='pt-[70px] lg:pt-[100px] xl:pt-[180px]'>
            <div className='w-full bg-[#364FC7] py-5 flex justify-center items-center text-white text-[16px] xl:text-[32px] font-bold'>
                Цифры скажут лучше слов!
            </div>
            <div className='flex flex-col md:flex-row gap-y-10 bg-[#EDF2FF] py-[30px] divide-x divide-[#DBE4FF]'>
                {[
                    '/assets/images/handshake (1).png',
                    '/assets/images/message (1).png',
                    '/assets/images/gift (1).png',
                ].map((src, index) => (
                    <div
                        key={index}
                        className='flex flex-1 md:aspect-square max-h-[350px] h-full flex-col justify-center items-center px-[10px] gap-y-3'
                    >
                        <div className='text-center font-extrabold uppercase text-[14px] lg:text-[18px] xl:text-[24px]'>
                            {index === 0
                                ? '20+ категорий товаров'
                                : index === 1
                                  ? '200+ сторонников платформы'
                                  : '3.1 тыс+ охватов в наших соцсетях'}
                        </div>
                        <div className='flex-grow flex-shrink-0 flex justify-center items-center'>
                            <Image
                                src={src}
                                height={130}
                                width={130}
                                alt={
                                    index === 0
                                        ? 'handshake'
                                        : index === 1
                                          ? 'message'
                                          : 'gift'
                                }
                            />
                        </div>
                        <div className='text-center text-[10px] lg:text-[14px] xl:text-[16px] lg:px-[20px]'>
                            {index === 0
                                ? 'От текстиля и до специй! Найдется все, что нужно для ресторана или отеля.'
                                : index === 1
                                  ? 'И мы продолжаем расти. Растите вместе с нами.'
                                  : 'Мы можем рассказать и о вас. Заполните форму ниже.'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
