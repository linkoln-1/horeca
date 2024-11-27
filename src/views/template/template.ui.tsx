'use client'

import { templateQueries } from '@/entities/template'
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
} from '@mantine/core'
import dayjs from 'dayjs'
import Link from 'next/link'

import { CategoryLabels, HorecaTemplateDto } from '@/shared/constants'
import { Categories } from '@/shared/lib/horekaApi/Api'

import '@/styles/template.scss'

const LIMIT = 5

export function TemplateApplicationViews() {
    const {
        data: templates,
        hasNextPage,
        fetchNextPage,
        isFetching,
    } = templateQueries.useGetHorecaTemplateQuery({
        limit: LIMIT,
    })

    if (!templates) return <Loader />

    return (
        <>
            <Grid>
                <Grid.Col span={2}>
                    <Flex direction='column' gap='md'>
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
                                        bg='indigo.6'
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

                                        <Flex justify='space-between'>
                                            <Button
                                                c='blue'
                                                fw='500'
                                                px='0'
                                                variant='transparent'
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
