import { toast } from 'react-toastify'

import { userQueries } from '@/entities/user'
import { SignUpStepOne, SignUpStepTwo } from '@/features/signUpSupplierSteps'
import { Button, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'

import { errors, FormValues } from '@/shared/constants'
import { ErrorDto, ProfileType } from '@/shared/lib/horekaApi/Api'

type SupplierManufacturerProps = {
    nextStep: () => void
    currentStep: number
}

type ErrorType = {
    error: ErrorDto['error']
    message: ErrorDto['message']
    statusCode: ErrorDto['statusCode']
}
export function SupplierManufacturer({
    nextStep,
    currentStep,
}: SupplierManufacturerProps) {
    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            tin: '',
            email: '',
            password: '',
            repeatPassword: '',
            GDPRApproved: false,
            phone: '',
            profile: {
                profileType: ProfileType.Provider,
                deliveryMethods: [],
                categories: [],
                minOrderAmount: 0,
            },
        },
        validateInputOnBlur: true,
        validate: {
            name: value => (value ? null : 'Имя обязательно'),
            tin: value => (value ? null : 'ИНН обязателен'),
            email: value => (value ? null : 'Email обязателен'),
            password: value => (value ? null : 'Пароль обязателен'),
            repeatPassword: (value, values) =>
                value === values.password ? null : 'Пароли не совпадают',
            GDPRApproved: value =>
                value ? null : 'Необходимо согласие на обработку данных',
        },
    })

    const { mutateAsync: signUpUser, error } =
        userQueries.useRegisterUserMutation()

    const isFullyFilledStepOne = form.isValid()

    const isFullyFilledStepTwo =
        form.values.profile.categories.length > 0 &&
        form.values.profile.minOrderAmount > 0 &&
        form.values.profile.deliveryMethods.length > 0

    const steps = [SignUpStepOne, SignUpStepTwo]

    const CurrentStepComponent = steps[currentStep]

    const handleSubmit = async () => {
        try {
            if (currentStep === steps.length - 1) {
                await signUpUser(form.values)
                toast.success('Вы успешно зарегистрировались! Проверьте почту и подтвердите email по ссылке в письме.')
            } else {
                nextStep()
            }
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction='column' gap='xl'>
                <CurrentStepComponent form={form} />
            </Flex>
            <Flex direction='column' justify='center' mt='xl' gap='lg'>
                {currentStep < steps.length - 1 ? (
                    <Button
                        type='submit'
                        disabled={!isFullyFilledStepOne}
                        color='indigo.4'
                    >
                        Продолжить
                    </Button>
                ) : (
                    <Button
                        type='submit'
                        color='indigo.4'
                        disabled={!isFullyFilledStepTwo}
                    >
                        Завершить регистрацию
                    </Button>
                )}
            </Flex>
        </form>
    )
}
