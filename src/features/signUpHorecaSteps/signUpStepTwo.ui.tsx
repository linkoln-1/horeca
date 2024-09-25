import {
    Box,
    Button,
    Checkbox,
    Group, NumberInput,
    Textarea,
    TextInput,
} from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'
import { IconPlus } from '@tabler/icons-react'

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

    return (
        <>
            <NumberInput
                required
                label='Контактный номер для связи с поставщиком'
                placeholder='Номер мобильного телефона'
                {...form.getInputProps('phone')}
            />

            {form.values.profile.addresses.map((address, addressIndex) => (
                <div key={addressIndex}>
                    <TextInput
                        required
                        label={`Адрес доставки ${addressIndex + 1}`}
                        placeholder='Адрес доставки'
                        {...form.getInputProps(
                            `profile.addresses.${addressIndex}.address`
                        )}
                    />

                    {weekdays.map(day => (
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
                    ))}
                </div>
            ))}

            <Box className='flex justify-center'>
                <Button onClick={addNewAddress} leftSection={<IconPlus />}>
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
