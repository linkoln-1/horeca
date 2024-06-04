import React, { ReactNode } from 'react'

import { Flex, FlexProps, Paper, PaperProps } from '@mantine/core'

type PageProps = {
    flexProps?: FlexProps
    children: ReactNode
} & PaperProps

export function Page({ children, flexProps, ...rest }: PageProps) {
    return (
        <Paper {...rest}>
            <Flex gap='lg' direction='column' {...flexProps}>
                {children}
            </Flex>
        </Paper>
    )
}
