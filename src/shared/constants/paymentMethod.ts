export enum PaymentMethod {
    Prepayment = 'Prepayment',
    Deferment = 'Deferment',
    PaymentUponDelivery = 'PaymentUponDelivery',
}

export const PaymentMethodLabels: Record<PaymentMethod, string> = {
    [PaymentMethod.Prepayment]: 'Предоплата',
    [PaymentMethod.Deferment]: 'Отсрочка',
    [PaymentMethod.PaymentUponDelivery]: 'Оплата при доставке',
}
