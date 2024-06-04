import { userStore } from '@/entities/user'

export const uploadFiles = async <T>(
    files: File[],
    url: string,
    type: string
): Promise<T> => {
    const formData = new FormData()

    for (const file of files) {
        formData.append('files', file)
    }

    formData.append('type', type)

    const session = userStore.getState()

    const result = await fetch(process.env.NEXT_PUBLIC_APP_BASE_API! + url, {
        mode: 'cors',
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${session.accessToken ?? ''}`,
        },
    })

    return result.json()
}
