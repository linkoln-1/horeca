import { HorecaRequestForm } from '@/shared/constants'

export function isFormFilled(values: HorecaRequestForm): boolean {
    const areItemsFilled = values.items.every(
        item =>
            !!item.category &&
            item.products.every(
                product =>
                    product.name.trim() !== '' &&
                    product.amount !== '' &&
                    product.unit.trim() !== ''
            )
    )

    return (
        areItemsFilled &&
        values.address.trim() !== '' &&
        values.deliveryTime instanceof Date &&
        !isNaN(values.deliveryTime.getTime()) &&
        values.acceptUntill instanceof Date &&
        !isNaN(values.acceptUntill.getTime()) &&
        !!values.paymentType &&
        values.name.trim() !== '' &&
        values.phone.trim() !== '' &&
        values.comment?.trim() !== '' &&
        values.imageIds!.length > 0
    )
}
