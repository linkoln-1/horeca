import React from 'react'

import { Paper, Progress, Text, Flex, Grid } from '@mantine/core'

type Step = {
    title: string
    progress: number
}

type RegistrationProgressProps = {
    currentStep: number
}

const steps: Step[] = [
    { title: 'Шаг 1', progress: 100 },
    { title: 'Шаг 2', progress: 100 },
]

export function RegistrationProgress({
    currentStep,
}: RegistrationProgressProps) {
    return (
        <Paper p='sm' className='w-full'>
            <Grid grow>
                {steps.map((step, index) => {
                    const isCurrentStep = index === currentStep
                    const isCompletedStep = index < currentStep

                    let color
                    if (isCurrentStep) {
                        color = 'indigo.4'
                    } else if (isCompletedStep) {
                        color = 'green'
                    } else {
                        color = 'gray'
                    }

                    return (
                        <Grid.Col
                            span={{
                                base: 12,
                                md: 4,
                            }}
                            key={step.title}
                        >
                            <Flex direction='column' gap='xs'>
                                <Text fw={500} c={color}>
                                    {step.title}
                                </Text>
                                <Progress.Root size='xs'>
                                    <Progress.Section
                                        animated={isCurrentStep}
                                        color={color}
                                        value={
                                            isCompletedStep || isCurrentStep
                                                ? 100
                                                : 0
                                        }
                                    />
                                </Progress.Root>
                            </Flex>
                        </Grid.Col>
                    )
                })}
            </Grid>
        </Paper>
    )
}
