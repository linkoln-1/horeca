'use client'

import { useEffect, useState } from 'react'

import { RateCard } from '@/views/advertising/rates/ui'
import { Box, Button, Grid, GridCol } from '@mantine/core'
import { modals } from '@mantine/modals'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ratesContent, ratesContentType } from '@/shared/constants'
import { RateModal } from '@/shared/ui/rateModal'

export function Rates() {
    const [selectedRate, setSelectedRate] = useState('')
    const [isModalOpen, setModalOpen] = useState(false)
    const [isAgreementAccepted, setAgreementAccepted] = useState(false)

    const router = usePathname()

    const handleCardClick = (rate: ratesContentType) => {
        setSelectedRate(rate.name)
        setModalOpen(true)
    }

    const handleAgreementSubmit = () => {
        setAgreementAccepted(true)
    }

    const handleClose = () => {
        setModalOpen(false)
        setSelectedRate('')
    }

    useEffect(() => {
        if (isModalOpen) {
            modals.open({
                centered: true,
                modalId: 'promotion',
                children: (
                    <RateModal
                        name={selectedRate}
                        isAgreementAccepted={isAgreementAccepted}
                        handleAgreementSubmit={handleAgreementSubmit}
                    />
                ),
                onClose: handleClose,
            })
        }
    }, [isModalOpen, selectedRate, isAgreementAccepted])

    return (
        <Box>
            <Box>
                <Button
                    variant='transparent'
                    component={Link}
                    color={
                        router === '/user/advertising/rates' ? 'blue' : 'black'
                    }
                    href='/user/advertising/rates'
                    fw={400}
                >
                    Тарифы
                </Button>
                <Button
                    variant='transparent'
                    component={Link}
                    href='/user/advertising/advertisement'
                    color={
                        router === '/user/advertising/advertisement'
                            ? 'blue'
                            : 'black'
                    }
                    fw={400}
                >
                    История заявок
                </Button>
            </Box>
            <Grid>
                {ratesContent.map(item => (
                    <GridCol span={4} key={item.id}>
                        <RateCard
                            rate={item}
                            onClick={() => handleCardClick(item)}
                        />
                    </GridCol>
                ))}
            </Grid>
        </Box>
    )
}
