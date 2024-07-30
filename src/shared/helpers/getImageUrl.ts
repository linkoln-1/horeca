export const getImageUrl = (imagePath: string | undefined) => {
    return imagePath
        ? `${process.env.NEXT_PUBLIC_APP_BASE_API}${imagePath}`
        : ''
}

export const getRandomImgUrl = () => {
    const randomId = Math.floor(Math.random() * 25)
    return `https://picsum.photos/id/${randomId}/85/85`
}
