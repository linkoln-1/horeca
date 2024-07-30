import { userStore } from '@/entities/user'

export const uploadFile = async <T>(file: File, url: string): Promise<T> => {
    const formData = new FormData()

    formData.append('file', file)

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
