import { Image } from '@mantine/core'
import Link from 'next/link'

export function Steps() {
    return (
        <div id='steps' className='hidden lg:flex flex-col pt-[120px] xl:pt-[180px] justify-center items-center'>
            <div className='w-full bg-[#FF8787] py-5 flex justify-center items-center text-white text-[22px] xl:text-[32px] font-bold'>
                Как перестать тратить время и деньги на неэффективную закупку?
            </div>
            <div className='flex w-full max-w-[1084px]'>
                <Image
                    src='/assets/images/steps-circle.png'
                    height={360}
                    width={360}
                    alt='Norway'
                    fit='contain'
                />
            </div>
            <Link
                href='/sign-in'
                className='bg-[#FF8787] uppercase rounded-lg text-white px-8 xl:px-[60px] xl:py-[24px] py-3 mt-[50px] xl:mt-[64px] font-light text-sm sm:flex sm:justify-center items-center lg:font-bold lg:text-base xl:text-[20px]'
            >
                Начать сейчас
            </Link>
        </div>
    )
}
