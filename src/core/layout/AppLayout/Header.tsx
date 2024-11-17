import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Button,
    Container,
    Flex,
    Image as MantineImage,
    Paper,
    useCombobox,
} from '@mantine/core'
import Link from 'next/link'

import { role } from '@/shared/helpers/getRole'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function Header() {
    const isMobile = useBreakpoint('sm')
    const { user } = useUserStore(state => state)
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })
    const { clearTokens: logOut } = useUserStore(state => state)

    return (
        <Paper w='100%' bg='var(--mantine-color-indigo-0)' p='sm'>
            <Container fluid>
                <Flex justify='space-between' align='center'>
                    <Link href={`/user${user && role({ user })}/applications`}>
                        <MantineImage
                            src='/assets/icons/logo.svg'
                            alt='Horeka logo'
                        />
                    </Link>

                    {!isMobile && (
                        <Flex gap='sm' align='center'>
                            <Button
                                color='#385191'
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
