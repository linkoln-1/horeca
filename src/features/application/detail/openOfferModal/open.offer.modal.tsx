'use client'

import { useChatCreateMutation } from '@/entities/chats/chats.queries'
import { useApproveRequestMutation } from '@/entities/horeca-request/request.queries'
import {
    Text,
    Button,
    Flex,
    Box,
    Divider,
    Table,
    Image as MantineImage,
    Avatar,
} from '@mantine/core'
import { IconPhotoOff } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { getImageUrl } from '@/shared/helpers'
import {
    HorecaRequestItemDto,
    IncomeProviderRequestDto,
} from '@/shared/lib/horekaApi/Api'

interface OpenOfferModalProps {
    requestData: IncomeProviderRequestDto
    products: HorecaRequestItemDto[]
    horecaRequestId: number
    providerRequestId: number
    onClose: () => void
}

export function OpenOfferModal({
    requestData,
    products,
    onClose,
    horecaRequestId,
    providerRequestId,
}: OpenOfferModalProps) {
    const totalCost =
        requestData.items?.reduce((sum, item) => sum + (item?.cost ?? 0), 0) ??
        0

    const availableItemIds =
        requestData.items?.map(item => item.horecaRequestItemId) ?? []

    const availableItems =
        requestData.items?.filter(item =>
            availableItemIds.includes(item.horecaRequestItemId)
        ) ?? []

    const unavailableItems =
        products?.filter(p => !availableItemIds.includes(p.id)) ?? []

    const approveMutation = useApproveRequestMutation()
    const chatCreateMutation = useChatCreateMutation()
    const router = useRouter()

    const handleApprove = async () => {
        try {
            await approveMutation.mutateAsync({
                horecaRequestId: horecaRequestId,
                providerRequestId: providerRequestId,
            })

            const createdChat = await chatCreateMutation.mutateAsync({
                data: {
                    // @ts-ignore
                    opponentId: requestData.user.profile.id,
                    horecaRequestId: horecaRequestId,
                    providerRequestId: providerRequestId,
                    type: 'Order',
                },
            })
            onClose()
            if (createdChat?.data.id) {
                router.push(
                    `/user/horeca/providerChatRequest/${createdChat.data.id}`
                )
            }
        } catch (error) {
            console.error('Ошибка при подтверждении запроса', error)
        }
    }
    const renderUnavailableRows = (items: HorecaRequestItemDto[]) => {
        return items.map((item, index) => (
            <Table.Tr key={item.id} bg='red.0'>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>
                    {item.amount} {item.unit}
                </Table.Td>
                <Table.Td colSpan={3} style={{ color: '#f03e3e' }}>
                    Нет предложения от поставщика
                </Table.Td>
            </Table.Tr>
        ))
    }
    const renderTableRows = (
        items: typeof requestData.items,
        isAvailable: boolean
    ) => {
        const rowBg = isAvailable ? 'green.0' : 'red.0'
        const borderColor = isAvailable ? 'green.4' : 'red.4'
        const textColor = isAvailable ? 'green.9' : 'red.9'

        return items.map((item, index) => {
            return (
                <Table.Tr
                    key={item.id}
                    bg={rowBg}
                    style={{
                        borderBottom: `2px solid var(--mantine-color-${borderColor})`,
                    }}
                >
                    <Table.Td>
                        <Text c={textColor} fw={500}>
                            {index + 1}
                        </Text>
                    </Table.Td>
                    <Table.Td>
                        <Text c={textColor}>{products[index].name}</Text>
                    </Table.Td>
                    <Table.Td>
                        <Text c={textColor}>
                            {products[index].amount} {products[index].unit}
                        </Text>
                    </Table.Td>
                    <Table.Td>
                        <Text c={textColor}>{item?.manufacturer || '—'}</Text>
                    </Table.Td>
                    <Table.Td>
                        <Text c={textColor}>
                            {item?.cost ? `${item.cost} ₽` : '—'}
                        </Text>
                    </Table.Td>
                    <Table.Td>
                        {item?.images?.length ? (
                            <Flex wrap='wrap' gap={6}>
                                {item?.images.map((img, i) => (
                                    <MantineImage
                                        key={i}
                                        src={getImageUrl(img.path)}
                                        w={50}
                                        h={50}
                                        radius='md'
                                        fit='cover'
                                        alt={`Фото ${item.id}`}
                                        style={{ border: '1px solid #e0e0e0' }}
                                    />
                                ))}
                            </Flex>
                        ) : (
                            <Flex align='center' gap={4} c='gray.6'>
                                <IconPhotoOff size={18} />
                                <Text size='sm'>Нет фото</Text>
                            </Flex>
                        )}
                    </Table.Td>
                </Table.Tr>
            )
        })
    }

    return (
        <Flex gap='lg' direction='column' align='center'>
            <Text w='100%' c='gray.6'>
                Дата и время отклика:{' '}
                {dayjs(requestData.createdAt).format('DD.MM.YYYY')}{' '}
                {dayjs(requestData.createdAt).format('HH:mm')}
            </Text>
            <Flex w='100%' gap='xl'>
                <Avatar
                    w='120px'
                    h='120px'
                    radius='lg'
                    src={getImageUrl(requestData.user.avatar?.path)}
                />
                <Flex direction='column' gap='md'>
                    <Text>Поставщик: {requestData.user.name}</Text>
                    <Text>Рейтинг: {requestData.user.rating} / 5</Text>
                    <Text>Совпадение по заявке: {requestData.cover}%</Text>
                </Flex>
            </Flex>

            <Divider w='100%' />

            <Flex w='100%' my='md' justify='space-between'>
                <Text size='lg' fw='600' tt='uppercase'>
                    Итоговая сумма по заявке:
                </Text>
                <Text size='lg' fw='600'>
                    {totalCost}
                </Text>
            </Flex>
            <Divider mb='lg' w='100%' />
            <Box w='100%'>
                {/* <Text fw='600'>Категория товаров:</Text> */}
                <Box>
                    {Array.from(
                        new Set(requestData.items.map(item => item.category))
                    ).map(category => (
                        <Box key={category}>
                            {/* <Text mt='lg'>
                                {category in CategoryLabels
                                    ? CategoryLabels[category as Categories]
                                    : category}
                            </Text> */}

                            {unavailableItems.length >= 1 ? (
                                <>
                                    <Text my='lg' c='pink.7'>
                                        Нет в наличии
                                    </Text>
                                    <Table
                                        borderColor='white'
                                        verticalSpacing='xl'
                                        horizontalSpacing='lg'
                                        withColumnBorders
                                        mb='sm'
                                    >
                                        <Table.Tbody className='text-base'>
                                            {renderUnavailableRows(
                                                unavailableItems
                                            )}
                                        </Table.Tbody>
                                    </Table>
                                </>
                            ) : (
                                ''
                            )}

                            {availableItems.filter(
                                item => item.category === category
                            ).length > 0 && (
                                <>
                                    <Text my='lg' c='green.7'>
                                        Есть в наличии
                                    </Text>
                                    <Table
                                        borderColor='white'
                                        verticalSpacing='xl'
                                        horizontalSpacing='lg'
                                        withColumnBorders
                                    >
                                        <Table.Tbody className='text-base'>
                                            {renderTableRows(
                                                availableItems,
                                                true
                                            )}
                                        </Table.Tbody>
                                    </Table>
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
            <Text w='100%' fw='600' size='lg'>
                Комментарий поставщика:
            </Text>
            <Box className='border-2 border-gray rounded-xl' w='100%' p='md'>
                <Text>{requestData?.comment}</Text>
            </Box>
            <Flex mt='lg' w='100%' justify='space-between' gap='sm'>
                <Button flex={1} bg='indigo' radius='lg' onClick={onClose}>
                    Вернуться к списку предложений
                </Button>
                <Button
                    flex={1}
                    bg='pink.7'
                    radius='lg'
                    onClick={handleApprove}
                >
                    Согласовать и перейти в чат с поставщиком
                </Button>
            </Flex>
        </Flex>
    )
}
