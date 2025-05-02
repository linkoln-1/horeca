import React, { useState } from 'react'
import {
    Checkbox,
    Table,
    Text,
    TextInput,
    Flex,
    Image,
    Modal,
    SimpleGrid,
    Button,
} from '@mantine/core'

interface Product {
    id: number
    name: string
    amount: number
    unit: string
    category: string
    manufacturer?: string
    price?: string
}

interface ProductTableProps {
    data: { categories: string[]; items: Product[] }
    selectedItems: number[]
    onCheckboxChange?: (itemId: number) => void
    inputData?: Record<number, { manufacturer: string; price: string }>
    isModal?: boolean
    onManufacturerChange?: (itemId: number, value: string) => void
    onPriceChange?: (itemId: number, value: string) => void
    photos: Record<number, number[]>
    onPhotoUpload?: (productId: number, files: FileList) => void
}

export function ProductTable({
    data,
    selectedItems,
    onCheckboxChange,
    inputData,
    isModal = false,
    onManufacturerChange,
    onPriceChange,
    photos,
    onPhotoUpload,
}: ProductTableProps) {
    const [modalOpened, setModalOpened] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

    const openModal = (productId: number) => {
        setSelectedProductId(productId)
        setModalOpened(true)
    }

    return (
        <>
            <Table withRowBorders withColumnBorders>
                <Table.Thead bg='indigo.4'>
                    <Table.Tr>
                        {[
                            '№',
                            'Наименование',
                            'Количество',
                            !isModal && 'В наличии',
                            'Производитель',
                            'Цена',
                            'Фото',
                        ]
                            .filter(Boolean)
                            .map((tab, index) => (
                                <Table.Th key={index} c='#FFF' p='md'>
                                    <Flex justify='center'>{tab}</Flex>
                                </Table.Th>
                            ))}
                    </Table.Tr>
                </Table.Thead>

                {data.categories.length === 0 && (
                    <Flex direction='column' gap='md' pos='relative'>
                        <Flex
                            direction='column'
                            justify='center'
                            align='center'
                            h='50vh'
                            pos='absolute'
                            w='78vw'
                        >
                            <Text fw={600} size='xl'>
                                Скоро здесь появятся новые заявки! А пока вы
                                можете заполнить свой каталог
                            </Text>
                            <Text c='gray'>
                                Перейдите к заполнению каталога в левом меню,
                                нажав на раздел «Мой каталог»
                            </Text>
                        </Flex>
                    </Flex>
                )}

                {data.categories.map(date => (
                    <React.Fragment key={date}>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td colSpan={5} align='left' p='md'>
                                    <Text
                                        size='sm'
                                        c='#909090'
                                    >{`${date}`}</Text>
                                </Table.Td>
                            </Table.Tr>

                            {data.items.map((product, index) =>
                                date === product.category ? (
                                    <Table.Tr key={product.id} bg='#F5F7FD'>
                                        <Table.Td align='center' p='md'>
                                            {index}
                                        </Table.Td>
                                        <Table.Td align='center' p='md'>
                                            <Text size='sm'>
                                                {product.name}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td align='center' p='md'>
                                            <Text size='sm'>
                                                {product.amount} {product.unit}
                                            </Text>
                                        </Table.Td>
                                        {!isModal && (
                                            <Table.Td align='center' p='md'>
                                                <Checkbox
                                                    className='flex justify-center'
                                                    checked={selectedItems.includes(
                                                        product.id
                                                    )}
                                                    onChange={() =>
                                                        onCheckboxChange?.(
                                                            product.id
                                                        )
                                                    }
                                                />
                                            </Table.Td>
                                        )}
                                        <Table.Td align='center' p='md'>
                                            {isModal ? (
                                                <Text size='sm'>
                                                    {inputData?.[product.id]
                                                        ?.manufacturer || '—'}
                                                </Text>
                                            ) : (
                                                <TextInput
                                                    className='flex justify-center'
                                                    placeholder='Наименование'
                                                    value={
                                                        inputData?.[product.id]
                                                            ?.manufacturer || ''
                                                    }
                                                    onChange={e =>
                                                        onManufacturerChange?.(
                                                            product.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            )}
                                        </Table.Td>
                                        <Table.Td align='center' p='md'>
                                            {isModal ? (
                                                <Text size='sm'>
                                                    {inputData?.[product.id]
                                                        ?.price || '—'}
                                                </Text>
                                            ) : (
                                                <TextInput
                                                    className='flex justify-center'
                                                    placeholder='Цена за всё (руб)'
                                                    value={
                                                        inputData?.[product.id]
                                                            ?.price || ''
                                                    }
                                                    onChange={e =>
                                                        onPriceChange?.(
                                                            product.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            )}
                                        </Table.Td>
                                        <Table.Td align='center' p='md'>
                                            {isModal ? (
                                                <SimpleGrid
                                                    cols={3}
                                                    spacing='sm'
                                                >
                                                    {photos[product.id]?.map(
                                                        (photo, index) => (
                                                            <Image
                                                                key={index}
                                                                src={photo}
                                                                width={50}
                                                                height={50}
                                                                alt={`Photo ${index}`}
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </SimpleGrid>
                                            ) : (
                                                <>
                                                    <input
                                                        type='file'
                                                        accept='image/*'
                                                        multiple
                                                        onChange={e => {
                                                            if (
                                                                e.target.files
                                                            ) {
                                                                onPhotoUpload?.(
                                                                    product.id,
                                                                    e.target
                                                                        .files
                                                                )
                                                            }
                                                        }}
                                                        style={{
                                                            display: 'none',
                                                        }}
                                                        id={`file-input-${product.id}`}
                                                        disabled={(photos[product.id] || []).length >= 3}
                                                    />
                                                    <label
                                                        htmlFor={`file-input-${product.id}`}
                                                    >
                                                        <Button
                                                            variant='outline'
                                                            size='sm'
                                                            component='span'
                                                            disabled={(photos[product.id] || []).length >= 3}
                                                        >
                                                            Загрузить фото
                                                        </Button>
                                                    </label>
                                                    {(photos[product.id] || []).length >= 3 && (
                                                        <Text size='sm' c='red' mt='sm'>
                                                            Максимальное количество фотографий (3) загружено
                                                        </Text>
                                                    )}
                                                </>
                                            )}
                                        </Table.Td>
                                    </Table.Tr>
                                ) : (
                                    ''
                                )
                            )}
                        </Table.Tbody>
                    </React.Fragment>
                ))}
            </Table>

            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title='Фотографии'
                size='lg'
            >
                {selectedProductId && (
                    <SimpleGrid cols={3} spacing='md'>
                        {photos[selectedProductId]?.map((photo, index) => (
                            <Image
                                key={index}
                                src={photo}
                                width={200}
                                height={200}
                                alt={`Photo ${index}`}
                                style={{ objectFit: 'cover' }}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Modal>
        </>
    )
}