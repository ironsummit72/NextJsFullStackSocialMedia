'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Car, File, ImageUp } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"

import { Button } from '@/components/ui/button'

import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import Caption from '../../Caption'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { PostFormSchema } from '@/validations/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientapi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import {USER} from '@/types/index'
function CreatePostDialogContent() {
  const {toast}=useToast()
  const [user, setUser] = useState<USER | null>(null)
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null)
  const [next, setNext] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUserClient().then((res) => { setUser({ username: res.username, id: res.id, fullName: res.fullName }) });
    return () => { setUser(null) }
  }, [])

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver:zodResolver(PostFormSchema),
    defaultValues:{
      caption:''
    }
  })
  function onSubmit(values: z.infer<typeof PostFormSchema>) {
    
   if(files.length!==0)
   {
    const formData=new FormData();
    const {caption}=values;
    formData.append('caption',caption);
    for (let file of files)
    {formData.append('posts',file)};
    clientapi.post('/post/create',formData,{headers:{"Content-Type":'multipart/form-data'}}).then((res)=>{
      if(res.status=201)
      {
        form.reset();
        setFiles([]);
        toast({title:"post created successfully ",description:res.data.message})
      }
    }).catch((error:AxiosError)=>{
      toast({
        variant:'destructive',
        title:'Something went wrong',
        description:error.message
      })
    })

    
   }
    
    // how to add cap
  }
  const onHandleDrag = (e: React.DragEvent<HTMLDivElement>) => {

    e.preventDefault()
    setIsDragActive(e.type === 'dragover' || e.type === 'dragenter')
    console.log('on Drag', e.dataTransfer.files);


  }
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('on Drop', e.dataTransfer.files);
    setIsDragActive(false)
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));


    }
  }
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }
  const handleVideoPlayOnMouseEnter = () => {
    videoRef.current?.play()
  }
  const handleVideoPlayOnMouseLeave = () => {
    videoRef.current?.pause()
  }
  return (
    <div className=' w-full min-h-96 h-auto'>
      {files.length === 0 ? (<div className={`h-full w-full ${isDragActive ? 'bg-gray-500' : 'bg-gray-300'} flex items-center justify-center `} onDragLeave={onHandleDrag} onDragEnter={onHandleDrag} onDragOver={onHandleDrag} onDrop={onDrop}>
        <Label
          htmlFor="upload-dp"
          className="border-gray-500 h-full  w-full flex items-center border text-black font-medium text-lg p-3 rounded-sm flex-col justify-center">
          <ImageUp />
          Add photos/videos
          <span className="block text-sm text-gray-500">
            or drag and drop
          </span>
          <Input
            accept="image/*,video/*"
            onChange={handleFileUpload}
            type="file"
            className="sr-only"
            id="upload-dp"
            multiple
          />
        </Label>
      </div>) : (
        <>
        <div className='flex flex-col gap-5 justify-center '>
          <Carousel className='flex justify-center items-center'>
            <CarouselContent>
              {files.map((file, index) => {
                if (file.type.split('/')[0] === 'image') {
                  return <CarouselItem className='flex justify-center' key={file.name + index}>
                    <Image src={URL.createObjectURL(file)} className='max-h-[600px] w-auto object-contain ' alt='pics' width={400} height={400} />
                  </CarouselItem>
                } else if (file.type.split('/')[0] === 'video') {
                  return <CarouselItem className='flex justify-center cursor-pointer' key={file.name + index}>
                    <video ref={videoRef} onMouseEnter={handleVideoPlayOnMouseEnter} onMouseLeave={handleVideoPlayOnMouseLeave} height={400} width={400} src={URL.createObjectURL(file)} />
                  </CarouselItem>
                }
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {next === true ? (<Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-2 w-full'>
              <Caption form={form} username={user?.username!} />
              <Button variant={'ghost'} className='w-fit  ml-auto font-bold text-primary hover:text-primary' type="submit">Post</Button>
              </div>
            </form>
          </Form>) : (<></>)}
          </div>
          <Button className={`mt-5 float-end font-bold text-primary ${next?'hidden':'block'}`}  onClick={() => {
            setNext(true)
          }} variant={'ghost'}>Next</Button>
        </>
      )}


    </div>
  )
}

export default CreatePostDialogContent