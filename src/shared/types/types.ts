export type Image = {
    createdAt: string
    id: number
    name: string
    updatedAt: string
}

export type ImageUploadResultDto = {
    data: Image
}
