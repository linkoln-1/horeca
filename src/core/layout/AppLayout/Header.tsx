import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Button,
    Container,
    Flex,
    Image as MantineImage,
    Paper,
} from '@mantine/core'
import Link from 'next/link'

import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function Header() {
    const isMobile = useBreakpoint('sm')
    const user = useUserStore(state => state.user)
    return (
        <Paper w='100%' bg='gray.1' p='sm'>
            <Container>
                <Flex justify='space-between' align='center'>
                    <Link href={`/user/${user?.id}`}>
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
                                component={Link}
                                href={''}
                                color='dark'
                                size='compact-sm'
                                variant='transparent'
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
