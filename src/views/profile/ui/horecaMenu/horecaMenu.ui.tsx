import { useUserStore } from '@/core/providers/userStoreContext'
import { Button, Flex, Grid, Loader, Paper, Text } from '@mantine/core'
import { Icon } from '@tabler/icons-react'
import Link from 'next/link'

import { horecaMenu } from '@/shared/constants'
import { role } from '@/shared/helpers/getRole'

export function HorecaMenuList() {
    const user = useUserStore(state => state.user)

    if (!user) return <Loader />

    return (
        <>
            {horecaMenu.map(x => {
                const Icon = x.icon as Icon
                return (
                    <Grid.Col
                        key={x.id}
                        span={{
                            base: 12,
                            sm: 6,
                        }}
                    >
                        <Paper p='md' shadow='xs' bg='gray.1'>
                            <Link href={`/user${role({ user })}${x.link}`}>
                                <Flex gap='md' h={120}>
                                    <Icon stroke={2} color='blue' size={60} />
                                    <Flex direction='column' gap='sm'>
                                        <Text size='lg' fw={600}>
                                            {x.name}
                                        </Text>
                                        <Text size='xs' fw={600} c='gray'>
                                            {x.description}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Link>
                            {x.button && (
                                <Button
                                    variant='filled'
                                    size='md'
                                    color='blue'
                                    fullWidth
                                    my='md'
                                    component={Link}
                                    href={`/user${role({ user })}${x.link}`}
                                >
                                    {x.button}
                                </Button>
                            )}
                        </Paper>
                    </Grid.Col>
                )
            })}
        </>
    )
}
