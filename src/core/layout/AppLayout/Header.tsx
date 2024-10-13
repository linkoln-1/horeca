import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Button,
    Container,
    Flex,
    Image as MantineImage,
    Loader,
    Paper,
} from '@mantine/core'
import Link from 'next/link'

import { role } from '@/shared/helpers/getRole'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function Header() {
    const isMobile = useBreakpoint('sm')
    const user = useUserStore(state => state.user)

    const { clearTokens: logOut } = useUserStore(state => state)

    if (!user) return <Loader />

    return (
        <Paper w='100%' bg='gray.1' p='sm'>
            <Container>
                <Flex justify='space-between' align='center'>
                    <Link href={`/user${role({ user })}/applications`}>
                        <MantineImage
                            src='/assets/icons/logo.svg'
                            alt='Horeka logo'
                        />
                    </Link>

                    {!isMobile && (
                        <Flex gap='md' align='center'>
                            <Button
                                component={Link}
                                href={'/help'}
                                color='dark'
                                size='compact-sm'
                                variant='transparent'
                            >
                                Помощь
                            </Button>
                            <Button
                                color='dark'
                                size='compact-sm'
                                variant='transparent'
                                onClick={logOut}
                            >
                                Выйти
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Container>
        </Paper>
    )
}
