import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { twMerge } from 'tailwind-merge'
type Props = {
  children: React.ReactNode
  content: React.ReactNode,
  title: string,
  className?:string
  open?:boolean
  onOpenChange?:(isOpen:boolean)=>void
  onIntaractOutside?:(e:Event)=>void
}
function CustomDialog({ children, title, content,className ,open,onOpenChange,onIntaractOutside }: Props) {
  return (
    <Dialog open={open}  onOpenChange={onOpenChange} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onInteractOutside={onIntaractOutside} className={twMerge(className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog