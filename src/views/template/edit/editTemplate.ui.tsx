import { useRef, useState, useEffect } from 'react'

import { templateQueries } from '@/entities/template'
import { DeleteCategoryModal } from '@/features/templates/deleteCategoryModal'
import { PageLeaveModal } from '@/features/templates/pageLeaveModal'
import { SendRequestModal } from '@/features/templates/sendRequestModal'
import {
    Box,
    Flex,
    TextInput,
    Button,
    NumberInput,
    Divider,
    Title,
    Select,
    Textarea,
    Autocomplete,
    Radio,
    Group,
    CheckIcon,
} from '@mantine/core'
import { Image as MantineImage } from '@mantine/core'
import { DateInput, DateTimePicker } from '@mantine/dates'
import { FileWithPath } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconCalendar, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { CategoryLabels, HorecaTemplateDto } from '@/shared/constants'
import {
    Categories,
    HorecaRequestTemplateDto,
} from '@/shared/lib/horekaApi/Api'
import { CustomDropzone } from '@/shared/ui/CustomDropzone'

const categoryOptions = Object.values(Categories)
    .filter(value => typeof value === 'string')
    .map(x => ({
        value: x.trim(),
        label: CategoryLabels[x as Categories]?.trim() || 'Не указано',
    }))

type formType = Omit<
    HorecaRequestTemplateDto,
    'createdAt' | 'updatedAt' | 'id' | 'userId'
>

type CategoryType = { name: string; content: HorecaTemplateDto }

