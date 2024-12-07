import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useUserStore } from '@/core/providers/userStoreContext'
import { productsQueries } from '@/entities/products'
import { imageQueries } from '@/entities/uploads'
import {
    ActionIcon,
    Button,
    Flex,
    Grid,
    Group,
    NumberInput,
    rem,
    Select,
    Text,
    Textarea,
    TextInput,
    Tooltip,
    Image as MantineImage,
    MultiSelect,
    Box,
    LoadingOverlay,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { CategoryLabels } from '@/shared/constants'
import { packageTypeLabel } from '@/shared/constants/packageType'
import { getImageUrl } from '@/shared/helpers'
import {
    Categories,
    ProductCreateDto,
    ProductPackagingType,
    ProviderProfileDto,
    UploadDto,
} from '@/shared/lib/horekaApi/Api'
import { CustomDropzone } from '@/shared/ui/CustomDropzone'

const allowedFormats: string[] = ['image/png', 'image/jpeg']

export function ProductsModal() {
    const user = useUserStore(state => state.user)

    const categories = (user?.profile as ProviderProfileDto)?.categories.map(
        x => CategoryLabels[x as Categories]
    )

    const packageTypes = Object.values(ProductPackagingType)
        .filter(value => typeof value === 'string')
        .map(x => ({
            value: x.trim(),
            label:
                packageTypeLabel[x as ProductPackagingType]?.trim() ||
                'Не указано',
        }))

    const form = useForm<ProductCreateDto>({
        initialValues: {
            category: categories as unknown as Categories,
            name: '',
            description: '',
            producer: '',
            cost: 0,
            count: 0,
            packagingType: [] as unknown as ProductPackagingType,
            imageIds: [],
        },
    })

    const { mutate: createProduct } = productsQueries.useProductMutation()
    const { mutateAsync: uploadImage, isPending: isImagePending } =
        imageQueries.useImageUploadMutation()

    const dropzone = useRef<() => void>(null)
    const [images, setImages] = useState<UploadDto[]>([])

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

    return (
        <Flex direction='column' gap='lg' p='md'>
            <Text fw={700} size='xl' className='text-center'>
                Добавить Новый товар
            </Text>
            <form
                className='flex flex-col gap-8'
                onSubmit={async e => {
                    e.preventDefault()
                    createProduct(form.values)
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
                    placeholder='Выберите категорию'
                    value={form.values.category}
                    onChange={value => {
                        form.setFieldValue('category', value as Categories)
                    }}
                />

                <Group grow>
                    <MultiSelect
                        label='Фасовка'
                        placeholder='Выберите фасовку'
                        data={packageTypes}
                        {...form.getInputProps('packagingType')}
                        searchable
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

                {/*TODO оставлено пока поправиться загрузка картинок на бэке (после загрузки картинки должно выдавать ссылку на картинкку*/}
                <Grid>
                    {/*{form.values.imageIds.map((item, index) => (*/}
                    {/*    <Grid.Col*/}
                    {/*        key={index}*/}
                    {/*        span={{*/}
                    {/*            base: 12,*/}
                    {/*            md: 6,*/}
                    {/*            lg: 3,*/}
                    {/*        }}*/}
                    {/*        pos='relative'*/}
                    {/*    >*/}
                    {/*        <Tooltip label='Удалить картинку'>*/}
                    {/*            <ActionIcon*/}
                    {/*                // onClick={() => removeImage(item.id)}*/}
                    {/*                color='gray'*/}
                    {/*                pos='absolute'*/}
                    {/*                right={rem(8 + 10)}*/}
                    {/*                top={rem(8 + 10)}*/}
                    {/*            >*/}
                    {/*                <IconTrash size={20} />*/}
                    {/*            </ActionIcon>*/}
                    {/*        </Tooltip>*/}
                    {/*        <MantineImage*/}
                    {/*            radius='md'*/}
                    {/*            src={''}*/}
                    {/*            alt='portfolio'*/}
                    {/*            className='aspect-square'*/}
                    {/*        />*/}
                    {/*    </Grid.Col>*/}
                    {/*))}*/}

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

                                {images.length > 0 && (
                                    <Flex mt='md' gap='sm'>
                                        {images.map((img, index) => {
                                            return (
                                                <Box pos='relative' key={index}>
                                                    <MantineImage
                                                        w='100px'
                                                        h='100px'
                                                        fit='cover'
                                                        className='aspect-square'
                                                        radius='md'
                                                        src={getImageUrl(
                                                            img.path
                                                        )}
                                                        onLoad={() =>
                                                            getImageUrl(
                                                                img.path
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        type='button'
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: 0,
                                                            right: -5,
                                                        }}
                                                        onClick={() =>
                                                            handleDeleteImage(
                                                                index
                                                            )
                                                        }
                                                        bg='transparent'
                                                        rightSection={
                                                            <IconX
                                                                cursor='pointer'
                                                                color='red'
                                                            />
                                                        }
                                                    />
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                )}
                            </Flex>
                        </Box>
                    </Grid.Col>
                </Grid>

                <Group justify='center' mt='md'>
                    <Button variant='default'>Предпросмотр</Button>
                    <Button type='submit' color='indigo.4'>
                        Опубликовать товар
                    </Button>
                </Group>
            </form>
        </Flex>
    )
}
