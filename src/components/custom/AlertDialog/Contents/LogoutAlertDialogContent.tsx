'use client'
import React from 'react'
import {
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle, AlertDialogAction,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { clientapi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
type Props = {
    title: string,
    description: string
}
function LogoutAlertDialogContent({ title, description }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const onHandleLogout = () => {
        clientapi.delete('/auth/logout').then((res) => {
            toast({
                title: "Logout",
                description: "Logout successfully"
            })
            router.refresh()
        }).catch((err) => {
            toast({
                title: "Error",
                description: 'something went wrong',
                variant: 'destructive'
            })
        })
    }
    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-red-500 hover:bg-red-600' onClick={onHandleLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
        </>
    )
}

export default LogoutAlertDialogContent