export function EditTemplateUi({ id }: { id: string }) {
    const form = useForm<formType>({
        initialValues: {
            name: '',
            content: {} as HorecaTemplateDto,
        },
    })

    const { data: templates } = templateQueries.useGetByIdHorecaTemplateQuery({
        id: +id,
    })
    const { mutateAsync: updateTemplate } =
        templateQueries.useUpdateHorecaTemplateMutation(+id)

    const dropzone = useRef<() => void>(null)
    const [images, setImages] = useState<FileWithPath[]>([])
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [items, setItems] = useState<
        {
            name: string
            amount: number | undefined
            unit: string
            category: string
        }[]
    >([])

    useEffect(() => {
        const fetchTemplate = async () => {
            if (templates) {
                const content: HorecaTemplateDto =
                    typeof templates.content === 'string'
                        ? JSON.parse(templates.content)
                        : templates.content

                setItems(
                    content.items?.map(x => ({
                        name: x.name,
                        amount: x.amount,
                        unit: x.unit,
                        category: x.category,
                    }))
                )

                form.setValues({
                    name: content.name,
                    content,
                })
            }
        }

        fetchTemplate()
    }, [templates])

    const handleImages = (files: FileWithPath[]) => {
        setImages(files)
    }

    const handleAddItem = () => {
        setCategories(prev => [
            ...prev,
            {
                name: '',
                content: {
                    items: [{ name: '', amount: 0, unit: '', category: '' }],
                    address: '',
                    deliveryTime: '',
                    acceptUntill: '',
                    paymentType: '',
                    name: '',
                    phone: '',
                },
            },
        ])
    }

    const handleDeleteCategory = (index: number) => {
        setCategories(prev => prev.filter((_, i) => i !== index))
    }

    const handleDeleteCategoryModal = (index: number) => {
        modals.open({
            centered: true,
            modalId: 'deleteCategory',
            radius: 'lg',
            size: 'lg',
            children: (
                <DeleteCategoryModal
                    handleDeleteCategory={() => handleDeleteCategory(index)}
                />
            ),
        })
    }

    const handleCategoryChange = (
        index: number,
        updatedCategory: CategoryType
    ) => {
        setCategories(prev =>
            prev.map((category, i) =>
                i === index ? updatedCategory : category
            )
        )
    }

    const categoriesOption: HorecaTemplateDto =
        typeof form.values.content === 'string'
            ? JSON.parse(form.values.content)
            : form.values.content

    const handleAddCategory = () => {
        setCategories(prev => [
            ...prev,
            {
                name: '',
                content: {
                    items: [{ name: '', amount: 0, unit: '', category: '' }],
                    address: '',
                    deliveryTime: '',
                    acceptUntill: '',
                    paymentType: '',
                    name: '',
                    phone: '',
                } as HorecaTemplateDto,
            },
        ])
    }

    return (
        <Box>
            {templates && (
                <>
                    <Title my='md'>{templates.name}</Title>
                    <Divider my='md' />
                    <form className='mb-8'>
                        <Flex gap='lg' justify='space-between'>
                            <Flex direction='column' justify='space-between'>
                                <Select
                                    miw={300}
                                    placeholder='Выберите категорию'
                                    label='Категория товаров'
                                    data={categoryOptions}
                                    value={
                                        categoriesOption.items &&
                                        categoriesOption.items[0]?.category
                                            ? categoriesOption.items[0].category
                                            : undefined
                                    }
                                    onChange={value => {
                                        const updatedItems = [
                                            ...categoriesOption.items,
                                        ]
                                        if (updatedItems.length > 0) {
                                            updatedItems[0].category =
                                                value || ''
                                        }
                                        form.setFieldValue('content', {
                                            ...categoriesOption,
                                            items: updatedItems,
                                        })
                                    }}
                                />
                            </Flex>
                            <Flex direction='column'>
                                {items.map((item, index) => (
                                    <Flex
                                        key={index}
                                        mb='xl'
                                        gap='md'
                                        w='100%'
                                        pos='relative'
                                        justify='space-between'
                                    >
                                        <TextInput
                                            w='280px'
                                            placeholder='Например: Горький шоколад'
                                            label='Наименование'
                                            value={item.name}
                                            onChange={e => {
                                                const newItems = [...items]
                                                newItems[index].name =
                                                    e.target.value
                                                setItems(newItems)
                                            }}
                                        />
                                        <NumberInput
                                            placeholder='456'
                                            label='Кол-во'
                                            value={item.amount}
                                            onChange={value => {
                                                const newItems = [...items]
                                                newItems[index].amount = +value
                                                setItems(newItems)
                                            }}
                                        />
                                        <TextInput
                                            placeholder='штук'
                                            label='Ед. измерения'
                                            value={item.unit}
                                            onChange={e => {
                                                const newItems = [...items]
                                                newItems[index].unit =
                                                    e.target.value
                                                setItems(newItems)
                                            }}
                                        />
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                        <Divider />

                        {categories.map((category, categoryIndex) => (
                            <Flex
                                gap='lg'
                                justify='space-between'
                                key={categoryIndex}
                                mt='md'
                            >
                                <Flex direction='column' gap='xl'>
                                    <Select
                                        miw={300}
                                        placeholder='Выберите категорию'
                                        label='Категория товаров'
                                        data={categoryOptions}
                                        value={category.name}
                                        onChange={value =>
                                            handleCategoryChange(
                                                categoryIndex,
                                                {
                                                    ...category,
                                                    name: value || '',
                                                }
                                            )
                                        }
                                    />

                                    <Button
                                        leftSection={<IconTrash />}
                                        pl='0'
                                        mb='lg'
                                        variant='transparent'
                                        c='pink.7'
                                        fw='500'
                                        size='md'
                                        onClick={() =>
                                            handleDeleteCategoryModal(
                                                categoryIndex
                                            )
                                        }
                                    >
                                        Удалить всю категорию
                                    </Button>
                                </Flex>

                                <Flex direction='column' gap='xl'>
                                    {category.content.items.map(
                                        (item, index) => (
                                            <Flex
                                                key={index}
                                                mb='xl'
                                                gap='md'
                                                w='100%'
                                                pos='relative'
                                                justify='space-between'
                                            >
                                                <TextInput
                                                    w='280px'
                                                    placeholder='Например: Горький шоколад'
                                                    label='Наименование'
                                                    value={item.name}
                                                    onChange={e => {
                                                        const updatedContent = {
                                                            ...category.content,
                                                            items: category.content.items.map(
                                                                (it, idx) =>
                                                                    idx ===
                                                                    index
                                                                        ? {
                                                                              ...it,
                                                                              name: e
                                                                                  .target
                                                                                  .value,
                                                                          }
                                                                        : it
                                                            ),
                                                        }

                                                        handleCategoryChange(
                                                            categoryIndex,
                                                            {
                                                                ...category,
                                                                content:
                                                                    updatedContent,
                                                            }
                                                        )
                                                    }}
                                                />
                                                <NumberInput
                                                    placeholder='456'
                                                    label='Кол-во'
                                                    value={item.amount}
                                                    onChange={value => {
                                                        const updatedContent = {
                                                            ...category.content,
                                                            items: category.content.items.map(
                                                                (it, idx) =>
                                                                    idx ===
                                                                    index
                                                                        ? {
                                                                              ...it,
                                                                              amount: +value,
                                                                          }
                                                                        : it
                                                            ),
                                                        }

                                                        handleCategoryChange(
                                                            categoryIndex,
                                                            {
                                                                ...category,
                                                                content:
                                                                    updatedContent,
                                                            }
                                                        )
                                                    }}
                                                />
                                                <TextInput
                                                    placeholder='штук'
                                                    label='Ед. измерения'
                                                    value={item.unit}
                                                    onChange={e => {
                                                        const updatedContent = {
                                                            ...category.content,
                                                            items: category.content.items.map(
                                                                (it, idx) =>
                                                                    idx ===
                                                                    index
                                                                        ? {
                                                                              ...it,
                                                                              unit: e
                                                                                  .target
                                                                                  .value,
                                                                          }
                                                                        : it
                                                            ),
                                                        }

                                                        handleCategoryChange(
                                                            categoryIndex,
                                                            {
                                                                ...category,
                                                                content:
                                                                    updatedContent,
                                                            }
                                                        )
                                                    }}
                                                />

                                                <Button
                                                    top='-10px'
                                                    right='-20px'
                                                    pos='absolute'
                                                    c='red'
                                                    variant='transparent'
                                                    onClick={() => {
                                                        const updatedContent = {
                                                            ...category.content,
                                                            items: category.content.items.filter(
                                                                (_, idx) =>
                                                                    idx !==
                                                                    index
                                                            ),
                                                        }

                                                        handleCategoryChange(
                                                            categoryIndex,
                                                            {
                                                                ...category,
                                                                content:
                                                                    updatedContent,
                                                            }
                                                        )
                                                    }}
                                                    rightSection={<IconX />}
                                                />
                                            </Flex>
                                        )
                                    )}
                                    <Button
                                        leftSection={<IconPlus />}
                                        w='fit-content'
                                        variant='transparent'
                                        fw='500'
                                        size='md'
                                        onClick={() => {
                                            const updatedItems = [
                                                ...(category.content.items ||
                                                    []),
                                                {
                                                    name: '',
                                                    amount: 0,
                                                    unit: '',
                                                    category: '',
                                                },
                                            ]

                                            handleCategoryChange(
                                                categoryIndex,
                                                {
                                                    ...category,
                                                    content: {
                                                        ...category.content,
                                                        items: updatedItems,
                                                    },
                                                }
                                            )
                                        }}
                                    >
                                        Добавить товар в категорию
                                    </Button>
                                </Flex>
                            </Flex>
                        ))}

                        <Flex justify='flex-end'>
                            <Button
                                my='xl'
                                fw='500'
                                size='md'
                                radius='xl'
                                bg='indigo'
                                onClick={handleAddCategory}
                            >
                                Добавить новую категорию
                            </Button>
                        </Flex>
                        <Divider my='lg' />

                        <Flex gap='xl' justify='space-between' mb='xl'>
                            <Flex
                                justify='space-between'
                                direction='column'
                                gap='xl'
                                w='50%'
                            >
                                <Box mb='sm'>
                                    <CustomDropzone
                                        display='none'
                                        openRef={dropzone}
                                        onDrop={files => handleImages(files)}
                                    />
                                    <Flex
                                        direction='column'
                                        gap='md'
                                        c='gray.5'
                                        onClick={() => dropzone.current?.()}
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
                                        >
                                            Добавить фотографии
                                        </Button>

                                        {images.length > 0 && (
                                            <Flex mt='md' gap='sm'>
                                                {images.map((img, index) => {
                                                    const imageUrl =
                                                        URL.createObjectURL(img)
                                                    return (
                                                        <Box
                                                            pos='relative'
                                                            key={index}
                                                        >
                                                            <MantineImage
                                                                w='100px'
                                                                h='100px'
                                                                fit='cover'
                                                                radius='md'
                                                                src={imageUrl}
                                                                onLoad={() =>
                                                                    URL.revokeObjectURL(
                                                                        imageUrl
                                                                    )
                                                                }
                                                            />
                                                            <IconX
                                                                cursor='pointer'
                                                                color='white'
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    top: 5,
                                                                    right: 5,
                                                                }}
                                                            />
                                                        </Box>
                                                    )
                                                })}
                                            </Flex>
                                        )}
                                    </Flex>
                                </Box>

                                <Textarea
                                    size='md'
                                    h='fit-content'
                                    styles={{
                                        input: { minHeight: '130px' },
                                    }}
                                    description='До 400 символов'
                                    label='Комментарий к заявке'
                                    placeholder='Вас встретит наш сотрудник, Виталий, менеджер по закупкам'
                                />
                                <Autocomplete
                                    label='Адрес доставки'
                                    placeholder='Г. Сочи, ул. Курортный пр-т, 109'
                                />
                            </Flex>
                            <Flex direction='column' gap='xl' w='50%'>
                                <Flex
                                    align='flex-end'
                                    justify='space-between'
                                    gap='sm'
                                >
                                    <DateTimePicker
                                        flex={1}
                                        size='md'
                                        valueFormat='DD/MM/YYYY HH:mm:ss'
                                        label='Привезите товар не позднее:'
                                        placeholder='ДД/ММ/ГГГГ ЧЧ:ММ'
                                        rightSection={
                                            <IconCalendar
                                                color={
                                                    'var(--mantine-color-indigo-6)'
                                                }
                                            />
                                        }
                                    />
                                    <DateInput
                                        flex={1}
                                        size='md'
                                        placeholder='ДД.ММ.ГГ'
                                        valueFormat='DD.MM.YY'
                                        minDate={new Date()}
                                        rightSection={
                                            <IconCalendar
                                                color={
                                                    'var(--mantine-color-indigo-6)'
                                                }
                                            />
                                        }
                                        label='Принимать заявки до'
                                    />
                                </Flex>
                                <Flex>
                                    <Radio.Group
                                        name='paymentMethod'
                                        mb='md'
                                        label='Способ оплаты'
                                        w='100%'
                                    >
                                        <Group justify='space-between' mt='xs'>
                                            <Radio
                                                icon={CheckIcon}
                                                value='prepayment'
                                                label='Предоплата'
                                            />
                                            <Radio
                                                icon={CheckIcon}
                                                value='deferment'
                                                label='Отсрочка'
                                            />
                                            <Radio
                                                icon={CheckIcon}
                                                value='fact'
                                                label='По факту'
                                            />
                                        </Group>
                                    </Radio.Group>
                                </Flex>
                                <Flex justify='space-between' gap='sm'>
                                    <TextInput
                                        label='Наименование заказчика'
                                        placeholder='ООО "РОМАШКА"'
                                    />
                                    <TextInput
                                        flex={1}
                                        label='Телефон для связи'
                                        placeholder='+7 (986) 860 90 56'
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Divider />

                        <Flex mt='xl' justify='flex-end' gap='md'>
                            <Button fw='500' size='md' radius='xl' bg='indigo'>
                                Сохранить изменения
                            </Button>
                            <Button
                                onClick={handleSendRequestModal}
                                fw='500'
                                size='md'
                                radius='xl'
                                bg='#CC2C79'
                            >
                                Отправить заявку
                            </Button>
                        </Flex>
                    </form>
                </>
            )}
        </Box>
    )
}

const handleSendRequestModal = () => {
    modals.open({
        centered: true,
        modalId: 'sendRequest',
        radius: 'lg',
        size: 'lg',
        children: <SendRequestModal />,
    })
}

const handlePageLeaveModal = () => {
    modals.open({
        centered: true,
        modalId: 'pageLeave',
        radius: 'lg',
        size: 'xl',
        children: <PageLeaveModal />,
    })
}
