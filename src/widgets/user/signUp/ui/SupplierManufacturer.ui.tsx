import { Button, Flex } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Roles } from '@/shared/constants/roles'
import { useSupplierForm } from '@/shared/hooks/useSupplierForm'
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
    const form = useSupplierForm({
        initialValues: {
            companyName: '',
            companyTaxId: '',
            email: '',
            password: '',
            confirmPassword: '',
            tos: false,
            mobilePhone: '',
            categories: [],
            minOrderAmount: '',
            pickup: false,
            supplierDelivery: false,
            sameDayDelivery: false,
        },
    })
    const router = useRouter()

    const isFullyFilledStepOne =
        form.values.companyName &&
        form.values.companyTaxId &&
        form.values.email &&
        form.values.password &&
        form.values.confirmPassword &&
        form.values.tos

    const isFullyFilledStepTwo =
        form.values.mobilePhone &&
        form.values.categories &&
        form.values.minOrderAmount

    const steps = [StepOne, StepTwo]

    const CurrentStepComponent = steps[currentStep]

    return (
        <form
            onSubmit={form.onSubmit(() => {
                console.log('submit')
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
                        onClick={() =>
                            activeTab === Roles.SupplierManufacturer
                                ? router.push('/user/supplier')
                                : null
                        }
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
