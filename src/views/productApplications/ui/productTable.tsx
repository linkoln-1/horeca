import React from 'react'

import {
    Table,
    Text,
    TextInput,
    Checkbox,
    Flex,
    Image,
    Group,
    ActionIcon,
    Paper,
    Tooltip,
    Badge,
} from '@mantine/core'
import { IconX, IconUpload } from '@tabler/icons-react'

import { CategoryLabels } from '@/shared/constants'
import { getImageUrl } from '@/shared/helpers'
import { Categories } from '@/shared/lib/horekaApi/Api'

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
    photos?: Record<number, { id: number; path: string }[]>
    onPhotoUpload?: (productId: number, files: FileList) => void
    onPhotoRemove?: (productId: number, index: number) => void
}

export function ProductTable({
    data,
    selectedItems,
    onCheckboxChange,
    inputData,
    isModal = false,
    onManufacturerChange,
    onPriceChange,
    photos = {},
    onPhotoUpload,
    onPhotoRemove,
}: ProductTableProps) {
    return (
        <Paper shadow='sm' p='md' radius='md' withBorder>
            <Table
                striped
                highlightOnHover
                verticalSpacing='md'
                withColumnBorders
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Наименование</Table.Th>
                        <Table.Th>Количество</Table.Th>
                        {!isModal && <Table.Th>В наличии</Table.Th>}
                        <Table.Th>Производитель</Table.Th>
                        <Table.Th>Цена</Table.Th>
                        <Table.Th>Фото</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                {data.categories.map(category => (
                    <React.Fragment key={category}>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td colSpan={7}>
                                    <Badge
                                        variant='light'
                                        color='indigo'
                                        size='lg'
                                    >
                                        {category in CategoryLabels
                                            ? CategoryLabels[
                                                  category as Categories
                                              ]
                                            : category}
                                    </Badge>
                                </Table.Td>
                            </Table.Tr>

                            {data.items
                                .filter(
                                    product => product.category === category
                                )
                                .map((product, index) => (
                                    <Table.Tr key={product.id}>
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td>
                                            <Text size='sm'>
                                                {product.name}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size='sm'>
                                                {product.amount} {product.unit}
                                            </Text>
                                        </Table.Td>

                                        {!isModal && (
                                            <Table.Td>
                                                <Flex justify='center'>
                                                    <Checkbox
                                                        checked={selectedItems.includes(
                                                            product.id
                                                        )}
                                                        onChange={() =>
                                                            onCheckboxChange?.(
                                                                product.id
                                                            )
                                                        }
                                                    />
                                                </Flex>
                                            </Table.Td>
                                        )}

                                        <Table.Td>
                                            {isModal ? (
                                                <Text size='sm'>
                                                    {inputData?.[product.id]
                                                        ?.manufacturer || '—'}
                                                </Text>
                                            ) : (
                                                <TextInput
                                                    size='xs'
                                                    placeholder='Производитель'
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
                                                />
                                            )}
                                        </Table.Td>

                                        <Table.Td>
                                            {isModal ? (
                                                <Text size='sm'>
                                                    {inputData?.[product.id]
                                                        ?.price || '—'}
                                                </Text>
                                            ) : (
                                                <TextInput
                                                    size='xs'
                                                    placeholder='Цена'
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
                                                />
                                            )}
                                        </Table.Td>

                                        <Table.Td>
                                            <Group>
                                                {(photos[product.id] || []).map(
                                                    (imageObj, i) => (
                                                        <Tooltip
                                                            label='Удалить фото'
                                                            key={`${imageObj.id}-${i}`}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                <Image
                                                                    src={getImageUrl(
                                                                        imageObj.path
                                                                    )}
                                                                    alt={`product-${product.id}-photo-${i}`}
                                                                    width={70}
                                                                    height={70}
                                                                    radius='sm'
                                                                    style={{
                                                                        objectFit:
                                                                            'cover',
                                                                        borderRadius: 8,
                                                                        border: '1px solid #ccc',
                                                                        width: '70px',
                                                                        height: '70px',
                                                                    }}
                                                                />
                                                                {!isModal && (
                                                                    <ActionIcon
                                                                        color='red'
                                                                        size='xs'
                                                                        radius='xl'
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: -6,
                                                                            right: -6,
                                                                            background:
                                                                                'white',
                                                                        }}
                                                                        onClick={() =>
                                                                            onPhotoRemove?.(
                                                                                product.id,
                                                                                i
                                                                            )
                                                                        }
                                                                    >
                                                                        <IconX
                                                                            size={
                                                                                14
                                                                            }
                                                                            color='red'
                                                                        />
                                                                    </ActionIcon>
                                                                )}
                                                            </div>
                                                        </Tooltip>
                                                    )
                                                )}

                                                {!isModal &&
                                                    (photos[product.id]
                                                        ?.length || 0) < 3 && (
                                                        <>
                                                            <input
                                                                type='file'
                                                                accept='image/*'
                                                                multiple
                                                                id={`upload-${product.id}`}
                                                                style={{
                                                                    display:
                                                                        'none',
                                                                }}
                                                                onChange={e => {
                                                                    if (
                                                                        e.target
                                                                            .files
                                                                    ) {
                                                                        onPhotoUpload?.(
                                                                            product.id,
                                                                            e
                                                                                .target
                                                                                .files
                                                                        )
                                                                        e.target.value =
                                                                            ''
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`upload-${product.id}`}
                                                            >
                                                                <Tooltip label='Загрузить фото'>
                                                                    <ActionIcon
                                                                        variant='light'
                                                                        color='blue'
                                                                        component='span'
                                                                    >
                                                                        <IconUpload
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </ActionIcon>
                                                                </Tooltip>
                                                            </label>
                                                        </>
                                                    )}
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                        </Table.Tbody>
                    </React.Fragment>
                ))}
            </Table>
        </Paper>
    )
}