import { Flex, Loader, LoaderProps } from '@mantine/core'

type FullPageLoaderProps = {
    className?: string
} & LoaderProps

export function FullPageLoader({
    className = 'h-[450px]',
    ...rest
}: FullPageLoaderProps) {
    return (
        <Flex className={className} align='center' justify='center'>
            <Loader size='xl' {...rest} />
        </Flex>
    )
}
