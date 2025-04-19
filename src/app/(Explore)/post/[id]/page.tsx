'use client'
import DisplayPicture from '@/components/custom/DisplayPicture'
import { CommentSection } from '@/components/custom/PostCard'
import Video from '@/components/custom/Video'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { clientapi } from '@/lib/api'
import { PostData } from '@/types'
import { EllipsisVertical } from 'lucide-react'
import React, { useEffect, useState } from 'react'
type Props = {
  params: Promise<{ id: string }>
}

function PostPage({ params }: Props) {
  const { id: postId } = React.use(params)
  const [data, setData] = useState<PostData>();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await clientapi.get(`/post/${postId}`)
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])
  return (
    <div className='w-[90vw] overflow-x-hidden h-screen flex items-center justify-center'>
      <div className='w-[50%] gap-4 h-full  flex items-center'>
        <div className='w-1/2 '>
          <Carousel>
            <CarouselContent>
              {data?.content.map((content) => {
                if (content.mimetype.split('/')[0] === 'video') {
                  return <CarouselItem key={data._id}> <Video className='object-cover' width={400} height={400} filename={content.filename}></Video></CarouselItem>
                } else {
                  return <CarouselItem key={data._id}><img key={data._id} src={`http://localhost:5002/content/stream/${content.mimetype.split('/')[0]}/${content.filename}`} width={400} height={400} alt="" /></CarouselItem>
                }
              })}
            </CarouselContent>
            {data?.content.length! > 0 ? <>
              <CarouselPrevious />
              <CarouselNext /></> : <></>}
          </Carousel>
        </div>
        <div className='w-1/2 h-[60%]  flex flex-col gap-2'>
          {/* Carusel */}
          <div className='flex justify-between w-full items-center'>
            <div className='flex items-center gap-2 mx-2'>
              <DisplayPicture username={data?.user.username!} width={30} height={45} />
              <h1>{data?.user.username}</h1>
            </div>
            <EllipsisVertical />
          </div>
         
          <CommentSection caption={data?.caption!}  postId={postId} />
        </div>
      </div>
    </div>
  )
}




export default PostPage