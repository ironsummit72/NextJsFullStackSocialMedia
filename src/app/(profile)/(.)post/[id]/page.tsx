'use client'
import PostCard from '@/components/custom/PostCard'
import { Dialog, DialogContent,DialogTitle } from '@/components/ui/dialog'

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
    <Dialog  open={true} defaultOpen={true} onOpenChange={onHandleClose} >
      <DialogTitle></DialogTitle>
      <DialogContent className='min-w-[50vw] min-h-[70vh] '>
        <PostCard postId={id}/>
      </DialogContent>
    </Dialog>
  )
}
export default InterceptedPost