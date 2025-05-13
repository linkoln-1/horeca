import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useUserStore } from '@/core/providers/userStoreContext'
import { productsQueries } from '@/entities/products'
import { imageQueries } from '@/entities/uploads'
import {
    Box,
    Flex,
    Grid,
    Group,
    NumberInput,
    Select,
    Text,
    Textarea,
    TextInput,
    Image as MantineImage,
    LoadingOverlay,
    Button,
    Tooltip,
    ActionIcon,
    rem,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import dayjs from 'dayjs'

import { CategoryLabels, errors } from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    ProductDto,
    ProviderProfileDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'
import { CustomDropzone } from '@/shared/ui/CustomDropzone'

export function UpdateModal({ id }: { id: number }) {
    const user = useUserStore(state => state.user)

    const categories = (user?.profile as ProviderProfileDto)?.categories.map(
        x => x as Categories
    )

    const form = useForm<ProductDto>({
        initialValues: {
            isEditable: false,
            updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
            id: 0,
            userId: 0,
            createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
            category: categories as unknown as Categories,
            name: '',
            description: '',
            producer: '',
            cost: 0,
            count: 0,
            packagingType: '',
            images: [],
        },
    })

    const { data: products } = productsQueries.useGetProductByIdQuery(id)
    const { mutate: productsUpdate } = productsQueries.useUpdateProductMutation(
        id,
        {
            onSuccess: () => {
                modals.close('product-update-modal')
                toast.success('Товар успешно отредактирован')
            },
        }
    )
    
    const { mutateAsync: uploadImage, isPending: isImagePending } =
        imageQueries.useImageUploadMutation()

    const dropzone = useRef<() => void>(null)

    const handleAddMainImage = async (files: File[] | null) => {
        if (files && files.length > 0) {
            try {
                const uploadedImageDtos: UploadDto[] = await Promise.all(
                    files.map(async file => {
                        const response = await uploadImage({ file })
                        return response
                    })
                )

                form.setValues(prevState => ({
                    ...prevState,
                    images: [...(prevState.images || []), ...uploadedImageDtos],
                }))

                toast.success('Картинка успешно загружена!')
            } catch (e) {
                console.error('Error uploading images:', e)
                toast.error(
                    'Ошибка при загрузке изображений. Попробуйте ещё раз.'
                )
            }
        } else {
            toast.error('Не выбрано ни одного файла для загрузки.')
        }
    }

    const handleDeleteImage = (imageId: number) => {
        form.setValues(prevState => ({
            ...prevState,
            images: prevState.images?.filter(image => image.id !== imageId),
        }))

        toast.success('Изображение удалено')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const updateDto = {
                category: form.values.category as Categories,
                name: form.values.name,
                description: form.values.description,
                producer: form.values.producer,
                cost: form.values.cost,
                count: form.values.count,
                packagingType: form.values.packagingType ?? '',
                imageIds: form.values.images?.map(image => image.id) || [],
            }

            productsUpdate({ data: updateDto })
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        if (products) {
            form.setValues({
                isEditable: false,
                updatedAt: dayjs(products.updatedAt).format('YYYY-MM-DD'),
                id: products.id,
                userId: products.userId,
                createdAt: dayjs(products.createdAt).format('YYYY-MM-DD'),
                category: products.category as Categories,
                name: products.name,
                description: products.description,
                producer: products.producer,
                cost: products.cost,
                count: products.count,
                packagingType: products.packagingType,
                images: products.images,
            })
        }
    }, [products])

    return (
        <Flex direction='column' gap='lg' p='md'>
            <Text fw={700} size='xl' className='text-center'>
                Редактировать товар
            </Text>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <Grid>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 6,
                        }}
                    >
                        <TextInput
                            label='Наименование'
                            placeholder='Введите наименование'
                            required
                            {...form.getInputProps('name')}
                        />
                    </Grid.Col>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 6,
                        }}
                    >
                        <TextInput
                            label='Производитель'
                            placeholder='Введите производителя'
                            required
                            {...form.getInputProps('producer')}
                        />
                    </Grid.Col>
                </Grid>
                <Textarea
                    label='Характеристики товара'
                    placeholder='Максимум 500 символов (с пробелами)'
                    required
                    minRows={4}
                    maxRows={4}
                    {...form.getInputProps('description')}
                />

                <Select
                    data={(user?.profile as ProviderProfileDto)?.categories.map(
                        x => ({
                            value: x,
                            label: CategoryLabels[x as Categories],
                        })
                    )}
                    label='Категория товара'
                    placeholder='Выберите категорию'
                    value={form.values.category}
                    onChange={value => {
                        form.setFieldValue('category', value as Categories)
                    }}
                    required
                />

                <Group grow>
                    <TextInput
                        label='Фасовка'
                        required
                        placeholder='Введите фасовку'
                        {...form.getInputProps('packagingType')}
                    />

                    <NumberInput
                        label='Цена (за ед.)'
                        placeholder='Введите цену'
                        required
                        {...form.getInputProps('cost')}
                    />
                    <NumberInput
                        label='Кол-во'
                        placeholder='Введите количество'
                        required
                        {...form.getInputProps('count')}
                    />
                </Group>

                <Grid>
                    <Grid.Col
                        span={{
                            base: 12,
                        }}
                    >
                        <Box mb='sm'>
                            <CustomDropzone
                                display='none'
                                openRef={dropzone}
                                onDrop={handleAddMainImage}
                            />

                            <LoadingOverlay
                                zIndex={1000}
                                overlayProps={{ blur: 2 }}
                                visible={isImagePending}
                            />

                            <Flex
                                direction='column'
                                gap='md'
                                className='border-2 border-dashed border-[var(--mantine-color-indigo-6)] rounded cursor-pointer'
                                justify='center'
                                py='md'
                                px='md'
                            >
                                {form.values.images &&
                                    form.values.images.length < 5 && (
                                        <Button
                                            mx='auto'
                                            w='fit-content'
                                            size='md'
                                            fw='500'
                                            c='indigo.6'
                                            variant='transparent'
                                            leftSection={<IconPlus />}
                                            onClick={() => dropzone.current?.()}
                                        >
                                            Добавить фотографии
                                        </Button>
                                    )}
                                (
                                <Flex mt='md' gap='sm'>
                                    {form.values.images &&
                                        form.values.images.map((x, index) => {
                                            return (
                                                <Box pos='relative' key={index}>
                                                    <Tooltip label='Удалить картинку'>
                                                        <ActionIcon
                                                            onClick={() =>
                                                                handleDeleteImage(
                                                                    index
                                                                )
                                                            }
                                                            color='gray'
                                                            pos='absolute'
                                                            right={rem(8 + 10)}
                                                            top={rem(8 + 10)}
                                                        >
                                                            <IconTrash
                                                                size={20}
                                                            />
                                                        </ActionIcon>
                                                    </Tooltip>
                                                    <MantineImage
                                                        radius='md'
                                                        src={getImageUrl(
                                                            x.path
                                                        )}
                                                        alt='portfolio'
                                                        className='aspect-square'
                                                    />
                                                </Box>
                                            )
                                        })}
                                </Flex>
                                )
                            </Flex>

                            <Text size='sm' mt='xs' c='gray.6'>
                                Можно добавить не более 5 фотографий
                            </Text>
                        </Box>
                    </Grid.Col>
                </Grid>

                <Flex justify='center' gap='md'>
                    <Button
                        onClick={() => {
                            modals.close('product-update-modal')
                        }}
                        bg='pink.5'
                    >
                        Отмена
                    </Button>
                    <Button type='submit' bg='indigo.4' c='white'>
                        Обновить товар
                    </Button>
                </Flex>
            </form>
        </Flex>
    )
}

export function handleUpdateModal({ id }: { id: number }) {
    modals.open({
        centered: true,
        modalId: 'product-update-modal',
        size: 'xl',
        children: <UpdateModal id={id} />,
    })
}
