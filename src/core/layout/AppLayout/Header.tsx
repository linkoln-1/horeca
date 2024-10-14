import { useUserStore } from '@/core/providers/userStoreContext'
import {
    Button,
    Container,
    Flex,
    Image as MantineImage,
    Loader,
    Paper,
    useCombobox,
    Menu,
} from '@mantine/core'
import Link from 'next/link'

import { role } from '@/shared/helpers/getRole'
import { useBreakpoint } from '@/shared/hooks/useBreakpoint'

export function Header() {
    const isMobile = useBreakpoint('sm')
    const user = useUserStore(state => state.user)
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })
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
                        <Flex gap='sm' align='center'>
                            <Button
                                component={Link}
                                href={'#'}
                                color='dark'
                                size='compact-sm'
                                variant='transparent'
                            >
                                Реклама
                            </Button>
                            <Button
                                component={Link}
                                href={'/help'}
                                color='dark'
                                size='compact-sm'
                                variant='transparent'
                            >
                                Помощь
                            </Button>
                            <Menu>
                                <Menu.Target>
                                    <Button
                                        variant='transparent'
                                        className='gap-8'
                                    >
                                        <Flex gap='sm' align='center'>
                                            <div>
                                                <MantineImage
                                                    src='/assets/icons/profile.svg'
                                                    alt='Horeka profile'
                                                />
                                            </div>
                                            <div className='text-black'>
                                                Профиль
                                            </div>
                                            <div>
                                                <MantineImage
                                                    src='/assets/icons/arrow.svg'
                                                    alt='Horeka arrow'
                                                />
                                            </div>
                                        </Flex>
                                    </Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item>
                                        <Button
                                            color='dark'
                                            size='compact-sm'
                                            variant='transparent'
                                            onClick={logOut}
                                        >
                                            Выйти
                                        </Button>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Flex>
                    )}
                </Flex>
            </Container>
        </Paper>
    )
}
