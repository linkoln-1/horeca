// 'use client'
//
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
//
// import { chatQueries } from '@/entities/chats'
// import { useChatStore } from '@/entities/chats/chat.admin.model'
// import { supportQueries } from '@/entities/support'
// import { Box, Button, Flex, Input, Overlay, Paper, Text } from '@mantine/core'
// import { IconChevronLeft, IconPaperclip, IconSend2 } from '@tabler/icons-react'
// import dayjs from 'dayjs'
// import { useParams, usePathname, useRouter } from 'next/navigation'
//
// import { useWebSocketChat } from '@/shared/hooks/useWebsocketChat'
//
// export function ChatViews() {
//     const { chatId, supportId, adminId, opponentId, status } = useParams<{
//         supportId: string
//         opponentId: string
//         adminId: string
//         chatId: string
//         status: string
//     }>()
//
//     const router = useRouter()
//     const path = usePathname()
//
//     console.log(chats)
//
//     return (
//         <React.Fragment>
//             <Flex
//                 style={{ maxWidth: '1320px', width: '100%', margin: '0 auto' }}
//             >
//                 <Flex
//                     direction='column'
//                     style={{ width: '100%', maxWidth: '1320px' }}
//                 >
//                     <Flex
//                         className='rounded-t-xl'
//                         px='md'
//                         py='md'
//                         align='center'
//                         bg='indigo.1'
//                     >
//                         <Box>
//                             <Button
//                                 variant='outline'
//                                 w={30}
//                                 h={30}
//                                 p={0}
//                                 onClick={() => {
//                                     router.push('/user/admin')
//                                 }}
//                             >
//                                 <IconChevronLeft size={19} />
//                             </Button>
//                         </Box>
//                         <Flex
//                             direction='column'
//                             justify='center'
//                             align='center'
//                             w='100%'
//                         >
//                             <Text fw='600' size='xl'>
//                                 Поддержка СФЕРЫ HoReCa
//                             </Text>
//                             <Text fw='500' size='sm'>
//                                 Чат
//                             </Text>
//                         </Flex>
//                     </Flex>
//
//                     <Flex h='calc(100vh - 300px)' mah='100vh'>
//                         <Flex
//                             pos='relative'
//                             direction='column'
//                             w='100%'
//                             h='100%'
//                         >
//                             {isOverlayVisible && supportId && (
//                                 <Overlay
//                                     opacity={1}
//                                     color='black'
//                                     zIndex={10}
//                                     blur={5}
//                                 >
//                                     <Flex
//                                         align='center'
//                                         justify='center'
//                                         direction='column'
//                                         style={{
//                                             height: '100%',
//                                             textAlign: 'center',
//                                         }}
//                                     >
//                                         <Paper
//                                             px='xl'
//                                             py='lg'
//                                             withBorder
//                                             shadow='md'
//                                             style={{
//                                                 background: 'white',
//                                                 textAlign: 'center',
//                                             }}
//                                         >
//                                             <Text size='lg' mb='md'>
//                                                 Подтвердите запрос пользователя,
//                                                 чтобы ответить
//                                             </Text>
//                                             <Button
//                                                 size='md'
//                                                 color='indigo.4'
//                                                 onClick={handleConfirmRequest}
//                                                 loading={
//                                                     assignRequestPending ||
//                                                     createChatPending
//                                                 }
//                                             >
//                                                 Подтвердить
//                                             </Button>
//                                         </Paper>
//                                     </Flex>
//                                 </Overlay>
//                             )}
//
//                             <Flex
//                                 direction='column'
//                                 px='xl'
//                                 flex='1'
//                                 mah='100%'
//                                 className='overflow-y-auto custom-scrollbar'
//                             >
//                                 {messages.map((chat, index) => {
//                                     const currentDate = dayjs(
//                                         chat.createdAt
//                                     ).format('YYYY-MM-DD')
//                                     const previousDate =
//                                         index > 0
//                                             ? dayjs(
//                                                   messages[index - 1].createdAt
//                                               ).format('YYYY-MM-DD')
//                                             : null
//
//                                     return (
//                                         <Flex
//                                             key={index}
//                                             direction='column'
//                                             mb='md'
//                                         >
//                                             {(index === 0 ||
//                                                 currentDate !==
//                                                     previousDate) && (
//                                                 <Text
//                                                     w='100%'
//                                                     my='md'
//                                                     size='lg'
//                                                     c='gray.6'
//                                                     ta='center'
//                                                 >
//                                                     {currentDate}
//                                                 </Text>
//                                             )}
//
//                                             <Box
//                                                 c={
//                                                     chat.authorId &&
//                                                     chat.authorId !== +adminId
//                                                         ? 'white'
//                                                         : '#000'
//                                                 }
//                                                 className={
//                                                     chat.authorId &&
//                                                     chat.authorId !== +adminId
//                                                         ? 'speech-bubble-to-me'
//                                                         : 'speech-bubble-from-me'
//                                                 }
//                                                 bg={
//                                                     chat.authorId &&
//                                                     chat.authorId !== +adminId
//                                                         ? 'indigo.6'
//                                                         : 'indigo.1'
//                                                 }
//                                             >
//                                                 {chat.message}
//                                             </Box>
//                                         </Flex>
//                                     )
//                                 })}
//                             </Flex>
//
//                             <Flex
//                                 w='100%'
//                                 bg='gray.1'
//                                 align='center'
//                                 px='md'
//                                 py='md'
//                             >
//                                 <IconPaperclip
//                                     style={{ marginRight: 30 }}
//                                     width={36}
//                                     height={36}
//                                     cursor='pointer'
//                                     color='#4299e1'
//                                     stroke={2}
//                                 />
//                                 <Input
//                                     value={message}
//                                     onChange={e => setMessage(e.target.value)}
//                                     size='lg'
//                                     placeholder='Напишите сообщение...'
//                                     variant='unstyled'
//                                     w='100%'
//                                 />
//                                 <Button
//                                     variant='transparent'
//                                     disabled={!message}
//                                     onClick={handleSendMessage}
//                                 >
//                                     <IconSend2
//                                         width={36}
//                                         height={36}
//                                         color={message ? '#5E7EEF' : '#A4A4A4'}
//                                     />
//                                 </Button>
//                             </Flex>
//                         </Flex>
//                     </Flex>
//                 </Flex>
//             </Flex>
//         </React.Fragment>
//     )
// }
