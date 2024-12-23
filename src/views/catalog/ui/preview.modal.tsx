import React from 'react'

import { productsQueries } from '@/entities/products'
import { handleModal } from '@/features/products'
import { Flex, Table, Image as MantineImage, Box, Button } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { modals } from '@mantine/modals'

import { getImageUrl } from '@/shared/helpers'
import { ProductCreateDto, UploadDto } from '@/shared/lib/horekaApi/Api'

type PreviewModalProps = {
    form: UseFormReturnType<ProductCreateDto>
    images: UploadDto[]
}

export function PreviewModal({ form, images }: PreviewModalProps) {
    const { mutate: createProduct } = productsQueries.useProductMutation()

    const handleOpenProductModal = () => {
        modals.close('product-preview-modal')

        handleModal({
            initialValues: form.values,
            images,
        })
    }

    return (
        <Flex direction='column' gap='xl'>
            <Table withRowBorders withColumnBorders>
                <Table.Thead bg='indigo.4'>
                    <Table.Tr>
                        {[
                            'Наименование',
                            'Производитель',
                            'Характеристики',
                            'Фасовка',
                            'Цена (за ед.)',
                            'Кол-во',
                            'Фотографии',
                        ].map((tab, index) => (
                            <Table.Th key={index} c='#FFF' p='md'>
                                <Flex justify='center'>{tab}</Flex>
                            </Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {[form.values].map((product, index) => {
                        return (
                            <Table.Tr key={index}>
                                <Table.Td align='center' p='md'>
                                    {product.name}
                                </Table.Td>

                                <Table.Td align='center' p='md'>
                                    {product.producer}
                                </Table.Td>

                                <Table.Td align='center' p='md'>
                                    {product.description === 'beer'
                                        ? 'Пиво'
                                        : product.description}
                                </Table.Td>

                                <Table.Td align='center' p='md'>
                                    {product.packagingType}
                                </Table.Td>

                                <Table.Td align='center' p='md'>
                                    {product.cost}
                                </Table.Td>

                                <Table.Td align='center' p='md'>
                                    {product.count}
                                </Table.Td>

                                <Table.Td align='center' p='md' w={250}>
                                    {images.length > 0 && (
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns:
                                                    'repeat(3, 60px)',
                                                gap: '8px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {images.map((x, index) => {
                                                return (
                                                    <Box
                                                        pos='relative'
                                                        key={index}
                                                    >
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
                                        </div>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                        )
                    })}
                </Table.Tbody>
            </Table>

            <Flex justify='center' gap='md'>
                <Button
                    variant='default'
                    c='indigo.4'
                    onClick={handleOpenProductModal}
                >
                    Вернуться к редактированию
                </Button>
                <Button
                    bg='pink.5'
                    fw='500'
                    c='white'
                    onClick={() => {
                        {
                            createProduct({
                                data: form.values,
                            })
                            modals.close('product-preview-modal')
                            modals.close('product')
                        }
                    }}
                >
                    Опубликовать товар
                </Button>
            </Flex>
        </Flex>
    )
}

export function handlePreviewModal({
    form,
    images,
}: {
    form: UseFormReturnType<ProductCreateDto>
    images: UploadDto[]
}) {
    modals.open({
        centered: true,
        modalId: 'product-preview-modal',
        size: 1320,
        children: <PreviewModal form={form} images={images} />,
        closeOnClickOutside: false,
        withCloseButton: false,
    })
}
