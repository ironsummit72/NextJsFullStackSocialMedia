'use client'
import UploadDisplayPictureDialogContent from '@/components/custom/Dialogs/Contents/UploadDisplayPictureDialogContent'
import CustomDialog from '@/components/custom/Dialogs/Dialog'
import DisplayPicture from '@/components/custom/DisplayPicture'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { USER } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BioSchema } from '@/validations/form'
import { clientapi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
function EditProfile() {
  const {toast}=useToast()
  const [user, setUser] = useState<USER | null>(null);
  const [uploadDisplayPictureDialog, setDisplayPictureDialog] = useState<boolean>(false);
  const form = useForm<z.infer<typeof BioSchema>>({
    resolver: zodResolver(BioSchema),
    defaultValues: {
      bio: "",
    },
  })
  function onSubmit(values: z.infer<typeof BioSchema>) {
    clientapi.patch(`/profile/update/bio/${user?.username}`,values).then((res)=>{
      console.log(res.data,"bio res");
      toast({
        title:'Bio Updated',
        description:res.data?.message
      })
    }).catch((error)=>{
      console.error(error);
      
    });
  }
  useEffect(() => {
    getCurrentUserClient().then((res) => {
      setUser(res);
    }).catch((error) => {
      setUser(null);
      console.error(error);

    })
  }, [])
  return (
    <div className='h-screen'>
      <div className="flex flex-col gap-4">
        <Card className='h-40 mt-10'>
          <div className='flex items-center justify-between h-full mx-10'>
            <div className='flex items-center gap-6 h-full'>
              <DisplayPicture username={user?.username!} width={100} height={100} />
              <div className="userinfo flex flex-col">
                <h1 className='font-bold'>{user?.username}</h1>
                <h3>{user?.fullName}</h3>
              </div>
            </div>
            <Button onClick={() => { setDisplayPictureDialog((prev) => !prev) }}>Change Photo</Button>
          </div>
        </Card>
        <div>
        <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is going to be your profile bio
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
            </Form>
        </div>
      </div>
      <CustomDialog open={uploadDisplayPictureDialog} title='display picture Dialog' onOpenChange={(isOpen: boolean) => {
        setDisplayPictureDialog(isOpen)
      }} content={<UploadDisplayPictureDialogContent setDisplayPictureDialog={setDisplayPictureDialog} />}>
        <div></div>
      </CustomDialog>
    </div>
  )
}

export default EditProfile