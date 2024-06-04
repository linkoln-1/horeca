import {
    Button,
    TextInput,
    Checkbox,
    Textarea,
    Group,
    Flex,
    PasswordInput,
} from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import Link from 'next/link'

type PublicCateringProps = {
    nextStep: () => void
    currentStep: number
    activeTab: string
}

type DeliveryTime = {
    day: string
    from: Date
    to: Date
}
type FormValues = {
    companyName: string
    companyTaxId: string
    email: string
    password: string
    confirmPassword: string
    tos: boolean
    mobileNumber: string
    deliveryAddress: string
    deliveryTimes: DeliveryTime[]
    additionalInfo: string
}

export function PublicCatering({ nextStep, currentStep }: PublicCateringProps) {
    const form = useForm<FormValues>({
        initialValues: {
            companyName: '',
            companyTaxId: '',
            email: '',
            password: '',
            confirmPassword: '',
            tos: false,
            mobileNumber: '',
            deliveryAddress: '',
            deliveryTimes: [
                { day: 'Понедельник', from: new Date(), to: new Date() },
                { day: 'Вторник', from: new Date(), to: new Date() },
                { day: 'Среда', from: new Date(), to: new Date() },
                { day: 'Четверг', from: new Date(), to: new Date() },
                { day: 'Пятница', from: new Date(), to: new Date() },
                { day: 'Суббота', from: new Date(), to: new Date() },
                { day: 'Воскресенье', from: new Date(), to: new Date() },
            ],
            additionalInfo: '',
        },
        validate: {
            companyName: value =>
                value ? null : 'Название компании обязательно',
            companyTaxId: value => (value ? null : 'ИНН компании обязателен'),
            email: value => (value ? null : 'Email обязателен'),
            password: value => (value ? null : 'Пароль обязателен'),
            confirmPassword: (value, values) =>
                value === values.password ? null : 'Пароли не совпадают',
            tos: value =>
                value ? null : 'Пользовательское соглашение обязательно',
            mobileNumber: value =>
                value ? null : 'Контактный номер обязателен',
            deliveryAddress: value =>
                value ? null : 'Адрес доставки обязателен',
            deliveryTimes: value =>
                value.length > 0 ? null : 'Укажите время доставки',
        },
    })

    const isFullyFilledStepOne =
        form.values.companyName &&
        form.values.companyTaxId &&
        form.values.email &&
        form.values.password &&
        form.values.confirmPassword &&
        form.values.tos

    const isFullyFilledStepTwo =
        form.values.mobileNumber &&
        form.values.deliveryAddress &&
        form.values.deliveryTimes.length

    const PublicCateringStepOne = () => (
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

    const PublicCateringStepTwo = () => (
        <>
            <TextInput
                required
                label='Контактный номер для связи с поставщиком'
                placeholder='Номер мобильного телефона'
                {...form.getInputProps('mobileNumber')}
            />

            <TextInput
                required
                label='Адрес доставки'
                placeholder='Например, Г. Сочи, ул. Ленина, д.15, корп.7.'
                {...form.getInputProps('deliveryAddress')}
            />

            {form.values.deliveryTimes.map((_, index) => (
                <Group key={index} grow align='center'>
                    <Checkbox label={form.values.deliveryTimes[index].day} />
                    <TimeInput
                        size='xs'
                        label='C'
                        {...form.getInputProps(`deliveryTimes[${index}].from`)}
                    />
                    <TimeInput
                        size='xs'
                        label='До'
                        {...form.getInputProps(`deliveryTimes[${index}].to`)}
                    />
                </Group>
            ))}

            <Textarea
                label='Информация о приёмке, которую должен знать поставщик'
                placeholder='Добавьте комментарий до 250 символов...'
                {...form.getInputProps('additionalInfo')}
            />
        </>
    )

    const steps = [PublicCateringStepOne, PublicCateringStepTwo]

    return (
        <form onSubmit={form.onSubmit(values => console.log(values))}>
            <Flex direction='column' gap='xl'>
                {steps && steps[currentStep]()}
            </Flex>

            <Flex direction='column' justify='center' mt='xl' gap='lg'>
                {currentStep < steps.length - 1 ? (
                    <Button onClick={nextStep} disabled={!isFullyFilledStepOne}>
                        Продолжить
                    </Button>
                ) : (
                    <Button
                        type='submit'
                        color='blue'
                        disabled={!isFullyFilledStepTwo}
                    >
                        Завершить регистрацию
                    </Button>
                )}
                <Button variant='default' component={Link} href='/#'>
                    на главную
                </Button>
            </Flex>
        </form>
    )
}
