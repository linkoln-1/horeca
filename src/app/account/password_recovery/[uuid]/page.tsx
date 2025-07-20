'use client'

import { PasswordRecovery } from '@/views/passwordRecovery/passwordRecovery'
import { useParams } from 'next/navigation'

export default function ConfirmPasswordPage() {
    const { uuid } = useParams<{ uuid: string }>()
    return <PasswordRecovery uuid={uuid} />
}
