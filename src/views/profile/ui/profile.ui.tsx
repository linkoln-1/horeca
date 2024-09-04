'use client'

import { useUserStore } from '@/core/providers/userStoreContext'
import { HorecaMenuList } from '@/views/profile/ui/horecaMenu'
import { ProviderMenuList } from '@/views/profile/ui/providerMenu'
import { Box, Button, Flex, Grid, Paper, Text } from '@mantine/core'

import { roles } from '@/shared/constants'
import { CustomAvatarUpload } from '@/shared/ui/CustomAvatarUpload'

export function ProfileView() {
    const user = useUserStore(state => state.user)

    return (
        <Flex direction='column' gap='md'>
            <Grid>
                <Grid.Col
                    span={{
                        base: 12,
                        md: 4,
                    }}
                >
                    <Flex direction='column' gap='xl'>
                        <Paper p='md' shadow='xs' bg='gray.1'>
                            <Flex gap='md' align='center' direction='column'>
                                <Box w={240} h={240}>
                                    <CustomAvatarUpload
                                        onChange={() => {}}
                                        src={''}
                                        size='100%'
                                        color='blue'
                                        className='aspect-square cursor-pointer'
                                    />
                                </Box>
                                <Box>
                                    <Flex direction='column' gap='lg'>
                                        {[user].map(item => (
                                            <Flex
                                                key={item && item.id}
                                                direction='column'
                                                gap='md'
                                                justify='center'
                                                align='center'
                                            >
                                                <Text size='xl' fw={700}>
                                                    {item && item.name}
                                                </Text>

                                                <Text>
                                                    email: {item && item.email}
                                                </Text>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>
                            </Flex>
                        </Paper>

                        <Paper bg='gray.1' p='md' h={170}>
                            <Flex direction='column' gap='md'>
                                <Text>Мой баланс:</Text>
                                <Text>0 руб.</Text>

                                <Button
                                    variant='filled'
                                    size='md'
                                    color='blue'
                                    fullWidth
                                >
                                    Пополнить баланс
                                </Button>
                            </Flex>
                        </Paper>
                    </Flex>
                </Grid.Col>

                <Grid.Col
                    span={{
                        base: 12,
                        md: 8,
                    }}
                >
                    <Grid>
                        {user?.profile.profileType === roles[0].role ? (
                            <ProviderMenuList />
                        ) : (
                            <HorecaMenuList />
                        )}
                    </Grid>
                </Grid.Col>
            </Grid>
        </Flex>
    )
}
