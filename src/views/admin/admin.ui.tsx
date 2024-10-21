'use client'

import { useState } from 'react'

import {
    Box,
    Button,
    Divider,
    Flex,
    Input,
    Paper,
    ScrollArea,
    Text,
    Title,
} from '@mantine/core'
import { IconPaperclip, IconSend } from '@tabler/icons-react'

import { adminChats, adminMessages } from '@/shared/constants'

export function AdminViews() {
    const [message, setMessage] = useState<string>('')
    const [activeChat, setActiveChat] = useState<number | null>(null)

    const handleChatSelect = (id: number) => setActiveChat(id)

    const handleMessageSend = () => {
        if (!message) return
        console.log('Message sent:', message)
        setMessage('')
    }

    return (
        <Flex direction='row' h='100%'>
            <Title>Служба поддержки</Title>
            {/* Chat List */}
            <Box w='30%' bg='#f8f9fa' pt='md' className='rounded-md'>
                <Text size='lg' mb='md' pl='md'>
                    Список всех чатов
                </Text>
                {adminChats.map(chat => (
                    <Paper
                        key={chat.id}
                        onClick={() => handleChatSelect(chat.id)}
                        withBorder
                        radius={0}
                        p='md'
                        mb='sm'
                        style={{
                            cursor: 'pointer',
                            backgroundColor:
                                activeChat === chat.id ? '#e0e0e0' : 'white',
                        }}
                    >
                        <Text>{chat.name}</Text>
                        <Text size='sm' c='dimmed'>
                            Обращение {chat.request}
                        </Text>
                    </Paper>
                ))}
            </Box>

            {/* Chat Window */}
            <Flex direction='column' style={{ flexGrow: 1 }}>
                <Box p='md' bg='#eceff1'>
                    <Text>Поддержка СФЕРЫ HoReCa</Text>
                    <Text size='sm' c='dimmed'>
                        Онлайн
                    </Text>
                </Box>

                <Divider />

                <ScrollArea style={{ flexGrow: 1, padding: '10px' }}>
                    {adminMessages.map(msg => (
                        <Flex
                            key={msg.id}
                            justify={
                                msg.sender === 'client'
                                    ? 'flex-end'
                                    : 'flex-start'
                            }
                            mb='sm'
                        >
                            <Box
                                style={{
                                    maxWidth: '70%',
                                    backgroundColor:
                                        msg.sender === 'client'
                                            ? '#f1f8e9'
                                            : '#e3f2fd',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}
                            >
                                <Text>{msg.text}</Text>
                                <Text size='xs' color='dimmed'>
                                    {msg.time}
                                </Text>
                            </Box>
                        </Flex>
                    ))}
                </ScrollArea>

                {/* Message Input */}
                <Flex
                    p='md'
                    align='center'
                    bg='#fafafa'
                    style={{
                        borderTop: '1px solid #ddd',
                    }}
                >
                    <IconPaperclip size={24} style={{ marginRight: '10px' }} />
                    <Input
                        value={message}
                        onChange={e => setMessage(e.currentTarget.value)}
                        placeholder='Напишите сообщение...'
                        style={{ flexGrow: 1 }}
                    />
                    <Button disabled={!message} onClick={handleMessageSend}>
                        <IconSend size={24} />
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
