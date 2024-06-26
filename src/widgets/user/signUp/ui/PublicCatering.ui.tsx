import { userQueries } from '@/entities/user'
import { HorecaStepOne, HorecaStepTwo } from '@/features/signUpHorecaSteps'
import { Button, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { HorecaFormValues, roles } from '@/shared/constants'

type PublicCateringProps = {
    nextStep: () => void
    currentStep: number
    activeTab: string
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone)
}

export function PublicCatering({ nextStep, currentStep }: PublicCateringProps) {
    const form = useForm<HorecaFormValues>({
        initialValues: {
            name: '',
            tin: '',
            email: '',
            password: '',
            repeatPassword: '',
            GDPRApproved: false,
            phone: '',
            profile: {
                profileType: roles[1].role,
                info: '',
                addresses: [
                    {
                        address: '',
                        weekdays: [],
                        moFrom: '',
                        moTo: '',
                        tuFrom: '',
                        tuTo: '',
                        weFrom: '',
                        weTo: '',
                        thFrom: '',
                        thTo: '',
                        frFrom: '',
                        frTo: '',
                        saFrom: '',
                        saTo: '',
                        suFrom: '',
                        suTo: '',
                    },
                ],
            },
        },
        validate: {
            name: value =>
                value.trim().length === 0 ? 'Имя обязательно' : null,
            tin: value =>
                value.trim().length === 0 ? 'ИНН обязательно' : null,
            email: value => (!validateEmail(value) ? 'Email Обязателен' : null),
            password: value =>
                value.length < 8
                    ? 'Пароль должен содержать не менее 8 символов'
                    : null,
            repeatPassword: (value, values) =>
                value !== values.password ? 'Пароли не совпадают' : null,
            phone: value => (!validatePhone(value) ? 'номер обязателен' : null),
        },
    })

    const { mutateAsync: signUpUser, isPending } =
        userQueries.useRegisterUserMutation()
    const router = useRouter()

    const isFullyFilledStepOne =
        form.values.name &&
        form.values.tin &&
        form.values.email &&
        form.values.password &&
        form.values.repeatPassword &&
        form.values.GDPRApproved

    const isFullyFilledStepTwo =
        form.values.phone && form.values.profile.addresses.length > 0

    const steps = [HorecaStepOne, HorecaStepTwo]
    const CurrentStepComponent = steps[currentStep]

    return (
        <form
            onSubmit={form.onSubmit(async () => {
                if (currentStep === steps.length - 1) {
                    await signUpUser(form.values)
                } else {
                    nextStep()
                }
            })}
        >
            <Flex direction='column' gap='xl'>
                <CurrentStepComponent form={form} />
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
