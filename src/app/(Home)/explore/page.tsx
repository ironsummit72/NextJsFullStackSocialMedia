import { api } from '@/lib/api'
import React from 'react'
import { headers } from 'next/headers'
import { PostData } from '@/types';
import Image from 'next/image';
import Video from '@/components/custom/Video';
import Link from 'next/link';
async function Explore() {
  const headersList = await headers()
  const response = await api.get('/post/r/recommended', { headers: { cookie: headersList.get('cookie') } });
  const { data } = await response.data;
  return (
    <div className='grid grid-cols-3 gap-3 mt-5' >
      {data.map((postData: PostData) => {
        if (postData.content[0].mimetype.split('/')[0] === 'video') {
          return <Link key={postData._id} href={`/post/${postData._id}`}><Video filename={`${postData.content[0].filename}`}></Video></Link>
        } else {
          return <Link key={postData._id} href={`/post/${postData._id}`}><Image key={postData._id} src={`http://localhost:5002/content/stream/${postData.content[0].mimetype.split('/')[0]}/${postData.content[0].filename}`} width={400} height={400} alt="" /></Link>
        }
      })}
    </div>
  )
}

export default Explore