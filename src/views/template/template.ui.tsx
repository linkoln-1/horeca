'use client'

import { toast } from 'react-toastify'

import { templateQueries } from '@/entities/template'
import { ViewTemplateModal } from '@/views/template/ui'
import {
    Box,
    Button,
    Card,
    Divider,
    Flex,
    Grid,
    List,
    Loader,
    Paper,
    Text,
    Tooltip,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconX } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Link from 'next/link'

import { CategoryLabels, errors, HorecaTemplateDto } from '@/shared/constants'
import { Categories } from '@/shared/lib/horekaApi/Api'

import '@/styles/template.scss'

const LIMIT = 10

export function TemplateApplicationViews() {
    const {
        data: templates,
        hasNextPage,
        fetchNextPage,
        isFetching,
    } = templateQueries.useGetHorecaTemplateQuery({
        limit: LIMIT,
    })

    const { mutateAsync: deleteTemplate } =
        templateQueries.useDeleteHorecaTemplateMutation()

    const handleDeleteTemplate = async (templateId: number) => {
        try {
            await deleteTemplate({ id: templateId })

            toast.success('Шаблон успешно удален')
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    if (!templates) return <Loader />

    return (
        <>
            <Grid>
                <Grid.Col span={2}>
                    <Flex direction='column' gap='sm'>
                        <Text>Шаблоны</Text>
                        <Paper withBorder>
                            <List>
                                {templates.map(x => (
                                    <List.Item
                                        py='sm'
                                        className='sidebar overflow-y-auto border-b'
                                        key={x.id}
                                    >
                                        <Text size='md' fw={500}>
                                            {x.name}
                                        </Text>
                                    </List.Item>
                                ))}
                            </List>
                        </Paper>
                    </Flex>
                </Grid.Col>

                <Grid.Col span={6}>
                    {templates.length === 0 && (
                        <Flex
                            justify='center'
                            align='center'
                            direction='column'
                            h='50vh'
                        >
                            <Text size='lg'>
                                Экономьте свое время! Создайте заявку и
                                сохраните ее как шаблон.
                            </Text>
                            <Text size='md' c='gray'>
                                Кнопка «Сохранить шаблон» находится слева внизу
                                формы создания заявки
                            </Text>
                        </Flex>
                    )}

                    {templates.map(template => {
                        const content: HorecaTemplateDto =
                            typeof template.content === 'string'
                                ? JSON.parse(template.content)
                                : template.content

                        return (
                            <Card
                                key={template.id}
                                shadow='sm'
                                p={0}
                                withBorder
                                w='100%'
                                mb='md'
                            >
                                <Flex gap='md'>
                                    <Flex
                                        w={250}
                                        direction='column'
                                        gap='md'
                                        bg='indigo.4'
                                        align='start'
                                        c='#fff'
                                        px='md'
                                        py='lg'
                                    >
                                        <Text size='lg' fw={600}>
                                            {template.name}
                                        </Text>
                                        <Text>Создан:</Text>
                                        <Text>
                                            {dayjs(template.createdAt).format(
                                                'YYYY-MM-DD HH:mm'
                                            )}
                                        </Text>
                                    </Flex>

                                    <Flex
                                        direction='column'
                                        gap='md'
                                        p='md'
                                        w='100%'
                                        pos='relative'
                                    >
                                        {content.items &&
                                            content.items.map((item, index) => (
                                                <Flex
                                                    direction='column'
                                                    gap='md'
                                                    key={index}
                                                >
                                                    <Flex direction='column'>
                                                        <Text c='gray.5'>
                                                            Категория товаров:
                                                        </Text>
                                                        <Text>
                                                            {
                                                                CategoryLabels[
                                                                    item.category as Categories
                                                                ]
                                                            }
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction='column'>
                                                        <Text c='gray.5'>
                                                            Наименование:
                                                        </Text>
                                                        <Text>{item.name}</Text>
                                                    </Flex>
                                                    <Divider orientation='horizontal' />
                                                </Flex>
                                            ))}

                                        <Tooltip
                                            label='Вы действительно хотите удалить этот шаблон?'
                                            bg='indigo.4'
                                        >
                                            <Button
                                                pos='absolute'
                                                top={10}
                                                right={10}
                                                rightSection={
                                                    <IconX color='red' />
                                                }
                                                variant='transparent'
                                                p={0}
                                                styles={{
                                                    section: {
                                                        margin: 0,
                                                    },
                                                }}
                                                onClick={() =>
                                                    handleDeleteTemplate(
                                                        template.id
                                                    )
                                                }
                                            />
                                        </Tooltip>

                                        <Flex justify='end' gap='md'>
                                            <Button
                                                c='indigo.4'
                                                fw='500'
                                                px='0'
                                                variant='transparent'
                                                onClick={() => {
                                                    modals.open({
                                                        modalId:
                                                            'view-template-modal',
                                                        children: (
                                                            <ViewTemplateModal
                                                                id={template.id}
                                                            />
                                                        ),
                                                        centered: true,
                                                        size: 1050,
                                                        radius: 'lg',
                                                    })
                                                }}
                                            >
                                                Открыть для просмотра
                                            </Button>
                                            <Button
                                                c='pink.7'
                                                fw='500'
                                                px='0'
                                                variant='transparent'
                                                component={Link}
                                                href={`/user/horeca/template/edit/${template.id}`}
                                            >
                                                Редактировать шаблон
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Card>
                        )
                    })}

                    {hasNextPage && (
                        <Flex maw={200} w='100%' className='mx-auto'>
                            <Button
                                fullWidth
                                onClick={() => fetchNextPage()}
                                loading={isFetching}
                                bg='indigo.4'
                            >
                                Загрузить еще
                            </Button>
                        </Flex>
                    )}
                </Grid.Col>
            </Grid>
        </>
    )
}
