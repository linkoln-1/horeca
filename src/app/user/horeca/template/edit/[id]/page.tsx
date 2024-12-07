'use client'

import { EditTemplateViews } from '@/views/template/edit'
import { useParams } from 'next/navigation'

export default function EditTemplatePage() {
    const { id } = useParams<{ id: string }>()

    return <EditTemplateViews id={id} />
}
