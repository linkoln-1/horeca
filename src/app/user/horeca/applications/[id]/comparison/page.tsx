'use client'

import { ApplicationsDetailViews } from '@/views/applications/detail'
import { useParams } from 'next/navigation'

export default function ApplicationsDetailPage() {
    const { id } = useParams<{ id: string }>()

    return <ApplicationsDetailViews id={id} />
}
