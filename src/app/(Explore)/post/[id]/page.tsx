'use client'
import ShowLikeOfPostContent from '@/components/custom/Dialogs/Contents/ShowLikeOfPostContent'
import CustomDialog from '@/components/custom/Dialogs/Dialog'
import DisplayPicture from '@/components/custom/DisplayPicture'
import { CommentSection } from '@/components/custom/PostCard'
import Video from '@/components/custom/Video'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { clientapi } from '@/lib/api'
import { PostData } from '@/types'
import { Bookmark, EllipsisVertical, Heart, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
type Props = {
  params: Promise<{ id: string }>
}
function PostPage({ params }: Props) {
  const { id: postId } = React.use(params)
  const [data, setData] = useState<PostData>();
  const [isliked, setIsLiked] = useState<boolean>(false);
  const [issaved, setIsSaved] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [weekday, month, day, year, time] = new Date(data?.createdAt!).toString().split(" ")
  const [cweekday, cmonth, cday, cyear, ctime] = new Date(Date.now()).toString().split(" ")
  useEffect(() => {
    async function fetchData() {
      try {
        const isSavedResponse = await clientapi.get(`/post/issaved/${postId}`)
        const isLikedResponse = await clientapi.get(`/post/isliked/${postId}`)
        setIsSaved(isSavedResponse.data.data);
        setIsLiked(isLikedResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [reload])

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
  }, [reload])
  function handleLike() {
    clientapi.patch(`post/like/${postId}`).then((res) => {
      setReload(prev => !prev);
    }).catch((err) => {
      console.error(err);
    })
  }
  function handleSave() {
    clientapi.patch(`post/save/${postId}`).then((res) => {
      setReload(prev => !prev);
    }).catch((err) => {
      console.error(err);
    })
  }
  return (
    <div className='w-[90vw] overflow-x-hidden h-screen flex items-center justify-center'>
      <div className='w-[50%] gap-4 h-full  flex items-center'>
        <div className='w-1/2 '>
          <Carousel>
            <CarouselContent>
              {data?.content.map((content, index) => {
                if (content.mimetype.split('/')[0] === 'video') {
                  return <CarouselItem key={content.filename + content.originalname + index}> <Video className='object-cover' width={400} height={400} filename={content.filename}></Video></CarouselItem>
                } else {
                  return <CarouselItem key={content.filename + content.originalname + index}><img key={data._id} src={`http://localhost:5002/content/stream/${content.mimetype.split('/')[0]}/${content.filename}`} width={400} height={400} alt="" /></CarouselItem>
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
          <CommentSection caption={data?.caption!} postId={postId} />
          <div className='flex flex-col gap-3'>
            <div className='flex gap-4 items-center justify-between '>
              <div className='flex items-center gap-4'>
                {isliked ? <Heart className='fill-red-500 cursor-pointer' onClick={handleLike} /> : <Heart className='cursor-pointer' onClick={handleLike} />}
                <Share2 />
              </div>
              {!issaved ? <Bookmark className='cursor-pointer' onClick={handleSave} /> : <Bookmark className='fill-black cursor-pointer' onClick={handleSave} />}
            </div>
            <div className='flex flex-col gap-1  w-fit items-start'>
              <CustomDialog title='Likes' content={<ShowLikeOfPostContent postId={postId} />}>
              <span className='font-semibold'> {data?.likes.length} likes</span>
              </CustomDialog>
              {data?.createdAt ? <span className='text-gray-500'>
                {" "}
                {cday === day
                  ? time.split(":")[0] + ":" + time.split(":")[1] + " "
                  : ""}
                {cmonth === month ? day : month} {cmonth === month ? weekday : day}{" "}
                {cyear === year ? "" : year}
              </span> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostPage