'use client'

import { useRef, useState } from 'react'

import { SaveModal } from '@/features/templates/saveModal'
import { ThanksModal } from '@/features/templates/thanksModal'
import {
    Flex,
    Select,
    Text,
    Box,
    Paper,
    TextInput,
    Button,
    Image as MantineImage,
    Textarea,
    Autocomplete,
    Radio,
    Group,
    CheckIcon,
} from '@mantine/core'
import { DateTimePicker, DateInput, DateValue } from '@mantine/dates'
import { FileWithPath } from '@mantine/dropzone'
import { modals } from '@mantine/modals'
import { IconPlus, IconX } from '@tabler/icons-react'

import { CustomDropzone } from '@/shared/ui/CustomDropzone'
import { Categories, HorecaProfileDto, HorecaRequestCreateDto } from '@/shared/lib/horekaApi/Api'
import { useForm } from '@mantine/form'
import { useUserStore } from '@/core/providers/userStoreContext'
import { CategoryLabels } from '@/shared/constants'
import { PaymentMethod } from '@/shared/constants/paymentMethod'

export function CreateRequestView() {
    const user = useUserStore(state => state.user)
    const categories = (user?.profile as HorecaProfileDto)?.categories.map(
        x => CategoryLabels[x as Categories]
    )

    const form = useForm<HorecaRequestCreateDto>({
        initialValues: {
            items: [
                {
                    name: '',
                    amount: 0,
                    unit: '',
                    category: categories as unknown as Categories
                }
            ],
            address: '',
            deliveryTime: '',
            acceptUntill: '',
            paymentType: PaymentMethod.Prepayment,
            name: '',
            phone: ''
        }
    })

    const dropzone = useRef<() => void>(null)
    const [images, setImages] = useState<FileWithPath[]>([])
    const [category, setCategory] = useState<string | null>()
    const [comment, setComment] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [deliveryTime, setDeliveryTime] = useState<DateValue>()
    const [acceptUntill, setAcceptUntill] = useState<DateValue>()
    const [paymentType, setPaymentType] = useState<string>()
    const [name, setName] = useState<string>()
    const [phone, setPhone] = useState<string>()

    const addNewProducts = () => {
        const newProducts = {
        name: '',
        amount: 0,
        unit: '',
        category: categories as unknown as Categories
    }
        form.insertListItem('items', newProducts)
    }

    // const [categories, setCategories] = useState([
    //     {
    //         name: '',
    //         products: [
    //             {
    //                 name: '',
    //                 quantity: '',
    //                 unit: '',
    //             },
    //         ],
    //     },
    // ])

    const handleImages = (files: FileWithPath[]) => {
        setImages(files)
    }

    const createNewCategory = () => {
        setCategories([
            ...categories,
            { name: '', products: [{ name: '', quantity: '', unit: '' }] },
        ])
    }

    const createNewProduct = (index: number) => {
        const newCategories = [...categories]
        newCategories[index].products.push({ name: '', quantity: '', unit: '' })
        setCategories(newCategories)
    }

    return (
        <Flex justify='space-between' mt='md' gap='lg'>
            <Box miw='250px'>
                <Select
                    label='Шаблоны'
                    placeholder='Новый шаблон'
                    data={[
                        'Рыба (красная)',
                        'Палтус',
                        'Шоколад темный с орехами 85%',
                        'Креветка магаданская',
                    ]}
                />
            </Box>
            <Paper p='md' w='100%' shadow='md' withBorder>
                <form action=''>
                    {categories.map((category, index) => (
                        <Box key={index}>
                            <Text fw='500'>Категория</Text>
                            <Select
                                placeholder='Безалкогольные напитки, вода, соки'
                                data={[
                                    'Безалкогольные напитки, вода, соки',
                                    'Шоколад',
                                    'Мясные продукты',
                                    'Молочные продукты',
                                ]}
                                mb='md'
                                onChange={e => setCategory(e)}
                            />
                            {category.products.map((product, productIndex) => (
                                <Flex
                                    key={productIndex}
                                    mb='md'
                                    justify='space-between'
                                    gap='5px'
                                >
                                    <TextInput
                                        label='Название'
                                        onChange={e => {
                                            const newProduct = {
                                                ...product,
                                                name: e.target.value,
                                            }
                                            const newCategories = [
                                                ...categories,
                                            ]
                                            newCategories[index].products[
                                                productIndex
                                            ] = newProduct
                                            setCategories(newCategories)
                                        }}
                                    />
                                    <TextInput
                                        type='number'
                                        label='Кол-во'
                                        value={product.quantity}
                                        onChange={e => {
                                            const newProduct = {
                                                ...product,
                                                quantity: e.target.value,
                                            }
                                            const newCategories = [
                                                ...categories,
                                            ]
                                            newCategories[index].products[
                                                productIndex
                                            ] = newProduct
                                            setCategories(newCategories)
                                        }}
                                    />
                                    <TextInput
                                        label='Ед. изм.'
                                        value={product.unit}
                                        onChange={e => {
                                            const newProduct = {
                                                ...product,
                                                unit: e.target.value,
                                            }
                                            const newCategories = [
                                                ...categories,
                                            ]
                                            newCategories[index].products[
                                                productIndex
                                            ] = newProduct
                                            setCategories(newCategories)
                                        }}
                                    />
                                </Flex>
                            ))}
                            <Button
                                onClick={() => createNewProduct(index)}
                                variant='transparent'
                            >
                                <Flex gap='sm' c='indigo'>
                                    <IconPlus />
                                    <Text size='lg'>
                                        Добавить новый товар в категории
                                    </Text>
                                </Flex>
                            </Button>
                        </Box>
                    ))}

                    <Flex
                        mb='sm'
                        gap='md'
                        align='flex-start'
                        direction='column'
                    >
                        <Button
                            onClick={createNewCategory}
                            variant='transparent'
                        >
                            <Flex gap='sm' c='indigo'>
                                <IconPlus />
                                <Text size='lg'>Добавить новую категорию</Text>
                            </Flex>
                        </Button>
                    </Flex>

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
                            style={{
                                border: '2px dashed gray',
                                borderRadius: '8px',
                                cursor: 'pointer',
                            }}
                            justify='center'
                            py='md'
                            px='md'
                        >
                            <Button
                                mx='auto'
                                w='fit-content'
                                size='md'
                                fw='500'
                                c='white'
                                bg='indigo'
                            >
                                Добавить фотографии
                            </Button>

                            {images.length > 0 && (
                                <Flex mt='md' gap='sm'>
                                    {images.map((img, index) => {
                                        const imageUrl =
                                            URL.createObjectURL(img)
                                        return (
                                            <Box pos='relative' key={index}>
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
                                                        position: 'absolute',
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

                        <Text c='gray.5'>
                            Можно добавить не более 5 фотографий
                        </Text>
                    </Box>

                    <Box mb='sm'>
                        <Textarea
                            label='Комментарий к заявке'
                            description='До 400 символов'
                            onChange={e => setComment(e.target.value)}
                        />
                    </Box>

                    <Box mb='sm'>
                        <Autocomplete
                            label='Адрес доставки'
                            onChange={value => setAddress(value)}
                        />
                    </Box>

                    <Flex mb='md' justify='space-between'>
                        <DateTimePicker
                            w='fit-content'
                            valueFormat='DD/MM/YYYY HH:mm:ss'
                            label='Привезите товар не позднее:'
                            placeholder='ДД/ММ/ГГГГ ЧЧ:ММ'
                            onChange={value => {
                                setDeliveryTime(value)
                            }}
                        />
                        <DateInput
                            valueFormat='DD/MM/YY'
                            label='Принимать заявки до:'
                            placeholder='ДД.ММ.ГГ'
                            onChange={value => {
                                setAcceptUntill(value)
                            }}
                        />
                    </Flex>

                    <Radio.Group
                        name='paymentMethod'
                        mb='md'
                        label='Способ оплаты'
                        onChange={e => {
                            setPaymentType(e)
                        }}
                    >
                        <Group mt='xs'>
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

                    <Flex mb='xl' justify='space-between'>
                        <TextInput
                            placeholder='Название компании'
                            onChange={e => {
                                setName(e.target.value)
                            }}
                        />
                        <TextInput
                            placeholder='Номер телефона'
                            onChange={e => {
                                setPhone(e.target.value)
                            }}
                        />
                    </Flex>

                    <Flex justify='space-between'>
                        <Button
                            onClick={() =>
                                handleModal(
                                    'saveTemplateModal',
                                    'Укажите имя для нового шаблона',
                                    'lg',
                                    <SaveModal />
                                )
                            }
                            c='indigo'
                            size='lg'
                            fw='500'
                            variant='outline'
                        >
                            Сохранить шаблон
                        </Button>
                        <Button
                            onClick={() =>
                                handleModal(
                                    'thanksTemplateModal',
                                    'Спасибо!',
                                    'md',
                                    <ThanksModal />
                                )
                            }
                            c='white'
                            size='lg'
                            fw='500'
                            bg='pink.5'
                        >
                            Отправить заявку
                        </Button>
                    </Flex>
                </form>
            </Paper>
        </Flex>
    )
}

function handleModal(
    modalId: string,
    title: string,
    size: string,
    children: React.ReactNode
) {
    modals.open({
        title,
        centered: true,
        modalId,
        radius: 'md',
        size,
        children,
    })
}
