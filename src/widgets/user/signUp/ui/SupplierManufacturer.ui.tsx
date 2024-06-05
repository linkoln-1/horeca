import { userQueries } from '@/entities/user'
import { Button, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormValues } from '@/shared/constants'
import { roles } from '@/shared/constants/roles'
import { StepOne } from '@/shared/ui/steps/step-1'
import { StepTwo } from '@/shared/ui/steps/step-2'

type SupplierManufacturerProps = {
    nextStep: () => void
    currentStep: number
    activeTab: string
}

export function SupplierManufacturer({
    nextStep,
    currentStep,
    activeTab,
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
            profileType: roles[0].role,
            profile: {
                deliveryMethods: [],
                categories: [],
                minOrderAmount: 0,
            },
        },
        validate: {
            name: value => (value ? null : 'Имя обязательно'),
            tin: value => (value ? null : 'ИНН обязателен'),
            email: value => (value ? null : 'Email обязателен'),
            phone: value => (value ? null : 'Телефон обязателен'),
            password: value => (value ? null : 'Пароль обязателен'),
            repeatPassword: (value, values) =>
                value === values.password ? null : 'Пароли не совпадают',
            GDPRApproved: value =>
                value ? null : 'Необходимо согласие на обработку данных',
        },
    })

    console.log(form.values)

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
        form.values.profile.categories.length > 0 &&
        form.values.profile.minOrderAmount > 0 &&
        form.values.profile.deliveryMethods.length > 0
    const steps = [StepOne, StepTwo]

    const CurrentStepComponent = steps[currentStep]

    return (
        <form
            onSubmit={form.onSubmit(async () => {
                if (currentStep === steps.length - 1) {
                    router.push('/user/supplier')
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
                        onClick={async () => await signUpUser(form.values)}
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
