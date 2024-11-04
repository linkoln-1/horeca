'use client'

import React, { useState } from 'react'

import {
    Flex,
    Box,
    Text,
    Image as MantineImage,
    Group,
    Divider,
    Input,
    Paper,
    Button,
} from '@mantine/core'
import {
    IconPaperclip,
    IconSend2,
    IconZoomIn,
    IconThumbUpFilled,
    IconThumbDownFilled,
} from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

import {
    assistantMessages,
    assistantChats,
    supplierMessages,
    supplierChats,
} from '@/shared/constants'

import '@/styles/chat.scss'

export function ChatView() {
    const [activeRequest, setActiveRequest] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleActiveRequest = (id: string) => {
        setActiveRequest(id)
    }

    const handleCheckActive = (requestNumber: string) => {
        return activeRequest === requestNumber
    }

    const path = usePathname()
    const isAssistantPage = path.includes('assistant')

    const messages = isAssistantPage ? assistantMessages : supplierMessages
    const chats = isAssistantPage ? assistantChats : supplierChats

    return (
        <Flex>
            {!isAssistantPage ? (
                <Flex direction='column'>
                    <Flex
                        className='rounded-t-xl'
                        px='md'
                        py='md'
                        align='center'
                        bg='indigo.1'
                    >
                        {isAssistantPage && (
                            <Box miw='420px'>
                                <Text fw='500' size='xl'>
                                    Все сообщения
                                </Text>

                                <Text size='xl' c='gray.6'>
                                    Номера запросов
                                </Text>
                            </Box>
                        )}
                        {isAssistantPage ? (
                            <Flex w='calc(100% - 420px)'>
                                <Flex
                                    direction='column'
                                    justify='space-between'
                                >
                                    <Text
                                        fw='500'
                                        size='xl'
                                        className='chatName'
                                    >
                                        Поддержка СФЕРЫ HoReCa
                                    </Text>
                                    <Text
                                        c='indigo'
                                        size='lg'
                                        className='status'
                                    >
                                        Онлайн
                                    </Text>
                                </Flex>
                            </Flex>
                        ) : (
                            <Flex w='calc(100% - 420px)'>
                                <MantineImage
                                    mr='40px'
                                    fit='cover'
                                    w={90}
                                    h={90}
                                    radius='md'
                                    src='/assets/images/bg-5.png'
                                />
                                <Flex
                                    direction='column'
                                    justify='space-between'
                                >
                                    <Text
                                        fw='500'
                                        size='xl'
                                        className='chatName'
                                    >
                                        ООО «МЕТРО Кэш энд Керри»
                                    </Text>
                                    <Text
                                        c='indigo'
                                        size='lg'
                                        className='status'
                                    >
                                        Онлайн
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>

            <Flex h='calc(100vh - 300px)' mah='100vh'>
                <Flex
                    direction='column'
                    className='overflow-y-auto custom-scrollbar'
                    miw='300px'
                    mah='100%'
                >
                    {!isAssistantPage && (
                        <Group
                            style={{
                                borderBottom: `1px solid`,
                            }}
                            wrap='nowrap'
                            px='md'
                            py='md'
                        >
                            <MantineImage
                                mr='27px'
                                fit='cover'
                                w={90}
                                h={90}
                                radius='md'
                                src='/assets/images/bg-5.png'
                            />

                                    <Flex
                                        direction='column'
                                        justify='space-between'
                                    >
                                        <Text
                                            fw='500'
                                            size='xl'
                                            className='chatName'
                                        >
                                            Беседа
                                        </Text>
                                        <Text
                                            c='gray.6'
                                            size='lg'
                                            className='status'
                                        >
                                            Сообщений пока нет
                                        </Text>
                                    </Flex>
                                </Group>
                            )}

                            {chats.map((chat, index) => {
                                return (
                                    <Group
                                        key={index}
                                        onClick={() =>
                                            handleActiveRequest(
                                                chat.requestNumber
                                            )
                                        }
                                        c={
                                            handleCheckActive(
                                                chat.requestNumber
                                            )
                                                ? 'white'
                                                : ''
                                        }
                                        bg={
                                            handleCheckActive(
                                                chat.requestNumber
                                            )
                                                ? 'indigo'
                                                : ''
                                        }
                                        style={{
                                            cursor: 'pointer',
                                            borderBottom: `1px solid`,
                                        }}
                                        wrap='nowrap'
                                        px='lg'
                                        py='lg'
                                    >
                                        <Flex
                                            direction='column'
                                            justify='space-between'
                                        >
                                            <Text
                                                fw='500'
                                                size='xl'
                                                className='request'
                                            >
                                                {isAssistantPage
                                                    ? '№'
                                                    : 'Заявка №'}{' '}
                                                {chat.requestNumber}
                                            </Text>
                                            <Text
                                                c={
                                                    handleCheckActive(
                                                        chat.requestNumber
                                                    )
                                                        ? 'white'
                                                        : 'gray.6'
                                                }
                                                size='lg'
                                                className='date'
                                            >
                                                {chat.requestDate}
                                            </Text>
                                        </Flex>
                                    </Group>
                                )
                            })}
                        </Flex>

                        <Divider orientation='vertical' mt='md' mb='xs' />

                        <Flex
                            pos='relative'
                            direction='column'
                            w='100%'
                            h='100%'
                        >
                            <Text
                                w='100%'
                                my='md'
                                size='lg'
                                c='gray.6'
                                ta='center'
                            >
                                30 июня, 2024
                            </Text>

                            <Flex
                                direction='column'
                                px='xl'
                                flex='1'
                                mah='100%'
                                className='overflow-y-auto custom-scrollbar'
                            >
                                {messages.map((message, index) => {
                                    if (message.type === 'request') {
                                        return (
                                            <RequestCardMessage
                                                key={index}
                                                message={message}
                                            />
                                        )
                                    } else if (
                                        message.type === 'message' &&
                                        message.from === 'me' &&
                                        message.text
                                    ) {
                                        return (
                                            <MessageFromMe
                                                key={index}
                                                text={message.text}
                                            />
                                        )
                                    } else if (
                                        message.type === 'message' &&
                                        message.from !== 'me' &&
                                        message.text
                                    ) {
                                        return (
                                            <MessageToMe
                                                key={index}
                                                text={message.text}
                                            />
                                        )
                                    }
                                })}
                                {!isAssistantPage && <RatingMessage />}
                            </Flex>

                            <Flex
                                w='100%'
                                bg='gray.1'
                                align='center'
                                px='md'
                                py='md'
                                className='chatBodyMessagesInput'
                            >
                                <IconPaperclip
                                    style={{ marginRight: 30 }}
                                    width={36}
                                    height={36}
                                    cursor='pointer'
                                    color='#4299e1'
                                    stroke={2}
                                />
                                <Input
                                    value={message}
                                    onChange={e => handleMessage(e)}
                                    size='lg'
                                    placeholder='Напишите сообщение...'
                                    variant='unstyled'
                                    w='100%'
                                />
                                <Button
                                    variant='transparent'
                                    disabled={!message}
                                >
                                    <IconSend2
                                        width={36}
                                        height={36}
                                        color={message ? '#5E7EEF' : '#A4A4A4'}
                                    />
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            ) : (
                <Flex justify='center' align='center' direction='column'>
                    <Text size='lg'>
                        Здесь вы можете обратиться в службу заботы
                    </Text>
                </Flex>
            )}
        </Flex>
    )
}

function MessageToMe({ text }: { text: string }) {
    return (
        <Box c='white' bg='indigo.6' className='speech-bubble-to-me'>
            {text}
        </Box>
    )
}

function MessageFromMe({ text }: { text: string }) {
    return (
        <Box bg='indigo.1' className='speech-bubble-from-me'>
            {text}
        </Box>
    )
}

function RatingMessage() {
    return (
        <Paper w='70%' mb='lg' ml='auto' px='lg' py='md' withBorder shadow='sm'>
            <Text size='lg' mb='lg' fw='500'>
                Оцените сотрудничество с поставщиком
            </Text>

            <Box mb='md'>
                <Text size='md' mb='md'>
                    1. Товар был доставлен?
                </Text>
                <Flex>
                    <Button
                        fw='400'
                        color='#4DA225'
                        variant='transparent'
                        size='lg'
                    >
                        <IconThumbUpFilled style={{ marginRight: '10px' }} />
                        Да, доставлен
                    </Button>
                    <Button
                        fw='400'
                        color='#DB3C3E'
                        variant='transparent'
                        size='lg'
                    >
                        <IconThumbDownFilled style={{ marginRight: '10px' }} />
                        Нет, не доставлен
                    </Button>
                </Flex>
            </Box>

            <Box>
                <Text size='md' mb='md'>
                    2. Товар пришел качественным?
                </Text>
                <Flex>
                    <Button
                        fw='400'
                        color='#4DA225'
                        variant='transparent'
                        size='lg'
                    >
                        <IconThumbUpFilled style={{ marginRight: '10px' }} />
                        Удовлетворительно
                    </Button>
                    <Button
                        fw='400'
                        color='#DB3C3E'
                        variant='transparent'
                        size='lg'
                    >
                        <IconThumbDownFilled style={{ marginRight: '10px' }} />
                        Нет, возврат
                    </Button>
                </Flex>
            </Box>
        </Paper>
    )
}

function RequestCardMessage({ message }: { message: any }) {
    return (
        <Paper w='70%' mb='lg' ml='auto' px='lg' py='md' withBorder shadow='sm'>
            <Text mb='sm' c='indigo'>
                {message.inStock}
            </Text>
            {message.products?.map((product: any) => {
                return (
                    <>
                        <Box key={product.id}>
                            <Box mb='sm'>
                                <Text mr='xs' fw='500' component='span'>
                                    Категории товаров:
                                </Text>
                                <Text component='span'>{product.category}</Text>
                            </Box>
                            {product.items?.map((item: any) => {
                                return (
                                    <>
                                        <Box key={item.id}>
                                            <Box mb='sm'>
                                                <Text
                                                    c='gray.5'
                                                    mr='xs'
                                                    fw='500'
                                                    component='span'
                                                >
                                                    Наименование:
                                                </Text>
                                                <Text component='span'>
                                                    {item.name}
                                                </Text>
                                            </Box>

                                            <Box mb='sm'>
                                                <Text
                                                    c='gray.5'
                                                    mr='xs'
                                                    fw='500'
                                                    component='span'
                                                >
                                                    Цена за 30 литров:
                                                </Text>
                                                <Text component='span'>
                                                    {item.price}
                                                </Text>
                                            </Box>

                                            <Box mb='sm'>
                                                <Text
                                                    c='gray.5'
                                                    mr='xs'
                                                    fw='500'
                                                    component='span'
                                                >
                                                    Производитель:
                                                </Text>
                                                <Text component='span'>
                                                    {item.manufacturer}
                                                </Text>
                                            </Box>
                                            <Box mb='sm'>
                                                <Text
                                                    c='gray.5'
                                                    mr='xs'
                                                    mb='sm'
                                                    fw='500'
                                                >
                                                    Фотографии:
                                                </Text>
                                                <Flex
                                                    mah='100%'
                                                    gap='sm'
                                                    style={{
                                                        overflowX: 'auto',
                                                    }}
                                                >
                                                    {item.images?.map(
                                                        (
                                                            image: string,
                                                            index: number
                                                        ) => {
                                                            return (
                                                                <Box
                                                                    key={index}
                                                                    pos='relative'
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    <MantineImage
                                                                        w='110px'
                                                                        h='80px'
                                                                        fit='cover'
                                                                        src={
                                                                            image
                                                                        }
                                                                    />
                                                                    <IconZoomIn
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: 5,
                                                                            right: 5,
                                                                        }}
                                                                        color='#fff'
                                                                        stroke='2'
                                                                    />
                                                                </Box>
                                                            )
                                                        }
                                                    )}
                                                </Flex>
                                            </Box>
                                        </Box>
                                    </>
                                )
                            })}
                        </Box>
                        {product.comment && (
                            <Box mb='sm'>
                                <Text
                                    c='gray.5'
                                    mr='xs'
                                    fw='500'
                                    component='span'
                                >
                                    Комментарий:
                                </Text>
                                <Text component='span'>{product.comment}</Text>
                            </Box>
                        )}
                        <Divider my='lg' />
                    </>
                )
            })}
        </Paper>
    )
}
