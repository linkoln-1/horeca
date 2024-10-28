import { ChangeEvent, useRef } from 'react'

import { Avatar, AvatarProps } from '@mantine/core'

type CustomAvatarUploadProps = {
    onChange: (payload: File) => void
} & AvatarProps

export function CustomAvatarUpload({
    onChange,
    ...props
}: CustomAvatarUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget!.files![0])
    }

    const onClick = () => {
        inputRef.current?.click()
    }

    return (
        <>
            <input
                style={{ display: 'none' }}
                onChange={handleChange}
                ref={inputRef}
                type='file'
                accept='image/*'
            />
            <Avatar
                {...props}
                onClick={onClick}
                // c='var(--mantine-color-indigo-0)'
                color='indigo.4'
            />
        </>
    )
}
