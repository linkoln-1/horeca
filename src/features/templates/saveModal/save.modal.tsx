import React from 'react'

import { templateQueries } from '@/entities/template'
import { TextInput, Button, Flex } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'

import { HorecaRequestForm, HorecaRequestFormItem } from '@/shared/constants'
import {
    HorecaRequestCreateDto,
    HorecaRequestItemCreateDto,
} from '@/shared/lib/horekaApi/Api'

type SaveModalProps = {
    forms: UseFormReturnType<HorecaRequestForm>
}

export function SaveModal({ forms }: SaveModalProps) {
    const form = useForm({
        initialValues: {
            name: '',
        },
    })

    const { mutateAsync: createTemplate } =
        templateQueries.useCreateHorecaTemplateMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const items: HorecaRequestItemCreateDto[] = forms.values.items
            .map((item: HorecaRequestFormItem) =>
                item.products.map(product => ({
                    category: item.category,
                    name: product.name,
                    amount: product.amount,
                    unit: product.unit,
                }))
            )
            .flat()

        const contentData: HorecaRequestCreateDto = {
            items,
            address: forms.values.address,
            deliveryTime: forms.values.deliveryTime,
            acceptUntill: forms.values.acceptUntill,
            paymentType: forms.values.paymentType,
            name: forms.values.name,
            phone: forms.values.phone,
        }

        await createTemplate({
            data: {
                name: form.values.name,
                content: contentData,
            },
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label='Название шаблона'
                placeholder='Например, рыба (красная)'
                {...form.getInputProps('name')}
            />
            <Flex w='100%' justify='center'>
                <Button
                    my='lg'
                    size='lg'
                    variant='filled'
                    bg='indigo.4'
                    type='submit'
                >
                    Сохранить шаблон
                </Button>
            </Flex>
        </form>
    )
}
