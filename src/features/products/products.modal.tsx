import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useUserStore } from '@/core/providers/userStoreContext'
import { productsQueries } from '@/entities/products'
import { imageQueries } from '@/entities/uploads'
import { handlePreviewModal } from '@/views/catalog/ui/preview-modal'
import {
    Button,
    Flex,
    Grid,
    Group,
    NumberInput,
    Select,
    Text,
    Textarea,
    TextInput,
    Image as MantineImage,
    Box,
    LoadingOverlay,
    Tooltip,
    ActionIcon,
    rem,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { CategoryLabels } from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    ProductCreateDto,
    ProviderProfileDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'
import { CustomDropzone } from '@/shared/ui/CustomDropzone'

const allowedFormats: string[] = ['image/png', 'image/jpeg']

type ProductsModalProps = {
    initialValues?: ProductCreateDto
    initialImages?: UploadDto[]
}

export function ProductsModal({
    initialValues,
    initialImages = [],
}: ProductsModalProps) {
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)

    const user = useUserStore(state => state.user)

    const categories = (user?.profile as ProviderProfileDto)?.categories.map(
        x => CategoryLabels[x as Categories]
    )

    const form = useForm<ProductCreateDto>({
        initialValues: initialValues || {
            category: categories as unknown as Categories,
            name: '',
            description: '',
            producer: '',
            cost: 0,
            count: 0,
            packagingType: '',
            imageIds: [],
        },
    })

    const { mutate: createProduct } = productsQueries.useProductMutation()
    const { mutateAsync: uploadImage, isPending: isImagePending } =
        imageQueries.useImageUploadMutation()

    const dropzone = useRef<() => void>(null)
    const [images, setImages] = useState<UploadDto[]>(initialImages)

    const handleAddMainImage = async (files: File[] | null) => {
        if (files && files.length > 0) {
            try {
                const uploadedImageDtos: UploadDto[] = await Promise.all(
                    files.map(async file => {
                        const response = await uploadImage({ file })
                        return response
                    })
                )

                const uploadedImageIds = uploadedImageDtos.map(dto => dto.id)

                form.setValues(prevState => ({
                    ...prevState,
                    imageIds: [
                        ...(prevState.imageIds ?? []),
                        ...uploadedImageIds,
                    ],
                }))

                setImages(prevImages => [
                    ...(prevImages ?? []),
                    ...uploadedImageDtos,
                ])

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

    const handleDeleteImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handlePreview = () => {
        setIsPreviewVisible(!isPreviewVisible)
    }

    useEffect(() => {
        if (isPreviewVisible) {
            handlePreviewModal({
                form: form,
                images: images,
            })
        }
    }, [isPreviewVisible])

    return (
        <Flex direction='column' gap='lg' p='md'>
            <Text fw={700} size='xl' className='text-center'>
                Добавить новый товар
            </Text>
            <form
                className='flex flex-col gap-8'
                onSubmit={async e => {
                    e.preventDefault()
                    setIsPreviewVisible(false)
                    createProduct({
                        data: form.values,
                    })
                    toast.success('Товар успешно добавлен в каталог')
                    modals.close('product')
                }}
            >
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
                                {images.length < 5 && (
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

                                {images.length > 0 && (
                                    <Flex mt='md' gap='sm'>
                                        {images.map((x, index) => {
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
                                )}
                            </Flex>

                            <Text size='sm' mt='xs' c='gray.6'>
                                Можно добавить не более 5 фотографии
                            </Text>
                        </Box>
                    </Grid.Col>
                </Grid>

                <Group justify='center' mt='md'>
                    <Button
                        variant='default'
                        onClick={e => {
                            e.preventDefault()
                            handlePreview()
                        }}
                    >
                        Предпросмотр
                    </Button>
                    <Button type='submit' color='indigo.4'>
                        Опубликовать товар
                    </Button>
                </Group>
            </form>
        </Flex>
    )
}

export function handleModal({
    initialValues,
    images,
}: {
    initialValues?: ProductCreateDto
    images?: UploadDto[]
} = {}) {
    modals.open({
        centered: true,
        modalId: 'product',
        size: 'xl',
        children: (
            <ProductsModal
                initialValues={initialValues}
                initialImages={images}
            />
        ),
    })
}
