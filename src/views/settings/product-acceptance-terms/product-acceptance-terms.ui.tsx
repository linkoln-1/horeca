'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { userQueries } from '@/entities/user'
import {
    Box,
    Button,
    Checkbox,
    Group,
    LoadingOverlay,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconPlus } from '@tabler/icons-react'

import { errors, HorecaFormValues, roles } from '@/shared/constants'
import { Address, ProfileType, Weekday } from '@/shared/lib/horekaApi/Api'
import { Page } from '@/shared/ui/Page'

type ProductAcceptanceTermsProps = Pick<HorecaFormValues, 'profile'>

const weekdaysSettings: {
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

export function ProductAcceptanceTermsViews() {
    const form = useForm<ProductAcceptanceTermsProps>({
        initialValues: {
            profile: {
                profileType: ProfileType.Horeca,
                info: '',
                addresses: [
                    {
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
                    },
                ],
            },
        },
    })

    const { data } = userQueries.useGetMeQuery()
    const { mutateAsync: updateUser, isPending } =
        userQueries.useUpdateUserMutation()

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

    useEffect(() => {
        if (data) {
            const profileData =
                data.profile as unknown as ProductAcceptanceTermsProps['profile']

            form.setValues({
                profile: {
                    profileType: roles[1].role as ProfileType,
                    info: profileData.info || '',
                    addresses:
                        profileData.addresses.length > 0
                            ? profileData.addresses.map(address => ({
                                  ...address,
                                  weekdays: address.weekdays || [],
                                  moFrom: address.moFrom || '',
                                  moTo: address.moTo || '',
                                  tuFrom: address.tuFrom || '',
                                  tuTo: address.tuTo || '',
                                  weFrom: address.weFrom || '',
                                  weTo: address.weTo || '',
                                  thFrom: address.thFrom || '',
                                  thTo: address.thTo || '',
                                  frFrom: address.frFrom || '',
                                  frTo: address.frTo || '',
                                  saFrom: address.saFrom || '',
                                  saTo: address.saTo || '',
                                  suFrom: address.suFrom || '',
                                  suTo: address.suTo || '',
                              }))
                            : [
                                  {
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
                                  },
                              ],
                },
            })
        }
    }, [data])

    const handleSubmit = async (values: ProductAcceptanceTermsProps) => {
        if (form.validate().hasErrors) {
            return
        }

        try {
            await updateUser(values)
            toast.success('Данные успешно обновлены!')
        } catch (e: any) {
            const errorKey = e?.error?.error

            const errorMessage =
                errorKey in errors
                    ? errors[errorKey as keyof typeof errors]
                    : 'Неизвестная ошибка. Попробуйте ещё раз.'

            toast.error(errorMessage)
        }
    }

    return (
        <Page>
            <LoadingOverlay
                zIndex={1000}
                overlayProps={{ blur: 2 }}
                visible={isPending}
            />

            <form
                className='flex flex-col gap-6'
                onSubmit={form.onSubmit(handleSubmit)}
            >
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

                        {weekdaysSettings.map(day => (
                            <Group key={day.value} grow align='center' my='lg'>
                                <Checkbox
                                    label={day.label}
                                    checked={
                                        address.weekdays?.includes(day.value) ||
                                        false
                                    }
                                    onChange={event => {
                                        const checked =
                                            event.currentTarget.checked
                                        const updatedWeekdays = checked
                                            ? [
                                                  ...(address.weekdays || []),
                                                  day.value,
                                              ]
                                            : (address.weekdays || []).filter(
                                                  w => w !== day.value
                                              )

                                        form.setFieldValue(
                                            `profile.addresses.${addressIndex}.weekdays`,
                                            updatedWeekdays
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
                                    value={
                                        form.values.profile.addresses[
                                            addressIndex
                                        ][day.from] || ''
                                    }
                                    onChange={value =>
                                        form.setFieldValue(
                                            `profile.addresses.${addressIndex}.${day.from}`,
                                            value
                                        )
                                    }
                                />
                                <TimeInput
                                    size='xs'
                                    label='До'
                                    value={
                                        form.values.profile.addresses[
                                            addressIndex
                                        ][day.to] || ''
                                    }
                                    onChange={value =>
                                        form.setFieldValue(
                                            `profile.addresses.${addressIndex}.${day.to}`,
                                            value
                                        )
                                    }
                                />
                            </Group>
                        ))}
                    </div>
                ))}

                <Box className='flex justify-center'>
                    <Button
                        onClick={addNewAddress}
                        leftSection={<IconPlus />}
                        color='indigo.4'
                    >
                        Добавить еще адрес
                    </Button>
                </Box>

                <Textarea
                    label='Информация о приёмке, которую должен знать поставщик'
                    placeholder='Добавьте комментарий до 250 символов...'
                    {...form.getInputProps('profile.info')}
                />

                <Button type='submit' color='indigo.4' size='large'>
                    Сохранить изменения
                </Button>
            </form>
        </Page>
    )
}
