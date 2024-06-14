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
            profileType: roles[1].role,
            profile: {
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
        validate: {},
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
                    // router.push('/user/horeca')
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
