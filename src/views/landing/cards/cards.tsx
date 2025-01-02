import { Badge, Card, Flex, Group, Image, Text } from '@mantine/core'
import Link from 'next/link'

export function Cards() {
    return (
        <div className='flex px-[20px] flex-col gap-y-3 py-10 xl:pt-[100px] xl:pb-[180px] lg:flex-row justify-center items-center lg:items-stretch lg:gap-x-4 xl:px-[84px]'>
            <Card
                shadow='sm'
                padding='lg'
                radius='md'
                withBorder
                className='flex-1 h-full max-w-[370px] lg:max-w-none'
            >
                <Flex
                    justify='center'
                    mb='xs'
                    className='flex flex-col items-center xl:gap-y-4'
                >
                    <Text fw={800}>ПОСТАВЩИКАМ</Text>
                    <Text size='sm' c='dimmed'>
                        Хотите получать входящие заявки и новых клиентов?
                    </Text>
                </Flex>
                <Image
                    src='/assets/images/Vector 2.png'
                    height={360}
                    width={360}
                    alt='Norway'
                />
                <div className='flex justify-center'>
                    <Link
                        href='/sign-in'
                        className='flex justify-center w-[200px] xl:w-[230px] bg-[#FF8787] font-semibold text-[12px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[20px] rounded-[4px]'
                    >
                        НАЙТИ НОВЫХ КЛИЕНТОВ
                    </Link>
                </div>
            </Card>

            <Card
                shadow='sm'
                padding='lg'
                radius='md'
                withBorder
                className='flex-1 h-full max-w-[370px] lg:max-w-none'
            >
                <Flex
                    justify='center'
                    mb='xs'
                    className='flex flex-col items-center  xl:gap-y-4'
                >
                    <Text fw={800}>ЗАВЕДЕНИЯМ ОБЩЕПИТА</Text>
                    <Text size='sm' c='dimmed'>
                        Хотите сравнивать все предложения без усилий?
                    </Text>
                </Flex>
                <Image
                    src='/assets/images/Vector 1.png'
                    height={360}
                    width={360}
                    alt='Norway'
                />
                <div className='flex justify-center'>
                    <Link
                        href='/sign-in'
                        className='flex justify-center w-[200px] bg-[#FF8787] font-semibold text-[12px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[24px] rounded-[4px]'
                    >
                        СОЗДАТЬ ЗАЯВКУ
                    </Link>
                </div>
            </Card>

            <Card
                shadow='sm'
                padding='lg'
                radius='md'
                withBorder
                className='flex-1 h-full max-w-[370px] lg:max-w-none'
            >
                <Flex
                    justify='center'
                    mb='xs'
                    className='flex flex-col items-center xl:gap-y-4'
                >
                    <Text fw={800}>РЕКЛАМОДАТЕЛЯМ</Text>
                    <Text size='sm' c='dimmed' fw={400}>
                        Хотите, чтобы вашу рекламу увидели целевые клиенты?
                    </Text>
                </Flex>
                <Image
                    src='/assets/images/Vector 3.png'
                    height={360}
                    width={360}
                    alt='Norway'
                />
                <div className='flex justify-center'>
                    <Link
                        href={'#contact-us'}
                        className='flex justify-center w-[200px] bg-[#FF8787] font-semibold text-[12px] text-white py-[10px] px-[13px] lg:py-[13px] lg:px-[16px] xl:py-[16px] xl:px-[24px] rounded-[4px]'
                    >
                        ЗАПОЛНИТЬ ФОРМУ
                    </Link>
                </div>
            </Card>
        </div>
    )
}
