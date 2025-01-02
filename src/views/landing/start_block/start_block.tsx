import Link from 'next/link'

export function StartBlock() {
    return (
        <div className='text-white pt-[40px] xl:py-[180px]'>
            <div className='bg-[#364FC7] flex flex-col justify-center items-center py-5 sm:py-8 gap-y-7 lg:py-14'>
                <div className='flex flex-col gap-y-2 items-center'>
                    <div className='text-[14px] font-semibold sm:text-[18px] lg:text-[24px] sm:font-bold xl:text-[32px]'>
                        Начните работу без усилий и нервов
                    </div>
                    <div className='text-[12px] lg:text-[15px] xl:text-[20px]'>
                        Без звонков и мучений, быстро и просто
                    </div>
                </div>
                <Link
                    href='/sign-in'
                    className='flex justify-center uppercase w-[140x] bg-[#FF8787] font-semibold text-[12px] xl:text-[16px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[24px] rounded-[4px]'
                >
                    Зарегестрироваться
                </Link>
            </div>
            <div className='bg-[#FFA8A8] flex justify-center items-center w-full py-3 font-bold lg:text-[20px] xl:text-[32px]'>
                Это бесплатно. Честно
            </div>
        </div>
    )
}
