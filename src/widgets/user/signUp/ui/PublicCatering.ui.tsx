import { userQueries } from '@/entities/user'
import { HorecaStepOne, HorecaStepTwo } from '@/features/signUpHorecaSteps'
import { Button, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'

import { HorecaFormValues, roles } from '@/shared/constants'
import {
    validateAddresses,
    validateEmail,
    validatePhone,
} from '@/shared/helpers/validateMantineForm'

type PublicCateringProps = {
    nextStep: () => void
    currentStep: number
    activeTab: string
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
        validateInputOnBlur: true,
        validate: values => {
            const errors: Record<string, string> = {}

            if (currentStep === 0) {
                errors.name =
                    values.name.trim().length === 0 ? 'Имя обязательно' : ''
                errors.tin = values.tin.length === 0 ? 'ИНН обязательно' : ''
                errors.email = !validateEmail(values.email)
                    ? 'Email обязателен'
                    : ''
                errors.password =
                    values.password.length < 8
                        ? 'Пароль должен содержать не менее 8 символов'
                        : ''
                errors.repeatPassword =
                    values.repeatPassword !== values.password
                        ? 'Пароли не совпадают'
                        : ''
                errors.GDPRApproved = !values.GDPRApproved
                    ? 'Необходимо согласие на обработку данных'
                    : ''
            }

            if (currentStep === 1) {
                errors.phone =
                    values.phone.length === 0
                        ? 'Телефон обязателен'
                        : !validatePhone(values.phone)
                          ? 'Введен некорректный телефон'
                          : ''

                const addressErrors = validateAddresses(
                    values.profile.addresses
                )
                Object.assign(errors, addressErrors)
            }

            return errors
        },
    })

    const { mutateAsync: signUpUser, isPending } =
        userQueries.useRegisterUserMutation()

    const isFullyFilledStepOne = form.isValid()
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
                    <Button type='submit' disabled={!isFullyFilledStepOne}>
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
