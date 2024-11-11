import {
    Flex,
    Text,
    Divider,
    Paper,
    Image as MantineImage,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import dayjs from 'dayjs'

import { CategoryLabels } from '@/shared/constants'
import {
    PaymentMethod,
    PaymentMethodLabels,
} from '@/shared/constants/paymentMethod'
import { getImageUrl } from '@/shared/helpers'
import { Categories, HorecaRequestDto } from '@/shared/lib/horekaApi/Api'

export function ApplicationsDetailsModals({
    order,
}: {
    order: HorecaRequestDto
}) {
    return (
        <Flex direction='column' gap='md'>
            <Text fw={600} size='xl'>
                Заявка № {order.id}
            </Text>

            <Flex gap='md'>
                <Text size='lg' fw={600}>
                    Информация по заказчику:
                </Text>

                <Flex direction='column' gap='md' w='100%'>
                    <Text>
                        Наименование заказчика: <span>{order.name}</span>
                    </Text>

                    <Text>
                        Менеджер для свявзи:{' '}
                        <span>Макаров Василий Сергеевич</span>
                    </Text>

                    <Text>
                        Телефон для свявзи: <span>{order.phone}</span>
                    </Text>

                    <Text>
                        Принимать заявки до:{' '}
                        <span>
                            {dayjs(order.acceptUntill).format(
                                'YYYY-MM-DD HH:mm'
                            )}
                        </span>
                    </Text>
                </Flex>
            </Flex>

            <Divider orientation='horizontal' />

            <Flex>
                <Text size='lg' fw={600}>
                    Информация для поставщиков:
                </Text>

                <Flex direction='column' gap='md' w='100%'>
                    <Text>
                        Адрес доставки:{' '}
                        <span>
                            {dayjs(order.deliveryTime).format(
                                'YYYY-MM-DD HH:mm'
                            )}
                        </span>
                    </Text>

                    <Text>
                        Способ оплаты:{' '}
                        <span>
                            {
                                PaymentMethodLabels[
                                    order.paymentType as unknown as PaymentMethod
                                ]
                            }
                        </span>
                    </Text>

                    <Text>
                        Телефон для свявзи: <span>{order.phone}</span>
                    </Text>

                    <Text>
                        Принимать заявки до:{' '}
                        <span>
                            {dayjs(order.acceptUntill).format(
                                'YYYY-MM-DD HH:mm'
                            )}
                        </span>
                    </Text>
                </Flex>
            </Flex>

            <Divider orientation='horizontal' />

            <Flex direction='column' gap='md'>
                <Text size='xl' fw={600}>
                    Категория товаров:
                </Text>

                {order.items.map((x, index) => (
                    <Flex direction='column' gap='md' key={index}>
                        <Text>{CategoryLabels[x.category as Categories]}</Text>

                        <Paper key={index} bg='#F5F7FD' p='md'>
                            <Flex justify='space-between' align='center'>
                                <Text>{x.name}</Text>
                                <Text>{x.amount + ' ' + x.unit}</Text>
                                <Text>
                                    {(order.paymentType as unknown as PaymentMethod) !==
                                    PaymentMethod.Deferment
                                        ? 'Отсрочки нет'
                                        : PaymentMethodLabels[
                                              order.paymentType as unknown as PaymentMethod
                                          ]}
                                </Text>

                                <Text>
                                    {order.images?.length === 0
                                        ? 'нет фотографии'
                                        : order.images?.map(x => (
                                              <MantineImage
                                                  key={x.id}
                                                  src={getImageUrl(x.path)}
                                              />
                                          ))}
                                </Text>
                            </Flex>
                        </Paper>
                    </Flex>
                ))}

                {order.comment && (
                    <Flex direction='column' gap='md'>
                        <Text>Комментарий к заказу:</Text>

                        <Paper withBorder p='md'>
                            <Text>{order.comment}</Text>
                        </Paper>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export function handleApplicationsDetailsModals(order: HorecaRequestDto) {
    return modals.open({
        modalId: 'application-modal',
        children: <ApplicationsDetailsModals order={order} />,
        centered: true,
        size: 'xl',
        radius: 'lg',
    })
}
