import { Image } from '@mantine/core'

export function MainDescription() {
    return (
        <div className='flex flex-col md:flex-row gap-y-10 bg-[#EDF2FF] py-[30px] divide-x divide-[#DBE4FF]'>
            {[
                '/assets/images/handshake.png',
                '/assets/images/message.png',
                '/assets/images/gift.png',
            ].map((src, index) => (
                <div
                    key={index}
                    className='flex flex-1 md:aspect-square max-h-[350px] h-full flex-col justify-center items-center px-[10px] gap-y-3'
                >
                    <div className='text-center font-extrabold uppercase text-[14px] lg:text-[18px] xl:text-[24px]'>
                        {index === 0
                            ? 'Повышаем доверие'
                            : index === 1
                              ? 'Обеспечиваем чистоту общения. Без спама'
                              : 'Абсолютно бесплатно'}
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
                            ? 'Наш рейтинг составлен автоматически на основе реальных сделок. Никаких накруток.'
                            : index === 1
                              ? 'Встроенные чаты продуманы так, что спамить в них просто невозможно. Проверьте сами!'
                              : 'Платите только за рекламу, и только если захотите.'}
                    </div>
                </div>
            ))}
        </div>
    )
}
