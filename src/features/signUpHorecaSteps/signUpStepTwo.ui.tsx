import { Checkbox, Group, Textarea, TextInput } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'

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
    return (
        <>
            <TextInput
                required
                label='Контактный номер для связи с поставщиком'
                placeholder='Номер мобильного телефона'
                {...form.getInputProps('phone')}
            />

            {/*Нужно доработать, эта хрень работает неправильно я его душу матал*/}
            {form.values.profile.addresses.map((address, index) => (
                <TextInput
                    key={index}
                    required
                    label={`Адрес доставки ${index + 1}`}
                    placeholder='Например, Г. Сочи, ул. Ленина, д.15, корп.7.'
                    {...form.getInputProps(`${address.address}`)}
                />
            ))}

            {/*Эта хрень тоже работает неправильно.*/}
            {weekdays.map((day, index) => (
                <Group key={day.value} grow align='center'>
                    <Checkbox
                        label={day.label}
                        checked={form.values.profile.addresses.some(d =>
                            d.weekdays.includes(day.value)
                        )}
                        onChange={event => {
                            const checked = event.currentTarget.checked
                            const newAddresses =
                                form.values.profile.addresses.map(d => {
                                    if (d.weekdays.includes(day.value)) {
                                        if (!checked) {
                                            d.weekdays = d.weekdays.filter(
                                                wd => wd !== day.value
                                            )
                                            ;(d[
                                                day.from as keyof Address
                                            ] as string) = ''
                                            ;(d[
                                                day.to as keyof Address
                                            ] as string) = ''
                                        }
                                    } else if (checked) {
                                        d.weekdays.push(day.value)
                                    }
                                    return d
                                })
                            form.setFieldValue(
                                'profile.addresses',
                                newAddresses
                            )
                        }}
                    />
                    <TimeInput
                        size='xs'
                        label='C'
                        {...form.getInputProps(
                            `profile.addresses[${index}].${day.from}`
                        )}
                    />
                    <TimeInput
                        size='xs'
                        label='До'
                        {...form.getInputProps(
                            `profile.addresses[${index}].${day.to}`
                        )}
                    />
                </Group>
            ))}

            <Textarea
                label='Информация о приёмке, которую должен знать поставщик'
                placeholder='Добавьте комментарий до 250 символов...'
                {...form.getInputProps('profile.info')}
            />
        </>
    )
}
