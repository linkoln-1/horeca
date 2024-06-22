import React from 'react'

import { Box, Paper, Text, Divider, Flex } from '@mantine/core'
import { IconProps } from '@tabler/icons-react'

import { ratesContentType } from '@/shared/constants'

type RateCardProps = {
    rate: ratesContentType
    onClick: (rate: ratesContentType) => void
}

export function RateCard({ rate, onClick }: RateCardProps) {
    const Icon = rate.icon as React.FC<IconProps>
    return (
        <Paper
            radius='lg'
            shadow='lg'
            c='blue'
            ta='center'
            bg='gray.1'
            p='xs'
            onClick={() => {
                onClick(rate)
            }}
        >
            <Flex justify='center'>
                <Icon size={120} stroke={1} />
            </Flex>
            <Text fw={700} size='30px'>
                {rate.name}
            </Text>

            <Text fw={700} mt={10}>
                {rate.about}
            </Text>
            <Divider mt={12} color='gray.5' />
            <Flex direction='column' m='auto' ta='start' w={200} c='black'>
                <Box mt={12}>
                    <Text fw={700}>Модерация</Text>
                    <Text>{rate.details.workTime}</Text>
                </Box>
                <Box mt={12}>
                    <Text fw={700}>Размещение</Text>
                    <Text>{rate.details.accomodationTime}</Text>
                </Box>
                <Box mt={12}>
                    <Text fw={700}>Базовое</Text>
                    <Text fw={700}>объявление</Text>
                </Box>
            </Flex>
            <Divider mt={12} color='gray.5' />
            <Box c='orange' mt={20}>
                <Text size='xl'>{rate.price}</Text>
                <Text>{rate.time}</Text>
            </Box>
        </Paper>
    )
}
