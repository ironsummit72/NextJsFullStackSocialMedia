'use client'
import React, { useState } from 'react'
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import Dialog from '../Dialogs/Dialog'
import CreatePostDialogContent from '../Dialogs/Contents/CreatePostDialogContent'
function CreatePostMenu() {
    const [open,setOpen]=useState<boolean>(false)
    return (
        <> <DropdownMenuLabel>Create Post</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Dialog onIntaractOutside={(e)=>{
             e.preventDefault()
            }} open={open} onOpenChange={(isOpen)=>{setOpen(isOpen)}}  className='w-[50vw]' content={<CreatePostDialogContent />} title='Create Post'>
                <DropdownMenuItem onClick={()=>{setOpen(prev=>!prev)}} onSelect={(e) => { e.preventDefault() }}  >Post</DropdownMenuItem>
            </Dialog>
            {/* <Dialog  className='' title='Create Reel' content={<CreateReelDialogContent />}>

                <DropdownMenuItem onSelect={(e) => { e.preventDefault() }}>Reel</DropdownMenuItem>
            </Dialog> */}
        </>
    )
}

export default CreatePostMenu