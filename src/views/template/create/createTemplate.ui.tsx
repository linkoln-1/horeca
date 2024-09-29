'use client'

import {
    Box,
    Flex,
    Text,
    TextInput,
    Button,
    NumberInput,
    Divider,
    Title,
    Select,
    Textarea,
    Autocomplete,
} from '@mantine/core'
import { DateInput, DatePicker } from '@mantine/dates'
import { IconCalendar, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { CategoryLabels } from '@/shared/constants'

export function CreateTemplateUi() {
    return (
        <Box>
            <Title my='md'>Шаблон №1</Title>
            <Divider my='md' />
            <form>
                <Flex gap='lg' justify='space-between'>
                    <Flex direction='column' justify='space-between'>
                        <Select
                            miw={300}
                            placeholder='Готовые блюда'
                            label='Категория товаров'
                            data={Object.values(CategoryLabels)}
                        ></Select>
                        <Button
                            leftSection={<IconTrash />}
                            pl='0'
                            mb='lg'
                            variant='transparent'
                            c='pink.7'
                            fw='500'
                            size='md'
                        >
                            Удалить всю категорию
                        </Button>
                    </Flex>
                    <Flex direction='column'>
                        <Flex
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
                            />
                            <NumberInput placeholder='456' label='Кол-во' />
                            <TextInput
                                placeholder='штук'
                                label='Ед. измерения'
                            />
                            <Button
                                c='red'
                                top='-10px'
                                right='-20px'
                                pos='absolute'
                                variant='transparent'
                            >
                                <IconX />
                            </Button>
                        </Flex>
                        <Flex
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
                            />
                            <NumberInput placeholder='456' label='Кол-во' />
                            <TextInput
                                placeholder='штук'
                                label='Ед. измерения'
                            />
                            <Button
                                c='red'
                                top='-10px'
                                right='-20px'
                                pos='absolute'
                                variant='transparent'
                            >
                                <IconX />
                            </Button>
                        </Flex>
                        <Button
                            leftSection={<IconPlus />}
                            mb='lg'
                            w='fit-content'
                            variant='transparent'
                            fw='500'
                            size='md'
                        >
                            Добавить еще один товар
                        </Button>
                    </Flex>
                </Flex>
                <Divider />
                <Flex justify='flex-end'>
                    <Button my='xl' fw='500' size='md' radius='lg' bg='indigo'>
                        Добавить новую категорию
                    </Button>
                </Flex>
                <Divider my='lg' />
                <Flex gap='xl' justify='space-between' mb='xl'>
                    <Flex direction='column' gap='xl' w='50%'>
                        <TextInput
                            label='Наименование заказчика'
                            placeholder='ООО "РОМАШКА"'
                        />
                        <Autocomplete
                            label='Адрес доставки'
                            placeholder='Г. Сочи, ул. Курортный пр-т, 109'
                        />
                        <TextInput
                            label='Менеджер'
                            placeholder='Макаров Василий Сергеевич'
                        />
                        <Textarea
                            label='Комментарии'
                            placeholder='Вас встретит наш сотрудник, Виталий, менеджер по закупкам'
                        />
                    </Flex>
                    <Flex direction='column' gap='xl' w='50%'>
                        <Flex justify='space-between' gap='sm'>
                            <TextInput
                                label='Телефон для связи'
                                placeholder='+7 (986) 860 90 56'
                            />
                            <DateInput
                                placeholder='ДД.ММ.ГГ'
                                valueFormat='DD.MM.YY'
                                minDate={new Date()}
                                rightSection={<IconCalendar />}
                                mih='42px'
                                label='Принимать заявки до'
                            />
                        </Flex>
                        <Flex></Flex>
                    </Flex>
                </Flex>
            </form>
        </Box>
    )
}
