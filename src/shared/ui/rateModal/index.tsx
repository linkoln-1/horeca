import { Button, Checkbox, Flex, Text, TextInput } from '@mantine/core'

type rateType = {
    isAgreementAccepted: boolean
    handleAgreementSubmit: () => void
    name: string
}

export function RateModal({
    isAgreementAccepted,
    handleAgreementSubmit,
    name,
}: rateType) {
    return (
        <>
            {!isAgreementAccepted ? (
                <Flex direction='column' gap='md'>
                    <Text ta='center' size='xl' fw={700}>
                        Вы выбрали тариф &ldquo;{name}&ldquo;
                    </Text>
                    <Text>
                        Чтобы заказать рекламу, Вам нужно будет заполнить
                        специальную заявку. Обратите внимание, что каждое каждый
                        запрос на рекламное объявление проходит обязательную
                        проверку.{' '}
                    </Text>
                    <Text>
                        Вы можете отслеживать статус заявки в “Истории заявок”.
                        Если ваше объявление соответствует всем требованиям, то
                        вам придет ссылка на оплату, чтобы ваше заявление было
                        опубликовано на платформе.
                    </Text>
                    <Text>
                        Заявка может быть отклонена, если требования к
                        объявления не будут выполнены. Причина отклонения будет
                        также отображаться в “Истории заявок”.
                    </Text>
                    <Button
                        onClick={handleAgreementSubmit}
                        fullWidth
                        mt='md'
                        fw={400}
                    >
                        Заполнить заявку
                    </Button>
                </Flex>
            ) : (
                <>
                    <TextInput
                        label='Укажите наименование товара'
                        placeholder='Например, рыба (красная)'
                        required
                    />
                    <TextInput
                        label='Укажите производителя товара'
                        placeholder="Например, ООО 'Солнце' или ИП Черкасов В.А."
                        required
                        mt='md'
                    />
                    <TextInput
                        label='Добавьте описание товара'
                        placeholder='Комментарии к заявке...'
                        required
                        mt='md'
                    />
                    <Checkbox
                        label='С условиями размещения рекламы согласен'
                        required
                        mt='md'
                    />
                    <Button fullWidth mt='md' color='orange' fw={400}>
                        Подать заявление на модерацию
                    </Button>
                </>
            )}
        </>
    )
}
