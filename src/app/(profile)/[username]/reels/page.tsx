'use client'
import Video from '@/components/custom/Video';
import { clientapi } from '@/lib/api';
import { PostData } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
type Props = {
    params: Promise<{ username: string }>
}
function Reels({ params }: Props) {
    const { username } = React.use(params);
    const [data, setData] = useState<PostData[] | null>(null);
    async function fetchData(pageNumber: number = 1) {
        const response = await clientapi.get(`/post/user/${username}`)
        setData(response.data.data.posts)
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log("post data", data);
    return (
        <div className='grid grid-cols-3 gap-3 mt-5 ' >
            {data && <>
                {data?.map((postData: PostData) => {
                    if (postData.content[0].mimetype.split('/')[0] === 'video') {
                        return <Link key={postData._id} href={`/post/${postData._id}`}><Video filename={`${postData.content[0].filename}`}></Video></Link>
                    }
                })}
            </>}
        </div>
    )
}

export default Reels