import React from 'react'
import {
    AlertDialog,

    AlertDialogContent,

    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LogoutAlertDialogContent from './Contents/LogoutAlertDialogContent'
type Props = {
    children: React.ReactNode
}
function CustomAlertDialog({ children }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <LogoutAlertDialogContent title='Logout' description='This action will log you out from this account' />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomAlertDialog