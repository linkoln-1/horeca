// Я не определился где нужно держать этот файл*
'use client'

import { Box, Button } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Я не определился где нужно держать этот файл*

// Я не определился где нужно держать этот файл*

// Я не определился где нужно держать этот файл*

export function Navigation() {
    const router: string = usePathname()

    return (
        <Box p='10 0'>
            <Button
                variant='transparent'
                component={Link}
                color={
                    router === '/user/supplier/advertising/rates'
                        ? 'blue'
                        : 'black'
                }
                href='/user/supplier/advertising/rates'
                fw={400}
            >
                Тарифы
            </Button>
            <Button
                variant='transparent'
                component={Link}
                href='/user/supplier/advertising/advertisement'
                color={
                    router === '/user/supplier/advertising/advertisement'
                        ? 'blue'
                        : 'black'
                }
                fw={400}
            >
                История заявок
            </Button>
        </Box>
    )
}
