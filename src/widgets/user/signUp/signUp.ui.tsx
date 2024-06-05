import { useState } from 'react'

import { PublicCatering } from '@/widgets/user/signUp/ui'
import { SupplierManufacturer } from '@/widgets/user/signUp/ui'
import { Flex, SegmentedControl, Text } from '@mantine/core'

import { roles } from '@/shared/constants/roles'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import { ProfileType } from '@/shared/lib/horekaApi/Api'

type SignUpProps = {
    nextStep: () => void
    currentStep: number
}

export function SignUp({ nextStep, currentStep }: SignUpProps) {
    const [activeTab, setActiveTab] = useState(roles[0].label)
    const isMobile = useBreakpoint('sm')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab as ProfileType)
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
                data={[roles[0].label, roles[1].label]}
                orientation={isMobile ? 'vertical' : 'horizontal'}
            />

            {activeTab === roles[0].label ? (
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
