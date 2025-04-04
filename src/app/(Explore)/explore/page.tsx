'use client'
import React, { useEffect, useState } from 'react'
import { PostData } from '@/types';
import Video from '@/components/custom/Video';
import Link from 'next/link';
import { clientapi } from '@/lib/api';
import { InView } from 'react-intersection-observer'
import Spinner from '@/components/custom/Spinner';
function Explore() {
  const [data, setData] = useState<PostData[] | null>(null);
  const [page, setPage] = useState<number>(2);
  const [endPage, setEndPage] = useState<number>(0)
  async function fetchData(pageNumber: number) {
    const response = await clientapi.get(`/post/r/recommended?limit=10&page=${pageNumber}`)
    setData(response.data.data.postsResponse)
    setEndPage(response.data.data.endPage)
  }
  useEffect(() => {
    fetchData(1)
  }, [])
  return (
    <div className='grid grid-cols-3 gap-3 mt-5 ' >
      {data && <>
        {data?.map((postData: PostData) => {
          if (postData.content[0].mimetype.split('/')[0] === 'video') {
            return <Link key={postData._id} href={`/post/${postData._id}`}><Video filename={`${postData.content[0].filename}`}></Video></Link>
          } else {
            return <Link key={postData._id} href={`/post/${postData._id}`}><img key={postData._id} src={`http://localhost:5002/content/stream/${postData.content[0].mimetype.split('/')[0]}/${postData.content[0].filename}`} width={400} height={400} alt="" /></Link>
          }
        })}
        <InView as={'div'} onChange={async () => {
          if (endPage >= page) {
            const response = await clientapi.get(`/post/r/recommended?limit=10&page=${page}`)
            setData((data) => [...data!, ...response.data.data.postsResponse])
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
      </>}
    </div>
  )
}
export default Explore