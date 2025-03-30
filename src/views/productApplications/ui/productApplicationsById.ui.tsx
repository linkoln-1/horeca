'use client'

import React, { useState } from 'react'

import { ProductTable } from './productTable'
import { useUserStore } from '@/core/providers/userStoreContext'
import { providerRequest } from '@/entities/provider-request'
import { useProviderRequestMutation } from '@/entities/provider-request/request.queries'
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

    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isExitConfirmModalOpen, setIsExitConfirmModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [inputData, setInputData] = useState<
        Record<number, { manufacturer: string; price: string }>
    >({})
    const [comment, setComment] = useState<string>('')
    const [photos, setPhotos] = useState<Record<number, string[]>>({})

    const { mutate: createProviderRequest, isPending } =
        useProviderRequestMutation()

    const handleCheckboxChange = (itemId: number) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        )
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

    const handlePhotoUpload = (productId: number, files: FileList) => {
        const currentPhotos = photos[productId] || []
        if (currentPhotos.length >= 3) {
            alert('Максимальное количество фотографий (3) уже загружено')
            return
        }

        const newPhotos: string[] = []
        for (
            let i = 0;
            i < Math.min(files.length, 3 - currentPhotos.length);
            i++
        ) {
            const file = files[i]
            const reader = new FileReader()
            reader.onload = e => {
                const img = new window.Image()
                img.src = e.target?.result as string
                img.onload = () => {
                    if (img.width <= 200 && img.height <= 200) {
                        newPhotos.push(e.target?.result as string)
                        if (
                            newPhotos.length ===
                            Math.min(files.length, 3 - currentPhotos.length)
                        ) {
                            setPhotos(prev => ({
                                ...prev,
                                [productId]: [...currentPhotos, ...newPhotos],
                            }))
                        }
                    } else {
                        alert('Фото должно быть размером 200x200 пикселей')
                    }
                }
            }
            reader.readAsDataURL(file)
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
                imageIds: [],
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
            onError: () => {},
        })
    }

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false)
        router.push(`/user/${user && role({ user })}/products/applications`)
    }

    const handleBackClick = () => {
        setIsExitConfirmModalOpen(true)
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
                />
            )}

            <Textarea
                label='Оставить комментарий к заявке'
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder='Введите ваш комментарий'
                styles={{
                    label: {
                        color: '#748ffc',
                    },
                }}
            />

            <Flex justify='center' gap='xl' w='70%' className='mx-auto'>
                <Button fullWidth bg='indigo.4' onClick={handleBackClick}>
                    Вернуться к списку заявок
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
                title='Предпросмотр вашего ответа на заявку'
                size='xl'
            >
                {data && (
                    <ProductTable
                        data={{
                            categories: data.categories,
                            items: selectedProducts,
                        }}
                        selectedItems={selectedItems}
                        inputData={inputData}
                        isModal={true}
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
                        Вернуться к редактированию
                    </Button>
                    <Button loading={isPending} onClick={handleSubmit}>
                        Отправить предложение
                    </Button>
                </Flex>
            </Modal>

            <Modal
                opened={isExitConfirmModalOpen}
                onClose={() => setIsExitConfirmModalOpen(false)}
                title='Подтверждение'
                centered
            >
                <Text mb='xl'>
                    Вы уверены, что хотите вернуться к списку заявок? Внесенные
                    изменения не сохранятся
                </Text>
                <Flex justify='flex-end' gap='md'>
                    <Button
                        variant='outline'
                        onClick={() => setIsExitConfirmModalOpen(false)}
                    >
                        Нет
                    </Button>
                    <Button
                        color='red'
                        onClick={() =>
                            router.push(
                                `/user/${user && role({ user })}/products/applications`
                            )
                        }
                    >
                        Да
                    </Button>
                </Flex>
            </Modal>

            <Modal
                opened={isSuccessModalOpen}
                onClose={handleSuccessModalClose}
                title='Предложение отправлено'
                centered
                withCloseButton={false}
            >
                <Text mb='xl'>
                    Спасибо! Ваше предложение направлено покупателю. О его
                    решении узнаете в Истории заявок
                </Text>
                <Flex justify='flex-end'>
                    <Button onClick={handleSuccessModalClose}>Закрыть</Button>
                </Flex>
            </Modal>
        </Flex>
    )
}
