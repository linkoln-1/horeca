import React from 'react'

import { Text, Button, Flex, Box } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

interface PageLeaveModalProps {
    onSave: () => void
    onLeave: () => void
}

export function PageLeaveModal({ onSave, onLeave }: PageLeaveModalProps) {
    return (
        <Box p='md'>
            <Flex direction='column' align='center' gap='lg'>
                <Text c='dimmed' ta='center' size='lg'>
                    Вы внесли изменения в форму. Сохраните их перед выходом,
                    иначе все изменения будут потеряны.
                </Text>

                <Flex gap='md' w='100%' mt='sm'>
                    <Button
                        fullWidth
                        color='indigo'
                        radius='md'
                        onClick={onSave}
                        leftSection={<IconCheck size={18} />}
                    >
                        Сохранить и выйти
                    </Button>
                </Flex>
            </Flex>
        </Box>
    )
}
