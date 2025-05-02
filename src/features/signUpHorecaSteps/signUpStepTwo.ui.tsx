// @ts-nocheck
import {
    Box,
    Button,
    Checkbox,
    Group,
    NumberInput,
    Textarea,
    TextInput,
} from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'
import { IconPlus, IconX } from '@tabler/icons-react'
import { useEffect } from 'react'

import { HorecaFormValues } from '@/shared/constants'
import { Address, Weekday } from '@/shared/lib/horekaApi/Api'

type StepProps = {
    form: UseFormReturnType<HorecaFormValues>
}

const weekdays: {
    label: string
    value: Weekday
    from: keyof Address
    to: keyof Address
}[] = [
    { label: 'Понедельник', value: Weekday.Mo, from: 'moFrom', to: 'moTo' },
    { label: 'Вторник', value: Weekday.Tu, from: 'tuFrom', to: 'tuTo' },
    { label: 'Среда', value: Weekday.We, from: 'weFrom', to: 'weTo' },
    { label: 'Четверг', value: Weekday.Th, from: 'thFrom', to: 'thTo' },
    { label: 'Пятница', value: Weekday.Fr, from: 'frFrom', to: 'frTo' },
    { label: 'Суббота', value: Weekday.Sa, from: 'saFrom', to: 'saTo' },
    { label: 'Воскресенье', value: Weekday.Su, from: 'suFrom', to: 'suTo' },
]

export function HorecaStepTwo({ form }: StepProps) {
    const addNewAddress = () => {
        const newAddress = {
            address: '',
            city: '',
            street: '',
            house: '',
            building: '',
            office: '',
            weekdays: [],
            moFrom: '',
            moTo: '',
            tuFrom: '',
            tuTo: '',
            weFrom: '',
            weTo: '',
            thFrom: '',
            thTo: '',
            frFrom: '',
            frTo: '',
            saFrom: '',
            saTo: '',
            suFrom: '',
            suTo: '',
        }
        form.insertListItem('profile.addresses', newAddress)
    }

    const removeAddressForm = (index: number) => {
        const newAddresses = form
            .getValues()
            .profile.addresses.filter((_, i) => i !== index)

        form.setFieldValue('profile.addresses', newAddresses)
    }

    const combineAddressFields = (addressIndex: number) => {
        const address = form.values.profile.addresses[addressIndex]
        const parts = [
            address.city,
            address.street,
            address.house,
            address.building ? `к${address.building}` : '',
            address.office ? `оф${address.office}` : '',
        ].filter(Boolean)
        
        return parts.join(', ')
    }

    useEffect(() => {
        form.values.profile.addresses.forEach((_, index) => {
            const combinedAddress = combineAddressFields(index)
            form.setFieldValue(`profile.addresses.${index}.address`, combinedAddress)
        })
    }, [
        form.values.profile.addresses.map(a => 
            `${a.city}-${a.street}-${a.house}-${a.building}-${a.office}`
        ).join('|')
    ])

    return (
        <>
            <TextInput
                required
                label='Контактный номер для связи с поставщиком'
                placeholder='Номер мобильного телефона. Пример: (79887653452)'
                type='tel'
                {...form.getInputProps('phone')}
            />

            {form.values.profile.addresses.map((address, addressIndex) => (
                <div key={addressIndex} className='mb-6'>
                    <div className='relative'>
                        <h4 className='text-sm font-medium mb-2'>Адрес доставки {addressIndex + 1}</h4>
                        {addressIndex > 0 && (
                            <IconX
                                className='absolute top-[-5px] right-0'
                                cursor='pointer'
                                onClick={() => removeAddressForm(addressIndex)}
                            />
                        )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextInput
                            required
                            label='Город'
                            placeholder='Например: Москва'
                            {...form.getInputProps(
                                `profile.addresses.${addressIndex}.city`
                            )}
                        />
                        <TextInput
                            required
                            label='Улица'
                            placeholder='Например: Ленина'
                            {...form.getInputProps(
                                `profile.addresses.${addressIndex}.street`
                            )}
                        />
                        <TextInput
                            required
                            label='Дом'
                            placeholder='Например: 15'
                            {...form.getInputProps(
                                `profile.addresses.${addressIndex}.house`
                            )}
                        />
                        <TextInput
                            label='Корпус/строение'
                            placeholder='Например: 2'
                            {...form.getInputProps(
                                `profile.addresses.${addressIndex}.building`
                            )}
                        />
                        <TextInput
                            label='Офис/квартира'
                            placeholder='Например: 305'
                            {...form.getInputProps(
                                `profile.addresses.${addressIndex}.office`
                            )}
                        />
                    </div>

                    {/* {weekdays.map(day => (
                        <Group key={day.value} grow align='center' my='lg'>
                            <Checkbox
                                label={day.label}
                                checked={address.weekdays.includes(day.value)}
                                onChange={event => {
                                    const checked = event.currentTarget.checked
                                    if (!address.weekdays) address.weekdays = []
                                    form.setFieldValue(
                                        `profile.addresses.${addressIndex}.weekdays`,
                                        checked
                                            ? [...address.weekdays, day.value]
                                            : address.weekdays.filter(
                                                  w => w !== day.value
                                              )
                                    )

                                    if (!checked) {
                                        form.setFieldValue(
                                            `profile.addresses.${addressIndex}.${day.from}`,
                                            ''
                                        )
                                        form.setFieldValue(
                                            `profile.addresses.${addressIndex}.${day.to}`,
                                            ''
                                        )
                                    }
                                }}
                            />
                            <TimeInput
                                size='xs'
                                label='C'
                                {...form.getInputProps(
                                    `profile.addresses.${addressIndex}.${day.from}`
                                )}
                            />
                            <TimeInput
                                size='xs'
                                label='До'
                                {...form.getInputProps(
                                    `profile.addresses.${addressIndex}.${day.to}`
                                )}
                            />
                        </Group>
                    ))} */}
                </div>
            ))}

            <Box className='flex justify-center'>
                <Button
                    onClick={addNewAddress}
                    leftSection={<IconPlus />}
                    variant='transparent'
                    c='indigo.4'
                >
                    Добавить еще адрес
                </Button>
            </Box>

            <Textarea
                label='Информация о приёмке, которую должен знать поставщик'
                placeholder='Добавьте комментарий до 250 символов...'
                {...form.getInputProps('profile.info')}
            />
        </>
    )
}