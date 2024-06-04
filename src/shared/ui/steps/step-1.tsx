import { Checkbox, Flex, PasswordInput, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import Link from 'next/link'

import { FormValues } from '@/shared/hooks/useSupplierForm'

type StepOneProps = {
    form: UseFormReturnType<FormValues>
}

export function StepOne({ form }: StepOneProps) {
    return (
        <>
            <TextInput
                type='text'
                label='Укажите название компании'
                placeholder='Например, ООО “Рыба”'
                {...form.getInputProps('companyName')}
            />
            <TextInput
                type='text'
                label='Укажите ИНН компании'
                placeholder='ИНН'
                {...form.getInputProps('companyTaxId')}
            />

            <TextInput
                type='email'
                label='Введите свою электронную почту'
                placeholder='электронная почта'
                leftSection={<IconAt size={16} />}
                {...form.getInputProps('email')}
            />

            <Flex gap='md' align='center'>
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
                    {...form.getInputProps('confirmPassword')}
                />
            </Flex>

            <Checkbox
                {...form.getInputProps('tos', { type: 'checkbox' })}
                label={
                    <span>
                        Поставив галочку, вы принимаете{' '}
                        <Link
                            target='_blank'
                            href='/privacy-policy'
                            className='text-blue-600 underline'
                        >
                            Пользовательское соглашение
                        </Link>
                    </span>
                }
            />
        </>
    )
}
