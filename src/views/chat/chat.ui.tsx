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

import { requests } from '@/shared/constants/chatRequests'

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
        if (activeRequest === requestNumber) {
            return true
        }
        return false
    }

    return (
        <Flex mt='md' direction='column'>
            <Flex px='md' py='md' align='center' bg='indigo.1'>
                <Box miw='420px'>
                    <Text fw='500' size='xl'>
                        Все сообщения
                    </Text>
                </Box>
                <Flex w='calc(100% - 420px)'>
                    <MantineImage
                        mr='40px'
                        fit='cover'
                        w={90}
                        h={90}
                        radius='md'
                        src='/assets/images/bg-5.png'
                    />
                    <Flex direction='column' justify='space-between'>
                        <Text fw='500' size='xl' className='chatName'>
                            ООО «МЕТРО Кэш энд Керри»
                        </Text>
                        <Text c='indigo' size='lg' className='status'>
                            Онлайн
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex h='calc(100vh - 300px)' mah='100vh' className='chatBody'>
                <Flex
                    direction='column'
                    style={{ overflowY: 'auto' }}
                    miw='420px'
                    mah='100%'
                >
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
                        <Flex direction='column' justify='space-between'>
                            <Text fw='500' size='xl' className='chatName'>
                                Беседа
                            </Text>
                            <Text c='gray.6' size='lg' className='status'>
                                Сообщений пока нет
                            </Text>
                        </Flex>
                    </Group>

                    {requests.map((request, index) => {
                        return (
                            <Group
                                key={index}
                                onClick={() =>
                                    handleActiveRequest(request.requestNumber)
                                }
                                c={
                                    handleCheckActive(request.requestNumber)
                                        ? 'white'
                                        : ''
                                }
                                bg={
                                    handleCheckActive(request.requestNumber)
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
                                        Заявка № {request.requestNumber}
                                    </Text>
                                    <Text
                                        c={
                                            handleCheckActive(
                                                request.requestNumber
                                            )
                                                ? 'white'
                                                : 'gray.6'
                                        }
                                        size='lg'
                                        className='date'
                                    >
                                        {request.requestDate}
                                    </Text>
                                </Flex>
                            </Group>
                        )
                    })}
                </Flex>

                <Divider orientation='vertical' mt='md' mb='xs' />

                <Flex pos='relative' direction='column' w='100%' h='100%'>
                    <Text w='100%' my='md' size='lg' c='gray.6' ta='center'>
                        30 июня, 2024
                    </Text>

                    <Flex
                        direction='column'
                        px='xl'
                        style={{ overflowY: 'auto' }}
                        flex='1'
                        mah='100%'
                        className='custom-scrollbar'
                    >
                        <Paper
                            w='70%'
                            mb='lg'
                            ml='auto'
                            px='lg'
                            py='md'
                            withBorder
                            shadow='sm'
                        >
                            <Text mb='sm' c='indigo'>
                                Есть в наличии
                            </Text>
                            <Box mb='sm'>
                                <Text mr='xs' fw='500' component='span'>
                                    Категории товаров:
                                </Text>
                                <Text component='span'>
                                    Безалкогольные напитки, вода, соки
                                </Text>
                            </Box>

                            <Box mb='sm'>
                                <Text
                                    c='gray.5'
                                    mr='xs'
                                    fw='500'
                                    component='span'
                                >
                                    Наименование:
                                </Text>
                                <Text component='span'>Сок Рич Гранатовый</Text>
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
                                <Text component='span'>50,000 руб.</Text>
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
                                <Text component='span'>ООО “Суперджус”</Text>
                            </Box>

                            <Box mb='sm'>
                                <Text c='gray.5' mr='xs' mb='sm' fw='500'>
                                    Фотографии:
                                </Text>
                                <Flex
                                    mah='100%'
                                    gap='sm'
                                    style={{ overflowX: 'auto' }}
                                >
                                    <Box
                                        pos='relative'
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MantineImage
                                            w='110px'
                                            h='80px'
                                            fit='cover'
                                            src='/assets/images/bg-5.png'
                                        />
                                        <IconZoomIn
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                            }}
                                            color='#fff'
                                            stroke='2'
                                        />
                                    </Box>
                                    <Box
                                        pos='relative'
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MantineImage
                                            w='110px'
                                            h='80px'
                                            fit='cover'
                                            src='/assets/images/bg-5.png'
                                        />
                                        <IconZoomIn
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                            }}
                                            color='#fff'
                                            stroke='2'
                                        />
                                    </Box>
                                    <Box
                                        pos='relative'
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MantineImage
                                            w='110px'
                                            h='80px'
                                            fit='cover'
                                            src='/assets/images/bg-5.png'
                                        />
                                        <IconZoomIn
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                            }}
                                            color='#fff'
                                            stroke='2'
                                        />
                                    </Box>
                                </Flex>
                            </Box>

                            <Divider my='lg' />

                            <Box mb='sm'>
                                <Text mr='xs' fw='500' component='span'>
                                    Категория товаров:
                                </Text>
                                <Text component='span'>Шоколад</Text>
                            </Box>

                            <Box mb='sm'>
                                <Text mr='xs' fw='500' component='span'>
                                    Наименование:
                                </Text>
                                <Text component='span'>Горький</Text>
                            </Box>

                            <Box mb='sm'>
                                <Text mr='xs' fw='500' component='span'>
                                    Цена за 10 кг:
                                </Text>
                                <Text component='span'>30,000 руб.</Text>
                            </Box>

                            <Box mb='sm'>
                                <Text mr='xs' fw='500' component='span'>
                                    Производитель:
                                </Text>
                                <Text component='span'>ООО “Линдт”</Text>
                            </Box>

                            <Box mb='sm'>
                                <Text c='gray.5' mr='xs' mb='sm' fw='500'>
                                    Фотографии:
                                </Text>
                                <Flex gap='sm'>
                                    <Box
                                        pos='relative'
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MantineImage
                                            w='110px'
                                            h='80px'
                                            fit='cover'
                                            src='/assets/images/bg-5.png'
                                        />
                                        <IconZoomIn
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                            }}
                                            color='#fff'
                                            stroke='2'
                                        />
                                    </Box>
                                    <Box
                                        pos='relative'
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MantineImage
                                            w='110px'
                                            h='80px'
                                            fit='cover'
                                            src='/assets/images/bg-5.png'
                                        />
                                        <IconZoomIn
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                            }}
                                            color='#fff'
                                            stroke='2'
                                        />
                                    </Box>
                                    <Box
                                        pos='relative'
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MantineImage
                                            w='110px'
                                            h='80px'
                                            fit='cover'
                                            src='/assets/images/bg-5.png'
                                        />
                                        <IconZoomIn
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                            }}
                                            color='#fff'
                                            stroke='2'
                                        />
                                    </Box>
                                </Flex>
                            </Box>

                            <Box mb='sm'>
                                <Text
                                    c='gray.5'
                                    mr='xs'
                                    fw='500'
                                    component='span'
                                >
                                    Комментарий:
                                </Text>
                                <Text component='span'>
                                    Есть Горький шоколад содержанием какаобобов
                                    более 80%
                                </Text>
                            </Box>
                        </Paper>

                        <Box bg='indigo.1' className='speech-bubble-from-me'>
                            Добрый день! Ваше предложение нас устраивает.
                            Подскажите, не могли бы вы сделать 10% скидку на
                            все, если мы закупим продукцию в большем объеме, чем
                            изначально запрашивали?
                        </Box>

                        <Box
                            c='white'
                            bg='indigo.6'
                            className='speech-bubble-to-me'
                        >
                            Все обсуждаемо. Однако зависит от конечного объема и
                            сроков поставки.
                        </Box>

                        <Box bg='indigo.1' className='speech-bubble-from-me'>
                            Хотели бы запас мороженного на два месяца вперед при
                            условии сохранения его качества. По срокам - те же
                            даты + можем дать 3 дня за поставку дополнительного
                            объема.
                        </Box>

                        <Box
                            c='white'
                            bg='indigo.6'
                            className='speech-bubble-to-me'
                        >
                            Окей, справимся. Начинам подготовку продукции к
                            поставке. Будем держать в курсе.
                        </Box>

                        <Box bg='indigo.1' className='speech-bubble-from-me'>
                            Спасибо большое за оперативность!
                        </Box>

                        <Paper
                            w='70%'
                            mb='lg'
                            ml='auto'
                            px='lg'
                            py='md'
                            withBorder
                            shadow='sm'
                        >
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
                                        <IconThumbUpFilled
                                            style={{ marginRight: '10px' }}
                                        />
                                        Да, доставлен
                                    </Button>
                                    <Button
                                        fw='400'
                                        color='#DB3C3E'
                                        variant='transparent'
                                        size='lg'
                                    >
                                        <IconThumbDownFilled
                                            style={{ marginRight: '10px' }}
                                        />
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
                                        <IconThumbUpFilled
                                            style={{ marginRight: '10px' }}
                                        />
                                        Удовлетворительно
                                    </Button>
                                    <Button
                                        fw='400'
                                        color='#DB3C3E'
                                        variant='transparent'
                                        size='lg'
                                    >
                                        <IconThumbDownFilled
                                            style={{ marginRight: '10px' }}
                                        />
                                        Нет, возврат
                                    </Button>
                                </Flex>
                            </Box>
                        </Paper>
                    </Flex>

                    <Flex
                        w='100%'
                        bg='gray.1'
                        align='center'
                        px='md'
                        py='md'
                        // h='135px'
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
                            disabled={message ? false : true}
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
    )
}
