'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'
import { useRouter } from 'next/navigation'
function Followers() {
  const router=useRouter()
  const onHandleClose=()=>{
    router.back()
  }
  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={onHandleClose} >
    <DialogTitle>Hello</DialogTitle>
    <DialogContent>
      Intercepted Post followers
    </DialogContent>
  </Dialog>
  )
}

export default Followers