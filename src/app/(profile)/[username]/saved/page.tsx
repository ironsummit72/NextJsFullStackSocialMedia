import { api } from '@/lib/api'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'
import { UserData } from '@/types'
import Video from '@/components/custom/Video'
import Link from 'next/link'
import { headers } from 'next/headers'

type Props = {
    params: Promise<{ username: string }>
}
async function SavedPosts({ params }: Props) {
    const headersList = await headers()
    const currentUser = await getCurrentUser()
    const { username } = await params
    if (currentUser.username !== username) {
        redirect(`/${username}`)
    }
    const response=await api.get(`post/savedposts/${username}`,{headers:{cookie:headersList.get('cookie')}});
    const data:UserData=response.data.data;
    return (
        <div className='grid grid-cols-3 gap-3 mt-5 ' >
        {data && <>
          {data?.savedPosts?.map((postData) => {
            if (postData.content[0].mimetype.split('/')[0] === 'video') {
              return <Link key={postData._id} href={`/post/${postData._id}`}><Video filename={`${postData.content[0].filename}`}></Video></Link>
            } else {
              return <Link key={postData._id} href={`/post/${postData._id}`}><img key={postData._id} src={`http://localhost:5002/content/stream/${postData.content[0].mimetype.split('/')[0]}/${postData.content[0].filename}`} width={400} height={400} alt="" /></Link>
            }
          })}
        </>}
      </div>
    )
}

export default SavedPosts