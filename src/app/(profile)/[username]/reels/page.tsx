'use client'
import Spinner from '@/components/custom/Spinner';
import Video from '@/components/custom/Video';
import { clientapi } from '@/lib/api';
import { PostData } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer';


type Props = {
    params: Promise<{ username: string }>
}
function PostsHome({ params }: Props) {
    const { username } = React.use(params);
    const [data, setData] = useState<PostData[] | null>(null);
    const [page, setPage] = useState<number>(2);
    const [endPage, setEndPage] = useState<number>(0)
    async function fetchData(pageNumber: number = 1) {
        const response = await clientapi.get(`/post/user/${username}?page=${pageNumber}&limit=10`)
        setData(response.data.data.postData)
        setEndPage(response.data.data.endPage)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='grid grid-cols-3 gap-3 mt-5 ' >
            {data && <>
                {data?.map((postData: PostData) => {
                    if (postData.content[0].mimetype.split('/')[0] === 'video') {
                        return <Link key={postData._id} href={`/post/${postData._id}`}><Video filename={`${postData.content[0].filename}`}></Video></Link>
                    } 
                })}
            </>}
            <InView as={'div'} onChange={async () => {
                if (endPage >= page) {
                    const response = await clientapi.get(`/post/user/${username}?&page=${page}&limit=10`)
                    setData((data) => [...data!, ...response.data.data.postData])
                    setPage((page) => page + 1)
                }
            }}>
            </InView>
            <div className='w-full flex items-center  justify-center gap-3'>
                {page >= endPage ? <h1>{`that's all folks ${endPage}`}</h1> : <>
                    <Spinner />
                    <h1>loading...</h1>
                </>
                }
            </div>
        </div>
    )
}

export default PostsHome



