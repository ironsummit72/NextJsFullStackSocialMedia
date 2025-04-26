'use client'
import { clientapi } from '@/lib/api';
import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import { PostData, USER } from '@/types';
import { InView } from 'react-intersection-observer'
import React, { useEffect, useState } from 'react'
import SinglePostCard from './_components/SinglePostCard';
import Spinner from '@/components/custom/Spinner';
function Home() {
  const [user, setUser] = useState<USER | null>(null)
  const [data, setData] = useState<PostData[]>([])
  const [page, setPage] = useState<number>(2);
  const [endPage, setEndPage] = useState<number>(0)
  useEffect(() => {
    getCurrentUserClient().then((res) => {
      setUser(res)
    })
  }, [])

  useEffect(() => {
    async function fetchPosts(page: number) {
      const response = await clientapi.get(`/post/personalized/post?limit=10&page=${page}`)
      setData(response.data.data.postsResponse)
      setEndPage(response.data.data.endPage)
    }
    fetchPosts(1)
  }, [])
  return (
    <div className='flex flex-col gap-4 '>
      {data.map((postData: PostData) => {
        return (<SinglePostCard key={postData._id} postId={postData._id} />)
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
    </div>
  )
}

export default Home