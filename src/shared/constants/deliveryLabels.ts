import { DeliveryMethods } from '@/shared/lib/horekaApi/Api'

export const DeliveryMethodsLabels: Record<DeliveryMethods, string> = {
    selfPickup: 'самовывоз',
    deliveryBySupplier: 'доставка транспортом поставщика',
    sameDayDelivery: 'доставка в день заказа',
    weekends: 'выходные праздничные дни',
}
