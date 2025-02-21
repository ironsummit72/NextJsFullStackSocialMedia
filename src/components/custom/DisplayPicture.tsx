'use client'
import { clientapi as api } from '@/lib/api'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
  width: number,
  height: number,
  username: string
}
function DisplayPicture({ width, height, username }: Props) {
  const [displaypicture, setDisplayPicture] = useState<string>('/nodp.svg');
  useEffect(() => {
    function fetchImage() {
      api.get(`/profile/displaypicture/${username}`, { responseType: 'blob' }).then((res) => {
        setDisplayPicture(URL.createObjectURL(res.data));
      }).catch((error) => {
        console.error(error);
      })
    }
    fetchImage()
     return ()=>setDisplayPicture('/nodp.svg')
  }, [username])
  return (
    displaypicture && <Image className='rounded-full aspect-square object-fill' src={displaypicture} alt='DP' width={width} height={height} />
  )
}

export default DisplayPicture