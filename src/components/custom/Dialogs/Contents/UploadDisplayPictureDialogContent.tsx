'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUp } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { clientapi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
type Props={
  setDisplayPictureDialog:(args:boolean)=>void
}
function UploadDisplayPictureDialogContent({setDisplayPictureDialog}:Props) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }
  const onHandleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(e.type === 'dragover' || e.type === 'dragenter')
    console.log('on Drag', e.dataTransfer.files);
  }
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragActive(false)
    if (e.dataTransfer.files) {
      setFile(e.dataTransfer.files[0]);
    }
  }
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (file) {
      const formData = new FormData();
      formData.append('displaypicture', file)
      clientapi.post('profile/upload/displaypicture', formData, { headers: { "Content-Type": 'multipart/form-data' } }).then((res) => {
        if (res) {
          toast({ title: "Success", description: 'display picture upload successfull' })
          setDisplayPictureDialog(false);
        }
      }).catch((error) => {
         console.error(error);
         toast({ title: "Failed",variant:'destructive', description: 'Something went wrong' })
         setDisplayPictureDialog(false);
       })
    }
  }
  return (
    <div className=' w-full min-h-96 h-auto'>
      {file === null ? (<div className={`h-full w-full ${isDragActive ? 'bg-gray-500' : 'bg-gray-300'} flex items-center justify-center `} onDragLeave={onHandleDrag} onDragEnter={onHandleDrag} onDragOver={onHandleDrag} onDrop={onDrop}>
        <Label
          htmlFor="upload-dp"
          className="border-gray-500 h-full  w-full flex items-center border text-black font-medium text-lg p-3 rounded-sm flex-col justify-center">
          <ImageUp />
          Upload display picture
          <span className="block text-sm text-gray-500">
            or drag and drop
          </span>
          <Input
            accept="image/*"
            onChange={handleFileUpload}
            type="file"
            className="sr-only"
            id="upload-dp"
          />
        </Label>
      </div>) : (
        <>
          <div className='flex flex-col gap-5 items-center justify-center '>
            <Image src={URL.createObjectURL(file)} width={400} height={400} alt='displaypicture' />
            <Button onClick={handleSubmit} className='w-full' disabled={!file}>Upload Display Picture</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default UploadDisplayPictureDialogContent