import { Flex, rem, Text } from '@mantine/core'
import { Dropzone, DropzoneProps } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'

import '@mantine/dropzone/styles.css'

type CustomDropzoneProps = {
    placeholder?: string
} & DropzoneProps

export function CustomDropzone({ placeholder, ...props }: CustomDropzoneProps) {
    return (
        <Dropzone {...props}>
            <Flex
                className={props.className}
                direction='column'
                justify='center'
                align='center'
                gap='md'
            >
                <Dropzone.Accept>
                    <IconUpload
                        style={{
                            width: rem(52),
                            height: rem(52),
                            color: 'var(--mantine-color-blue-6)',
                        }}
                        stroke={1.5}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        style={{
                            width: rem(52),
                            height: rem(52),
                            color: 'var(--mantine-color-red-6)',
                        }}
                        stroke={1.5}
                    />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <IconPhoto
                        style={{
                            width: rem(52),
                            height: rem(52),
                            color: 'var(--mantine-color-dimmed)',
                        }}
                        stroke={1.5}
                    />
                </Dropzone.Idle>

                <Text size='md' ta='center'>
                    {placeholder ||
                        'Перетащите файл сюда или нажмите чтобы выбрать файл с вашего компьютера'}
                </Text>
            </Flex>
        </Dropzone>
    )
}
