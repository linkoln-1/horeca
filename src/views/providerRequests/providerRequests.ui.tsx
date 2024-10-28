'use client'

import { useState } from 'react'

import { providerRequest } from '@/entities/provider-request'
import {
    Flex,
    Text,
    Paper,
    Box,
    Divider,
    SegmentedControl,
} from '@mantine/core'

import { applications } from '@/shared/constants/applications'
import { PaymentMethod } from '@/shared/constants/paymentMethod'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import { HorecaRequestDto } from '@/shared/lib/horekaApi/Api'

export function ProviderRequests() {
    const [activeTab, setActiveTab] = useState(applications[1].label)
    const isMobile = useBreakpoint('sm')

    const { data: requests } = providerRequest.useGetAllProviderRequestQuery()

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <Flex direction='column' gap='lg'>
            <Flex gap='md' align='center'>
                <SegmentedControl
                    fullWidth
                    onChange={handleTabChange}
                    value={activeTab}
                    color='indigo.4'
                    data={['В работе', 'Ожидают откликов', 'Завершённые']}
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                />
            </Flex>

            <Flex gap='sm' direction='column'>
                {(!requests || requests?.length === 0) && (
                    <Flex
                        justify='center'
                        direction='column'
                        align='center'
                        h='50vh'
                    >
                        <Text fw={600} size='xl'>
                            Здесь вы будете видеть все ваши заявки и их
                            результат. А пока загрузите товары в каталог
                        </Text>

                        <Text c='gray'>
                            {' '}
                            Это поможет вам выделиться на платформе
                        </Text>
                    </Flex>

                    // <Grid>
                    //     <Grid.Col span={12}>
                    //         <Paper
                    //             bg='gray.1'
                    //             p='md'
                    //             radius='lg'
                    //             withBorder
                    //             shadow='xl'
                    //         >
                    //             <Flex
                    //                 gap='md'
                    //                 align='center'
                    //                 direction='column'
                    //             >
                    //                 <Text size='xl' fw={700}>
                    //                     Вы ещё не направляли предложения!
                    //                 </Text>
                    //                 <Text size='lg'>
                    //                     Вы можете откликаться на любые заявки!
                    //                     Ваши клиенты уже ждут Вас!
                    //                 </Text>
                    //                 <Button
                    //                     variant='filled'
                    //                     color='indigo'
                    //                     component={Link}
                    //                     href='/user/history'
                    //                     size='lg'
                    //                     fullWidth
                    //                 >
                    //                     Перейти к заявкам
                    //                 </Button>
                    //             </Flex>
                    //         </Paper>
                    //     </Grid.Col>
                    // </Grid>
                )}

                {requests &&
                    requests.map((request: HorecaRequestDto) => (
                        <Paper withBorder p='md' key={request.id}>
                            <Text fw={700}>
                                № {request.id} от{' '}
                                {new Date(
                                    request.createdAt
                                ).toLocaleDateString()}
                            </Text>
                            <Box>
                                <Text size='xl' fw={700}>
                                    Доставка по адресу: {request.address}
                                </Text>
                                <Flex direction='column' mt='md'>
                                    <Text c='dimmed'>
                                        Время доставки:{' '}
                                        {new Date(
                                            request.deliveryTime
                                        ).toLocaleString()}
                                    </Text>
                                    <Text c='dimmed'>
                                        Принять до:{' '}
                                        {new Date(
                                            request.acceptUntill
                                        ).toLocaleString()}
                                    </Text>
                                    <Text c='dimmed'>
                                        Тип оплаты:{' '}
                                        {request.paymentType
                                            ? PaymentMethod.PaymentUponDelivery
                                            : 'Не указан'}
                                    </Text>
                                    <Text c='dimmed'>
                                        Телефон: {request.phone}
                                    </Text>
                                </Flex>
                                <Divider my='xs' size='xs' color='gray.4' />
                                <Text fw={700} mt='sm'>
                                    Товары:
                                </Text>
                                <Flex direction='column' gap='sm'>
                                    {request.items.map((item, index) => (
                                        <Box key={index}>
                                            <Text>
                                                {item.name} — {item.amount} шт.
                                            </Text>
                                        </Box>
                                    ))}
                                </Flex>
                                <Divider my='xs' size='xs' color='gray.4' />
                                <Text c='dimmed' mt='sm'>
                                    Комментарий:{' '}
                                    {request.comment || 'Нет комментариев'}
                                </Text>
                            </Box>
                        </Paper>
                    ))}
            </Flex>
        </Flex>
    )
}
