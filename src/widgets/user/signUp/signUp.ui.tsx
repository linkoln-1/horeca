import { useState } from 'react'

import { PublicCatering } from '@/widgets/user/signUp/ui'
import { SupplierManufacturer } from '@/widgets/user/signUp/ui'
import { Flex, SegmentedControl, Text } from '@mantine/core'

import { Roles } from '@/shared/constants/roles'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

type SignUpProps = {
    nextStep: () => void
    currentStep: number
}

export function SignUp({ nextStep, currentStep }: SignUpProps) {
    const [activeTab, setActiveTab] = useState(Roles.SupplierManufacturer)
    const isMobile = useBreakpoint('sm')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab as Roles)
    }

    return (
        <Flex direction='column' gap='md' className='bg-white' p='md'>
            <Text size='md' fw={600}>
                Укажите ваш статус
            </Text>
            <SegmentedControl
                fullWidth
                onChange={handleTabChange}
                value={activeTab}
                color='blue'
                data={[Roles.SupplierManufacturer, Roles.PublicCatering]}
                orientation={isMobile ? 'vertical' : 'horizontal'}
            />

            {activeTab === Roles.SupplierManufacturer ? (
                <SupplierManufacturer
                    nextStep={nextStep}
                    currentStep={currentStep}
                    activeTab={activeTab}
                />
            ) : (
                <PublicCatering
                    nextStep={nextStep}
                    currentStep={currentStep}
                    activeTab={activeTab}
                />
            )}
        </Flex>
    )
}
