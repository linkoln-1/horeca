'use client'

import { userQueries } from '@/entities/user'
import { Box } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function ActivationView({uuid}: {uuid: string}) {
    const router = useRouter()
    const { mutateAsync: activateAccount } = userQueries.useActivateUserMutation()

    useEffect(()=> {
        const activate = async () => {
            const response = await activateAccount(uuid)
            if(response.ok) {
                toast.success(`Поздравляем, вы успешно подтвердили email! 🎉 Теперь вы можете войти в личный кабинет.`)
                router.push('/sign-in')
            }
        }
        activate()
    },[])
    
    return (
        <Box className='flex w-screen h-screen bg-white'></Box>
    )
}
