import {
    Checkbox,
    Flex,
    NumberInput,
    PasswordInput,
    TextInput,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import Link from 'next/link'

import { HorecaFormValues } from '@/shared/constants'

type StepProps = {
    form: UseFormReturnType<HorecaFormValues>
}

export function HorecaStepOne({ form }: StepProps) {
    return (
        <>
            <TextInput
                type='text'
                label='Укажите название компании'
                placeholder='Например, ООО “Рыба”'
                {...form.getInputProps('name')}
            />
            <NumberInput
                label='Укажите ИНН компании'
                placeholder='ИНН'
                {...form.getInputProps('tin')}
            />

            <TextInput
                type='email'
                label='Введите свою электронную почту'
                placeholder='электронная почта'
                leftSection={<IconAt size={16} />}
                {...form.getInputProps('email')}
            />

            <Flex gap='md'>
                <PasswordInput
                    label='Придумайте пароль'
                    placeholder='Введите пароль'
                    className='w-full'
                    leftSection={<IconLock />}
                    {...form.getInputProps('password')}
                />

                <PasswordInput
                    label='Повторите пароль'
                    placeholder='Повторите пароль'
                    className='w-full'
                    leftSection={<IconLock />}
                    {...form.getInputProps('repeatPassword')}
                />
            </Flex>

            <Checkbox
                {...form.getInputProps('GDPRApproved', { type: 'checkbox' })}
                label={
                    <span>
                        Поставив галочку, вы принимаете{' '}
                        <a
                            href='/Пользовательское соглашение Сфера HoReCa.pdf'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='cursor-pointer hover:underline'
                        >
                            Пользовательское соглашение
                        </a>
                    </span>
                }
            />
        </>
    )
}
