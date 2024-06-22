'use client'

import { useState } from 'react'

import { Navigation } from '../navigation'
import { Promotion } from './promotion'
import {
    Box,
    Flex,
    Text,
    Grid,
    Paper,
    GridCol,
    Divider,
    Button,
} from '@mantine/core'
import Link from 'next/link'

type detailsType = {
    workTime: string
    accomodationTime: string
}

type ratesContentType = {
    id: number
    name: string
    about: string
    price: string
    time: string
    details: detailsType
}

export function Rates() {
    const ratesContent: ratesContentType[] = [
        {
            id: 1,
            name: '1:1',
            about: '1 объявление на 1 неделю',
            price: '1000руб',
            time: '(за 1 неделю)',
            details: {
                workTime: 'до 5 рабочих дней',
                accomodationTime: 'на 1 неделю',
            },
        },
        {
            id: 2,
            name: 'Срочный',
            about: 'Идеально для компании',
            price: '2000руб',
            time: '(на весь срок)',
            details: {
                workTime: 'в течении 3 часов',
                accomodationTime: 'макс. 2 недели',
            },
        },
        {
            id: 3,
            name: 'Акция',
            about: 'Для скоропортящихся товаров',
            price: '2500руб',
            time: '(за 5 дней)',
            details: {
                workTime: 'до 2 рабочих дней',
                accomodationTime: 'до 5 дней',
            },
        },
    ]

    const [selectedRate, setSelectedRate] = useState<ratesContentType | null>(
        null
    )
    const [isModalOpen, setModalOpen] = useState(false)

    const handleCardClick = (rate: ratesContentType) => {
        setSelectedRate(rate)
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
        setSelectedRate(null)
    }

    return (
        <Box>
            <Navigation />
            <Grid>
                {ratesContent.map(item => {
                    return (
                        <GridCol span={4} key={item.id}>
                            <Paper
                                radius='lg'
                                shadow='lg'
                                c='blue'
                                ta='center'
                                bg='gray.1'
                                p='xs'
                                onClick={() => handleCardClick(item)}
                            >
                                <Text fw={700} size='30px'>
                                    {item.name}
                                </Text>
                                <Text fw={700} mt={10}>
                                    {item.about}
                                </Text>
                                <Divider mt={12} color='gray.5' />
                                <Flex
                                    direction='column'
                                    m='auto'
                                    ta='start'
                                    w={200}
                                    c='black'
                                >
                                    <Box mt={12}>
                                        <Text fw={700}>Модерация</Text>
                                        <Text>{item.details.workTime}</Text>
                                    </Box>
                                    <Box mt={12}>
                                        <Text fw={700}>Размещение</Text>
                                        <Text>
                                            {item.details.accomodationTime}
                                        </Text>
                                    </Box>
                                    <Box mt={12}>
                                        <Text fw={700}>Базовое</Text>
                                        <Text fw={700}>объявление</Text>
                                    </Box>
                                </Flex>
                                <Divider mt={12} color='gray.5' />
                                <Box c='orange' mt={20}>
                                    <Text size='xl'>{item.price}</Text>
                                    <Text>{item.time}</Text>
                                </Box>
                            </Paper>
                        </GridCol>
                    )
                })}
            </Grid>
            <Promotion
                opened={isModalOpen}
                close={handleClose}
                rate={selectedRate}
            />
        </Box>
    )
}
