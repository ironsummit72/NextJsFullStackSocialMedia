'use client'
import { Ellipsis } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { clientapi } from '@/lib/api'

import { PostData } from '@/types'
import Link from 'next/link'
import Video from '@/components/custom/Video'
type Props = {
    params: Promise<{ tagname: string }>
}
function Tagname({ params }: Props) {
    const { tagname } = use(params);
    const [posts, setPosts] = useState<PostData[]>()
    useEffect(() => {
        if (!tagname) return
        clientapi.get(`hashtag/${tagname}`).then((res) => {
            setPosts(res.data.data.posts)
            console.log(res.data.data, "tag data");

        }).catch((err) => {
            setPosts(undefined)
            console.log(err);
        })
    }, [tagname])
    if (posts) {
        return (
            <div className='flex flex-col gap-2 items-center'>
                <div className='flex items-center justify-between w-[80vw]  h-40 px-5 ' >
                    <h1 className='text-lg font-bold'>{`#${tagname}`}</h1>
                    <Ellipsis />
                </div>
                <div className='grid grid-cols-3 gap-3 mt-5 ' >
                    {posts && <>
                        {posts?.map((postData: PostData) => {
                            if (postData.content[0].mimetype.split('/')[0] === 'video') {
                                return <Link key={postData._id} href={`/post/${postData._id}`}><Video filename={`${postData.content[0].filename}`}></Video></Link>
                            } else {
                                return <Link key={postData._id} href={`/post/${postData._id}`}><img key={postData._id} src={`http://localhost:5002/content/stream/${postData.content[0].mimetype.split('/')[0]}/${postData.content[0].filename}`} width={400} height={400} alt="" /></Link>
                            }
                        })}
                    </>
                    }
                </div>
            </div>
        )
    } else {
        return <div className='flex items-center justify-center h-screen'>
            <div className='flex gap-3 items-center'>
                <h1 className='text-lg font-bold'>{`#${tagname} not found`}</h1>
                <Link className='text-blue-500' href={'/'}>Go Back</Link>
            </div>
        </div>
    }
}
export default Tagname