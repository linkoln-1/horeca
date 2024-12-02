'use client'

import { EditTemplateUi } from '@/views/template/edit'
import { useParams } from 'next/navigation'

export default function EditTemplatePage() {
    const { id } = useParams<{ id: string }>()

    return <EditTemplateUi id={id} />
}
