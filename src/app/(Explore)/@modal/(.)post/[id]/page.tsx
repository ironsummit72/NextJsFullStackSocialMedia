'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props={
    params:Promise<{id:string}>
}
 function InterceptedPost({params}:Props) {
    const {id}=React.use(params)
    const router=useRouter()
    const onHandleClose=()=>{
      router.back()
    }
  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={onHandleClose} >
      <DialogTitle>Hello</DialogTitle>
      <DialogContent>
        Intercepted Post {id}
      </DialogContent>
    </Dialog>
  )
}
export default InterceptedPost