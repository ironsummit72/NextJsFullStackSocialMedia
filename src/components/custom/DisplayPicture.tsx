'use client'
import { clientapi as api } from '@/lib/api'
import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import { USER } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import UploadDisplayPictureDialogContent from './Dialogs/Contents/UploadDisplayPictureDialogContent'
import CustomDialog from './Dialogs/Dialog'

type Props = {
  width: number,
  height: number,
  username: string
}
function DisplayPicture({ width, height, username }: Props) {
  const [displaypicture, setDisplayPicture] = useState<string>('/nodp.svg');
  const [user, setUser] = useState<USER | null>(null);
  const [uploadDisplayPictureDialog,setDisplayPictureDialog]=useState<boolean>(false);

  const canUpdateDisplayPicture = username === user?.username;
  useEffect(() => {
    getCurrentUserClient().then((res) => {
      setUser(res);
    }).catch((error) => {
      setUser(null);
      console.error(error);

    })
  }, [])
  useEffect(() => {
    function fetchImage() {
      api.get(`/profile/displaypicture/${username}`, { responseType: 'blob' }).then((res) => {
        setDisplayPicture(URL.createObjectURL(res.data));
      }).catch((error) => {
        console.error(error);
      })
    }
    fetchImage()
    return () => setDisplayPicture('/nodp.svg')
  }, [username])
  if (displaypicture) {
    return canUpdateDisplayPicture ? (<CustomDialog open={uploadDisplayPictureDialog} onOpenChange={(isOpen:boolean)=>{
      setDisplayPictureDialog(isOpen)
    }} title='Upload Display Picture' content={<UploadDisplayPictureDialogContent setDisplayPictureDialog={setDisplayPictureDialog}/>}>
      <Image className='rounded-full aspect-square object-fill' src={displaypicture} alt='DP' width={width} height={height} />
    </CustomDialog>) : (<Image className='rounded-full aspect-square object-fill' src={displaypicture} alt='DP' width={width} height={height} />)
  }
}

export default DisplayPicture