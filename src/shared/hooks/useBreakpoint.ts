import { MantineBreakpoint, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export function useBreakpoint(breakpoint: MantineBreakpoint) {
    const theme = useMantineTheme()

    return useMediaQuery(`(max-width: ${theme.breakpoints[breakpoint]})`)
}
