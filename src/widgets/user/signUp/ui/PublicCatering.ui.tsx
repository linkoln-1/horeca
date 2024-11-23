import { toast } from 'react-toastify'

import { userQueries } from '@/entities/user'
import { HorecaStepOne, HorecaStepTwo } from '@/features/signUpHorecaSteps'
import { Button, Flex, LoadingOverlay } from '@mantine/core'
import { useForm } from '@mantine/form'

import { errors, HorecaFormValues } from '@/shared/constants'
import {
    validateAddresses,
    validateEmail,
    validatePhone,
} from '@/shared/helpers/validateMantineForm'
import { ProfileType } from '@/shared/lib/horekaApi/Api'

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
                profileType: ProfileType.Horeca,
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
            if (currentStep === 0) {
                return {
                    name:
                        values.name.trim().length === 0
                            ? 'Имя обязательно'
                            : null,
                    tin: values.tin.length === 0 ? 'ИНН обязательно' : null,
                    email: !validateEmail(values.email)
                        ? 'Некорректный email'
                        : null,
                    password:
                        values.password.length < 8
                            ? 'Пароль должен быть не менее 8 символов'
                            : null,
                    repeatPassword:
                        values.repeatPassword !== values.password
                            ? 'Пароли не совпадают'
                            : null,
                    GDPRApproved: !values.GDPRApproved
                        ? 'Необходимо согласие на обработку данных'
                        : null,
                }
            }

            if (currentStep === 1) {
                return {
                    phone: !validatePhone(values.phone)
                        ? 'Некорректный телефон'
                        : null,
                    ...validateAddresses(values.profile.addresses),
                }
            }

            return {}
        },
    })

    const { mutateAsync: signUpUser, isPending } =
        userQueries.useRegisterUserMutation()

    const isFullyFilledStepOne: boolean = form.isValid()
    const isFullyFilledStepTwo =
        form.values.phone && form.values.profile.addresses.length > 0

    const steps = [HorecaStepOne, HorecaStepTwo]
    const CurrentStepComponent = steps[currentStep]

    const handleSubmit = async () => {
        try {
            if (currentStep === 1) {
                await signUpUser(form.values)
                toast.success('Вы успешно зарегистрировались!')
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

            <LoadingOverlay
                zIndex={1000}
                overlayProps={{ blur: 2 }}
                visible={isPending}
            />
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
