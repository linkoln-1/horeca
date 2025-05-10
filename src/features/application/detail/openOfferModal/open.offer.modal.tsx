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
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { CategoryLabels } from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    HorecaRequestWithProviderRequestsDto,
} from '@/shared/lib/horekaApi/Api'

interface OpenOfferModalProps {
    requestData: HorecaRequestWithProviderRequestsDto
    onClose: () => void
}

export function OpenOfferModal({ requestData, onClose }: OpenOfferModalProps) {
    const totalCost = requestData.providerRequests.reduce(
        (sum, providerRequest) => {
            return (
                sum +
                providerRequest.items.reduce(
                    (itemSum, item) => itemSum + item.cost,
                    0
                )
            )
        },
        0
    )

    const availableItemIds = requestData.providerRequests.flatMap(
        providerRequest =>
            providerRequest.items.map(item => item.horecaRequestItemId)
    )

    const availableItems = requestData.items.filter(item =>
        availableItemIds.includes(item.id)
    )

    const unavailableItems = requestData.items.filter(
        item => !availableItemIds.includes(item.id)
    )

    const approveMutation = useApproveRequestMutation()
    const chatCreateMutation = useChatCreateMutation()
    const router = useRouter()

    const handleApprove = async () => {
        try {
            await approveMutation.mutateAsync({
                horecaRequestId: requestData.id,
                providerRequestId: requestData.providerRequests[0]?.id,
            })

            const createdChat = await chatCreateMutation.mutateAsync({
                data: {
                    // @ts-ignore
                    opponentId: requestData.providerRequests[0].user.profile.id,
                    horecaRequestId: requestData.id,
                    providerRequestId: requestData.providerRequests[0].id,
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

    const renderTableRows = (
        items: typeof requestData.items,
        isAvailable: boolean
    ) => {
        return items.map((item, index) => {
            const providerItem = requestData.providerRequests
                .flatMap(pr => pr.items)
                .find(pi => pi.horecaRequestItemId === item.id)

            return (
                <Table.Tr key={item.id}>
                    <Table.Td
                        className={`border-b-${isAvailable ? 'green' : 'red'}-800 border-b-2 bg-${isAvailable ? 'green' : 'red'}-200`}
                    >
                        {index + 1}
                    </Table.Td>
                    <Table.Td
                        className={`border-b-${isAvailable ? 'green' : 'red'}-800 border-b-2 bg-${isAvailable ? 'green' : 'red'}-200`}
                    >
                        {item.name}
                    </Table.Td>
                    <Table.Td
                        className={`border-b-${isAvailable ? 'green' : 'red'}-800 border-b-2 bg-${isAvailable ? 'green' : 'red'}-200`}
                    >
                        {item.amount} {item.unit}
                    </Table.Td>
                    <Table.Td
                        className={`border-b-${isAvailable ? 'green' : 'red'}-800 border-b-2 bg-${isAvailable ? 'green' : 'red'}-200`}
                    >
                        {providerItem?.manufacturer
                            ? providerItem.manufacturer
                            : 'Нет'}
                    </Table.Td>
                    <Table.Td
                        className={`border-b-${isAvailable ? 'green' : 'red'}-800 border-b-2 bg-${isAvailable ? 'green' : 'red'}-200`}
                    >
                        {providerItem?.cost ? providerItem.cost : 0}
                    </Table.Td>
                    <Table.Td
                        className={`border-b-${isAvailable ? 'green' : 'red'}-800 border-b-2 bg-${isAvailable ? 'green' : 'red'}-200`}
                    >
                        {providerItem?.images?.length ? (
                            <Flex wrap='wrap' gap='5px'>
                                {providerItem.images.map((img, i) => (
                                    <MantineImage
                                        key={i}
                                        src={getImageUrl(img.path)}
                                        w='50px'
                                        h='50px'
                                        radius='lg'
                                        fit='cover'
                                    />
                                ))}
                            </Flex>
                        ) : (
                            'Нет фотографий'
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
                    src={getImageUrl(
                        requestData.providerRequests[0].user.avatar?.path
                    )}
                />
                <Flex direction='column' gap='md'>
                    <Text>
                        Поставщик: {requestData.providerRequests[0].user.name}
                    </Text>
                    <Text>
                        Рейтинг: {requestData.providerRequests[0].user.rating} /
                        5.0
                    </Text>
                    <Text>
                        Совпадение по заявке:{' '}
                        {requestData.providerRequests[0].cover}%
                    </Text>
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
                <Text fw='600'>Категория товаров:</Text>
                <Box>
                    {Array.from(
                        new Set(requestData.items.map(item => item.category))
                    ).map(category => (
                        <Box key={category}>
                            <Text mt='lg'>
                                {category in CategoryLabels
                                    ? CategoryLabels[category as Categories]
                                    : category}
                            </Text>

                            {unavailableItems.filter(
                                item => item.category === category
                            ).length > 0 && (
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
                                            {renderTableRows(
                                                unavailableItems.filter(
                                                    item =>
                                                        item.category ===
                                                        category
                                                ),
                                                false
                                            )}
                                        </Table.Tbody>
                                    </Table>
                                </>
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
                                                availableItems.filter(
                                                    item =>
                                                        item.category ===
                                                        category
                                                ),
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
