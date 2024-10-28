'use client'

import { useUserStore } from '@/core/providers/userStoreContext'
import { providerRequest } from '@/entities/provider-request'
import { Box, Button, Flex, Loader, Paper, Select, Text } from '@mantine/core'
import Link from 'next/link'

import { role } from '@/shared/helpers/getRole'
import { HorecaRequestDto } from '@/shared/lib/horekaApi/Api'

export function ProductApplicationViews() {
    const user = useUserStore(state => state.user)
    const { data: incomingRequests } =
        providerRequest.useProviderRequestIncomeQuery()

    if (!user || !incomingRequests) return <Loader />

    return (
        <Flex direction='column' gap='md'>
            <Flex direction='column' gap='md'>
                <Flex justify='end' gap='md' align='center'>
                    <Button
                        variant='transparent'
                        c='var(--mantine-color-indigo-4)'
                        component={Link}
                        href={`/user/${role({ user })}/products/hidden-applications`}
                    >
                        Скрытые заявки
                    </Button>
                    <Select
                        data={[
                            { value: 'new', label: 'Сначала новые' },
                            { value: 'old', label: 'Сначала старые' },
                            {
                                value: 'max-match',
                                label: 'По наибольшему совпадению',
                            },
                            {
                                value: 'min-match',
                                label: 'По наименьшему совпадению',
                            },
                        ]}
                        defaultValue='new'
                    />
                </Flex>

                <Paper p='md' withBorder bg='indigo.4'>
                    <Flex justify='space-around'>
                        {[
                            '№ Заявки',
                            'Адрес и дата доставки',
                            'Телефон',
                            'Комментарий',
                            'Дата создания',
                        ].map((tab, index) => (
                            <Text size='md' c='gray.0' key={index}>
                                {tab}
                            </Text>
                        ))}
                    </Flex>
                </Paper>

                {!incomingRequests.data && (
                    <Flex
                        direction='column'
                        justify='center'
                        align='center'
                        h='50vh'
                    >
                        <Text fw={600} size='xl'>
                            Скоро здесь появятся новые заявки! А пока вы можете
                            заполнить свой каталог
                        </Text>
                        <Text c='gray'>
                            Перейдите к заполнению каталога в левом меню, нажав
                            на раздел «Мой каталог»
                        </Text>
                    </Flex>
                )}

                {incomingRequests.data?.map((request: HorecaRequestDto) => (
                    <>
                        <Paper p='md' withBorder key={request.id} bg='gray.0'>
                            <Flex justify='space-around'>
                                <Flex direction='column' gap='md' w={115}>
                                    <Text size='md'>{request.id}</Text>
                                    <Text size='xs' c='dimmed'>
                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString()}
                                    </Text>
                                </Flex>

                                <Flex direction='column' gap='xs' w={170}>
                                    <Text size='md'>{request.address}</Text>
                                    <Text size='xs' c='dimmed'>
                                        до{' '}
                                        {new Date(
                                            request.deliveryTime
                                        ).toLocaleDateString()}
                                    </Text>
                                </Flex>

                                <Box w={100}>
                                    <Text size='md'>{request.phone}</Text>
                                </Box>

                                <Flex w={150}>
                                    <Text size='md'>{request.comment}</Text>
                                </Flex>

                                <Flex w={150}>
                                    <Text size='md'>
                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString()}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Paper>
                    </>
                ))}
            </Flex>
        </Flex>
    )
}
