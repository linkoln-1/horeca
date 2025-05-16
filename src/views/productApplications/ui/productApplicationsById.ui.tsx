'use client'

import React, { useState } from 'react'

import { ProductTable } from './productTable'
import { useUserStore } from '@/core/providers/userStoreContext'
import { providerRequest } from '@/entities/provider-request'
import { useProviderRequestMutation } from '@/entities/provider-request/request.queries'
import { imageQueries } from '@/entities/uploads'
import { Button, Flex, Text, Textarea, Modal } from '@mantine/core'
import { useParams, useRouter } from 'next/navigation'

import { role } from '@/shared/helpers/getRole'
import {
    ProviderRequestCreateDto,
    ProviderRequestItemCreateDto,
} from '@/shared/lib/horekaApi/Api'

export function ProductApplicationsByIdViews() {
    const router = useRouter()
    const params = useParams()
    const { id } = params
    const user = useUserStore(state => state.user)
    const { data } = providerRequest.useProviderRequestGetIncomeByID(Number(id))
    const { mutateAsync: uploadImage, isPending: isPendingImage } =
        imageQueries.useImageUploadMutation()

    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [inputData, setInputData] = useState<
        Record<number, { manufacturer: string; price: string }>
    >({})
    const [comment, setComment] = useState<string>('')
    const [photos, setPhotos] = useState<
        Record<number, { id: number; path: string }[]>
    >({})

    const { mutate: createProviderRequest, isPending } =
        useProviderRequestMutation()

    const handleCheckboxChange = (itemId: number) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        )
    }

    const handlePhotoRemove = (productId: number, index: number) => {
        setPhotos(prev => {
            const updatedPhotos = [...(prev[productId] || [])]
            updatedPhotos.splice(index, 1)

            return {
                ...prev,
                [productId]: updatedPhotos,
            }
        })
    }

    const handleManufacturerChange = (itemId: number, value: string) => {
        setInputData(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                manufacturer: value,
            },
        }))
    }

    const handlePriceChange = (itemId: number, value: string) => {
        setInputData(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                price: value,
            },
        }))
    }

    const handlePhotoUpload = async (productId: number, files: FileList) => {
        const currentPhotos = photos[productId] || []
        if (currentPhotos.length >= 3) {
            alert('Максимальное количество фотографий (3) уже загружено')
            return
        }

        const uploadPromises: Promise<{ id: number; path: string }>[] = []

        for (
            let i = 0;
            i < Math.min(files.length, 3 - currentPhotos.length);
            i++
        ) {
            const file = files[i]
            const imgCheckPromise = new Promise<File>((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = e => {
                    const img = new window.Image()
                    img.src = e.target?.result as string
                    img.onload = () => {
                        if (img.width <= 200 && img.height <= 200) {
                            resolve(file)
                        } else {
                            reject(
                                new Error(
                                    'Фото должно быть размером 200x200 пикселей'
                                )
                            )
                        }
                    }
                }
                reader.readAsDataURL(file)
            })

            const uploadPromise = imgCheckPromise.then(async validatedFile => {
                const response = await uploadImage({ file: validatedFile })
                return { id: Number(response.id), path: response.path }
            })

            uploadPromises.push(uploadPromise)
        }

        try {
            const uploaded = await Promise.all(uploadPromises)
            setPhotos(prev => ({
                ...prev,
                [productId]: [...(prev[productId] || []), ...uploaded],
            }))
        } catch (error) {
            if (error instanceof Error && error.message.includes('200x200')) {
                alert(error.message)
            } else {
                alert('Произошла ошибка при загрузке фотографий')
            }
        }
    }

    const selectedProducts =
        data?.items.filter(item => selectedItems.includes(item.id)) || []

    const handleSubmit = () => {
        const items: ProviderRequestItemCreateDto[] = selectedProducts.map(
            product => ({
                horecaRequestItemId: product.id,
                available: true,
                manufacturer: inputData[product.id]?.manufacturer || '',
                cost: parseFloat(inputData[product.id]?.price),
                imageIds: (photos[product.id] || []).map(p => p.id),
            })
        )

        const requestData: ProviderRequestCreateDto = {
            horecaRequestId: Number(id),
            comment: comment,
            items: items,
        }

        createProviderRequest(requestData, {
            onSuccess: () => {
                setIsModalOpen(false)
                setIsSuccessModalOpen(true)
                setSelectedItems([])
                setInputData({})
                setComment('')
                setPhotos({})
            },
        })
    }

    return (
        <Flex direction='column' gap='xl'>
            {data && (
                <ProductTable
                    data={data}
                    selectedItems={selectedItems}
                    onCheckboxChange={handleCheckboxChange}
                    inputData={inputData}
                    onManufacturerChange={handleManufacturerChange}
                    onPriceChange={handlePriceChange}
                    photos={photos}
                    onPhotoUpload={handlePhotoUpload}
                    onPhotoRemove={handlePhotoRemove}
                />
            )}

            <Textarea
                label='Оставить комментарий к заявке'
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder='Введите ваш комментарий'
                styles={{ label: { color: '#748ffc' } }}
            />

            <Flex justify='center' gap='xl' w='70%' className='mx-auto'>
                <Button fullWidth onClick={() => router.back()}>
                    Вернуться к списку
                </Button>
                <Button
                    fullWidth
                    bg='pink.5'
                    onClick={() => setIsModalOpen(true)}
                    disabled={selectedItems.length === 0}
                >
                    Предпросмотр вашего ответа на заявку
                </Button>
            </Flex>

            <Modal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                size='xl'
                title='Предпросмотр ответа'
            >
                {data && (
                    <ProductTable
                        data={{
                            categories: data.categories,
                            items: selectedProducts,
                        }}
                        selectedItems={selectedItems}
                        inputData={inputData}
                        isModal
                        photos={photos}
                        onPhotoUpload={handlePhotoUpload}
                    />
                )}
                <Text mt='md' fw={500}>
                    Комментарий к заявке:
                </Text>
                <Text mt='sm' c='dimmed'>
                    {comment || 'Комментарий не указан'}
                </Text>
                <Flex justify='space-between' mt='xl'>
                    <Button
                        variant='outline'
                        onClick={() => setIsModalOpen(false)}
                    >
                        Редактировать
                    </Button>
                    <Button loading={false} onClick={handleSubmit}>
                        Отправить
                    </Button>
                </Flex>
            </Modal>

            <Modal
                opened={isSuccessModalOpen}
                onClose={() =>
                    router.push(
                        `/user/${user && role({ user })}/products/applications`
                    )
                }
                centered
                withCloseButton={false}
                title='Готово'
            >
                <Text mb='xl'>Ваше предложение отправлено. Спасибо!</Text>
                <Flex justify='flex-end'>
                    <Button
                        onClick={() =>
                            router.push(
                                `/user/${user && role({ user })}/products/applications`
                            )
                        }
                    >
                        Закрыть
                    </Button>
                </Flex>
            </Modal>
        </Flex>
    )
}