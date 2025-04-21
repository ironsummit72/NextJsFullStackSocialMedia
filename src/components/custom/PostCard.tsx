import { clientapi } from '@/lib/api'
import React, { useEffect, useState } from 'react'
import { PostData, USER, UserData } from '@/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Video from '@/components/custom/Video';
import DisplayPicture from './DisplayPicture';
import { EllipsisVertical, Heart } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUserClient } from '@/lib/getCurrentUserClient';
import { twMerge } from 'tailwind-merge';


type Props = {
  postId: string
}
export function PostCard({ postId }: Props) {
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
    <div className='flex gap-2 '>
      <div className='w-1/2'>
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

      <div className='w-1/2 flex flex-col gap-2'>
        <div className='flex mx-2 items-center w-full gap-3 justify-between'>
          <div className='flex items-center gap-3'>
            <DisplayPicture username={data?.user?.username!} height={40} width={40} />
            <h1>{data?.user.username}</h1>
          </div>
          <EllipsisVertical />
        </div>
        {/* <LinkifyText text={data?.caption!}/> */}

        <CommentSection caption={data?.caption!} postId={postId} />
      </div>
    </div>
  )
}

export default PostCard


type CommentSectionProps = {
  postId: string
  className?: string
  caption: string
}
type ReplyType = {
  _id: string
  user: UserData,
  parentCommentId: string,
  likes: UserData[],
  message: string,
}
type CommentsType = {
  _id: string
  user: UserData,
  likes: UserData[],
  message: string,
  postId: string,
  isEdited: boolean,
  replies: ReplyType[]
}
export function CommentSection({ postId, className, caption }: CommentSectionProps) {
  const [reload, setReload] = useState<boolean>()
  const [comments, setComments] = useState<CommentsType[]>()
  const [user, setUser] = useState<USER | null>()
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [commentOrReply, setCommentOrReply] = useState<'REPLY' | 'COMMENT'>('COMMENT');
  const [replyId, setReplyId] = useState<string | null>(null);
  const { toast } = useToast()
  async function fetchComments(page: Number) {
    const response = await clientapi.get(`/comment/${postId}?page=${page}&limit=10`)
    return response.data.data
  }
  useEffect(() => {
    fetchComments(1).then((res) => {
      setComments(res.commentResponse)
    })
  }, [reload])

  useEffect(() => {
    getCurrentUserClient().then((res) => {
      setUser(res)
    })
  }, [])

  function onHandleDeleteReply(id: string) {
    clientapi.delete(`comment/reply/delete/${id}`).then((res) => {
      toast({
        title: 'commen deleted',
        variant: 'destructive',
        description: 'comment deleted successfully'
      })
    })
  }
  function onHandleDeleteComment(id: string) {
    clientapi.delete(`comment/delete/${id}`).then((res) => {
      toast({ title: 'Comment Delete', description: 'comment deleted successfully', variant: 'destructive' })
      setReload((prev) => !prev)
    })
  }
  function handleLikeInComment(commentId: string) {
    clientapi.patch(`comment/like/${commentId}`).then((res) => {
      toast({
        title: "liked Comment",
        description: 'you liked a comment'
      })
      setReload((prev) => !prev)
    })
  }
  function handleLikeInCommentReply(replyId: string) {
    if (replyId) {
      clientapi.patch(`comment/reply/like/${replyId}`).then((res) => {
        toast({
          title: "liked Reply",
          description: 'you liked a Reply'
        })
        setReload((prev) => !prev)
      })
    }
  }
  function handleAddComment() {
    if (commentOrReply === 'COMMENT') {
      clientapi.post(`comment/create/${postId}`, { message: newComment }).then((res) => {
        toast({ title: "Comment added", description: res.data.message })
        setReload((prev) => !prev)
        setNewComment('')
      })
    } else {
      if (replyId)
        clientapi.post(`comment/reply/${replyId}`, { message: newComment }).then((res) => {
          toast({ title: "Reply added", description: res.data.message })
          setReload((prev) => !prev)
          setNewComment('')
        })
    }
  }
  return (
    <div className={twMerge('w-full h-full max-w-md mx-auto bg-white rounded-lg overflow-hidden ', className)}>
      <div className="px-4 py-3 max-h-96 overflow-y-auto">


        {/* caption */}
        {caption && <div className="mb-4">
          <div className="flex items-start">
            <Avatar>
              <AvatarFallback className="h-8 w-8 mr-2">
                <DisplayPicture username={user?.username!} width={70} height={70} />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="inline-flex items-start">
                <span className="font-semibold text-sm mr-1">{user?.username}</span>
                <span className="text-sm font-medium">{caption}</span>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500">
              </div>
            </div>
          </div>
        </div>}
        {comments?.map((comment) => (
          <div key={comment._id} className="mb-4">
            <div className="flex items-start">
              <Avatar>
                <AvatarFallback className="h-8 w-8 mr-2">
                  <DisplayPicture username={comment.user.username} width={70} height={70} />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="inline-flex items-start">
                  <span className="font-semibold text-sm mr-1">{comment.user.username}</span>
                  <span className="text-sm">{comment.message}</span>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  {/* <span className="mr-2">{comment.timestamp}</span> */}
                  {comment.likes.length > 0 && <span className="mr-2">{comment.likes.length} likes</span>}
                  <button className="mr-2 hover:text-gray-700" onClick={() => {
                    setCommentOrReply('REPLY'),
                      setReplyingTo(comment.user.firstName)
                    setReplyId(comment?._id)
                  }}>
                    Reply
                  </button>
                  {user?.username === comment.user.username ? <button className="mr-2 hover:text-red-700" onClick={() => onHandleDeleteComment(comment._id)}>
                    Delete
                  </button> : <></>}
                </div>
                {comment.replies.length > 0 && (
                  <div className="ml-6 mt-2">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="flex items-start mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <DisplayPicture username={reply.user.username} width={70} height={70} />
                        </Avatar>
                        <div className="flex-1">
                          <div className="inline-flex items-start">
                            <span className="font-semibold text-sm mr-1">{reply.user.username}</span>
                            <span className="text-sm">{reply.message}</span>
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            {reply.likes.length > 0 && <span className="mr-2">{reply.likes.length} likes</span>}
                            <button className="mr-2 hover:text-red-700" onClick={() => onHandleDeleteReply(reply._id)}>
                              Delete
                            </button>
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                          </div>
                        </div>
                        <button title='like' onClick={() => handleLikeInCommentReply(reply._id)} className="ml-2 flex-shrink-0">
                          <Heart
                            className={`h-3.5 w-3.5 ${"text-gray-400"}`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button title='like' onClick={() => handleLikeInComment(comment._id)} className="ml-2 flex-shrink-0">
                <Heart className={`h-4 w-4 ${"text-gray-400"}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-4 py-3 ">
        <div className="flex items-center">
          <Input
            placeholder={commentOrReply === 'REPLY' ? ` Reply to ${replyingTo}'s comment...` : "Add a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          />
          <Button
            onClick={handleAddComment}
            variant="ghost"
            size="sm"
            className="text-blue-500 font-semibold hover:text-blue-700 hover:bg-transparent"
            disabled={!newComment.trim()}>
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}
