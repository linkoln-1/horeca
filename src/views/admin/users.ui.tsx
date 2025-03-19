'use client'

import React, { useState } from 'react'

import { userQueries } from '@/entities/user'
import {
    Flex,
    Text,
    Loader,
    Box,
    Table,
    SegmentedControl,
    Button,
    ScrollArea,
} from '@mantine/core'

import { CategoryLabels, roles } from '@/shared/constants'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'
import { ProfileType, UserRole } from '@/shared/lib/horekaApi/Api'

import '@/styles/chat.scss'

const limit = 10

export function UsersView() {
    const isMobile = useBreakpoint('sm')
    const [activeTab, setActiveTab] = useState(roles[0].role)

    const {
        data: users,
        hasNextPage,
        isFetching,
        fetchNextPage,
    } = userQueries.useGetUsersInfiniteQuery({
        limit: limit,
        search: { role: activeTab as UserRole },
    })

    if (!users) return <Loader />

    return (
        <Flex style={{ maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
            <Flex direction='column' style={{ width: '100%' }} gap={10}>
                <Flex
                    className='rounded-t-xl'
                    px='md'
                    py='md'
                    align='center'
                    bg='indigo.1'
                >
                    <Flex justify='center' align='center' w='100%'>
                        <Box>
                            <Text fw='600' size='xl'>
                                Список пользователей
                            </Text>
                        </Box>
                    </Flex>
                </Flex>

                <ScrollArea h='calc(100vh - 400px)'>
                    <Flex gap='md' align='center'>
                        {' '}
                        <SegmentedControl
                            fullWidth
                            onChange={setActiveTab}
                            value={activeTab}
                            color='indigo.4'
                            data={roles.map(role => ({
                                label: role.label,
                                value: role.role,
                            }))}
                            orientation={isMobile ? 'vertical' : 'horizontal'}
                            w={isMobile ? '100%' : ''}
                        />
                    </Flex>
                    <div style={{ width: '100%' }}>
                        <Table.ScrollContainer minWidth={500}>
                            <Table w='100%' h='100%'>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Имя</Table.Th>
                                        <Table.Th>Роль</Table.Th>
                                        <Table.Th>Email</Table.Th>
                                        <Table.Th>Телефон</Table.Th>
                                        {activeTab == ProfileType.Horeca && <Table.Th>Адреса</Table.Th>}
                                        {activeTab == ProfileType.Provider && <Table.Th>Категории</Table.Th>}
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {users.map(element => (
                                        <Table.Tr key={element.id}>
                                            <Table.Td>{element.name}</Table.Td>
                                            <Table.Td>{element.role}</Table.Td>
                                            <Table.Td>{element.email}</Table.Td>
                                            <Table.Td>{element.phone}</Table.Td>

                                            {activeTab == ProfileType.Horeca && <Table.Td>
                                                {(
                                                    element.profile
                                                        ?.addresses || []
                                                ).map((a: any) => a.address).join(', ')}
                                            </Table.Td>}
                                            {activeTab == ProfileType.Provider && <Table.Td>
                                                {(
                                                    element.profile
                                                        ?.categories || []
                                                )
                                                    .map(
                                                        cat =>
                                                            CategoryLabels[
                                                            cat as keyof typeof CategoryLabels
                                                            ] || ''
                                                    )
                                                    .join(', ')}
                                            </Table.Td>}

                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>
                    </div>
                </ScrollArea>
                <Flex
                    className='rounded-b-xl'
                    px='md'
                    py='md'
                    align='center'
                    bg='indigo.1'
                >
                    <Flex justify='center' align='center' w='100%' h={30}>
                        {hasNextPage && (
                            <Flex maw={200} w='100%' className='mx-auto'>
                                <Button
                                    fullWidth
                                    onClick={() => fetchNextPage()}
                                    loading={isFetching}
                                    bg='indigo.4'
                                >
                                    Загрузить еще
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
