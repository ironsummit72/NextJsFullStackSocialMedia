'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'
import { useRouter } from 'next/navigation'
function Following() {
  const router = useRouter()
  const onHandleClose = () => {
    router.back()
  }
  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={onHandleClose} >
      <DialogTitle>Hello</DialogTitle>
      <DialogContent>
        Intercepted Post following
      </DialogContent>
    </Dialog>
  )
}

export default Following