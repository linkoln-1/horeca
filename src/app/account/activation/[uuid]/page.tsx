'use client'

import { ActivationView } from '@/views/activation'
import { useParams } from 'next/navigation'

export default function Activation() {
    const { uuid } = useParams<{ uuid: string }>()
    return <ActivationView uuid={uuid} />
}
