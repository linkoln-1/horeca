'use client';

import { useState } from "react";
import { Flex, Box, Text, Image, Group, Divider, Input } from '@mantine/core'
import { IconPaperclip, IconSend2 } from '@tabler/icons-react'

type Request = {
    requestNumber: string
    requestDate: string
}

const requests: Request[] = [
    {
        requestNumber: '765434560',
        requestDate: '24.05.2024',
    },
    {
        requestNumber: '765234560',
        requestDate: '28.06.2024',
    },
    {
        requestNumber: '723434560',
        requestDate: '30.06.2024',
    },
    {
        requestNumber: '732334560',
        requestDate: '30.06.2024',
    },
]

export function ChatView() {

    const [activeRequest, setActiveRequest] = useState<string>('');

    const handleActiveRequest = (id: string) => {
        setActiveRequest(id)
    }

    const handleCheckActive = (requestNumber: string) => {
        if(activeRequest === requestNumber) {
            return true
        }

        return false
    }

    return(
        <Flex mt='50px' direction='column'>
            <Flex px='55px' align="center" h="150px" bg='indigo.1' className="chatHeader">
                <Box miw="420px">
                    <Text fw='500' size="xl">
                        Все сообщения
                    </Text>
                </Box>
                <Flex w='calc(100% - 420px)'>
                    <Image mr='40px' fit='cover' w={90} h={90} radius='md' src='/assets/images/bg-5.png'></Image>
                    <Flex direction='column' justify='space-between'>
                        <Text fw='500' size="xl" className="chatName">ООО «МЕТРО Кэш энд Керри»</Text>
                        <Text c="indigo" size='lg' className="status">Онлайн</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex h='calc(100vh - 150px)' mah='100vh' className="chatBody">
                <Flex direction='column' styles={{root: {overflowY: 'auto'}}} miw="420px" mah='100%'>

                    <Group styles={{root: {borderBottom: `1px solid`, cursor: 'pointer'}}} wrap="nowrap" px='55px' py='36px'>
                        <Image mr='27px' fit='cover' w={90} h={90} radius='md' src='/assets/images/bg-5.png'></Image>
                        <Flex direction='column' justify='space-between'>
                            <Text fw='500' size="xl" className="chatName">Беседа</Text>
                            <Text c="gray.6" size='lg' className="status">Сообщений пока нет</Text>
                        </Flex>
                    </Group>

                    {requests.map(request => {
                        return (
                            <Group 
                                onClick={() => handleActiveRequest(request.requestNumber)} 
                                c={handleCheckActive(request.requestNumber) ? 'white' : ''} 
                                bg={handleCheckActive(request.requestNumber) ? 'indigo' : ''} 
                                styles={{root: {cursor: 'pointer',borderBottom: `1px solid`}}} 
                                wrap="nowrap" 
                                px='55px' 
                                py='36px'
                            >
                                <Flex direction='column' justify='space-between'>
                                    <Text fw='500' size="xl" className="request">Заявка № {request.requestNumber}</Text>
                                    <Text c={handleCheckActive(request.requestNumber) ? 'white' : 'gray.6'} size='lg' className="date">{request.requestDate}</Text>
                                </Flex>
                            </Group>
                        )
                    })}

                    

                </Flex>
                
                <Divider orientation='vertical' mt='md' mb='md' />
                
                <Flex pos='relative' direction='column' w='100%' h='100%'>

                    <Text w='100%' my='30px' size="lg" c='gray.6' ta='center' className="chatBodyDate">
                        30 июня, 2024
                    </Text>

                    <Flex direction='column' styles={{root: {overflowY: 'auto'}}} flex='1' mah='100%' className="chatBodyMessagesWrapper">
                    


                    </Flex>

                    <Flex w='100%' bg='gray.1' align='center' px='49px' py='40px' h='135px' className="chatBodyMessagesInput">
                        <IconPaperclip style={{marginRight: 30}} width={36} height={36} cursor='pointer' color='#4299e1' stroke={2} />
                        <Input size="lg" placeholder="Напишите сообщение..." variant="unstyled" w='100%' />
                        <IconSend2 width={36} height={36} cursor='pointer' color="#A4A4A4" />
                    </Flex>

                </Flex>

            </Flex>
        </Flex>
    )
}