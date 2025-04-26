"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { clientapi } from "@/lib/api"
import { PostData, USER, UserData } from "@/types"
import DisplayPicture from "@/components/custom/DisplayPicture"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import LinkifyText from "@/components/custom/Linkify"
import Video from "@/components/custom/Video"
import CustomDialog from "@/components/custom/Dialogs/Dialog"
import ShowLikeOfPostContent from "@/components/custom/Dialogs/Contents/ShowLikeOfPostContent"
import { getCurrentUserClient } from "@/lib/getCurrentUserClient"
import { useRouter } from "next/navigation"




type Props = {
    postId: string
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
export default function SinglePostCard({ postId }: Props) {
    const router=useRouter()
    const { toast } = useToast()
    const [data, setData] = useState<PostData>();
    const [isliked, setIsLiked] = useState<boolean>(false);
    const [issaved, setIsSaved] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentsType[]>()
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [commentOrReply, setCommentOrReply] = useState<'REPLY' | 'COMMENT'>('COMMENT');
    const [replyId, setReplyId] = useState<string | null>(null);
    const [newComment, setNewComment] = useState("")
    const [weekday, month, day, year, time] = new Date(data?.createdAt!).toString().split(" ")
    const [cweekday, cmonth, cday, cyear, ctime] = new Date(Date.now()).toString().split(" ")

    const [user, setUser] = useState<USER | null>()

    useEffect(() => { getCurrentUserClient().then((res) => setUser(res)) }, [])




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



    function handleDeletePost(){
        clientapi.delete(`/post/${postId}`).then((res) => {
            toast({ title: "Post deleted", description: res.data.message })
            setReload((prev) => !prev)
        }).catch((err) => {
            console.error(err);
        })
    }

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
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden border border-gray-200">
            {/* Post header */}
            <div className="flex items-center p-3">
                <Avatar className="h-8 w-8 mr-3">
                    <DisplayPicture username={data?.user.username!} width={30} height={45} />
                    <AvatarFallback>TG</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-black">
                    <div className="font-semibold text-sm">{data?.user.username}</div>
                    {/* <div className="text-xs text-gray-500">Bali, Indonesia</div> */}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-5 w-5 text-black" />
                            <span className="sr-only">More options</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>{router.push(`/post/${data?._id}`)}}>Go to post</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{navigator.clipboard.writeText(`${window.location.origin}/post/${data?._id}`)}}>Copy link</DropdownMenuItem>
                       
                        {user?.username === data?.user.username &&  <> <DropdownMenuSeparator /> <DropdownMenuItem className="text-red-500"  onClick={handleDeletePost}>Delete Post</DropdownMenuItem> </>}

                       

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Post image carousel */}
            <div className="relative aspect-square">
                {/* Current image */}
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
                    <CarouselNext />
                    <CarouselPrevious />
                </Carousel>
            </div>
            <div className="p-3">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={handleLike}>
                        <Heart className={`h-6 w-6 text-black ${isliked ? "fill-red-500 text-red-500" : ""}`} />
                        <span className="sr-only">Like</span>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                        <Link href={`/post/${data?._id}`}>
                            <MessageCircle className="h-6 w-6 text-black" />
                            <span className="sr-only">Comment</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                        <Send className="h-6 w-6 text-black" />
                        <span className="sr-only">Share</span>
                    </Button>
                    <div className="flex-1"></div>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => handleSave()}>
                        <Bookmark className={`h-6 text-black w-6 ${issaved ? "fill-black" : ""}`} />
                        <span className="sr-only">Save</span>
                    </Button>
                </div>

                {/* Like count */}

                <CustomDialog title='Likes' content={<ShowLikeOfPostContent postId={postId} />}>
                    <span className='font-semibold'> {data?.likes.length} likes</span>
                </CustomDialog>

                {/* Caption */}
                <div className="mt-1 text-sm flex items-center">
                    <span className="font-semibold mr-1 text-black">{data?.user.username}</span>
                    <span className="text-black truncate">
                        {/* <LinkifyText text={data?.caption!}/> */}
                        {data?.caption && <LinkifyText text={data?.caption!} />}

                    </span>
                </div>

                {/* View all comments */}
                {comments?.length! > 0 && <Link href={`/post/${postId}`} className="text-gray-500 text-sm mt-1">View all {comments?.length} comments</Link>}
                {/* {data?.comments.length >0 && <Link href={`/post/${postId}`} className="text-gray-500 text-sm mt-1">View all {data?.comments.length} comments</Link>} */}
                {/* Comments */}
                <div className="mt-2">
                    {comments?.slice(comments?.length - 2, comments?.length).map((comment) => (
                        <div key={comment._id} className="flex items-start mb-2">
                            <div className="flex-1">
                                <div className="text-sm flex">
                                    <span className="font-semibold mr-1 text-black">{comment.user.username}</span>
                                    <span className="text-black">{comment.message && <LinkifyText text={comment.message} />}</span>
                                </div>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                    {/* <span className="mr-3">{comment.timestamp}</span> */}
                                    <button className="mr-3" onClick={() => {
                                        setCommentOrReply('REPLY'),
                                            setReplyingTo(comment.user.firstName)
                                        setReplyId(comment?._id)
                                    }}>Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-500 mt-2"> {data?.createdAt ? <span className='text-gray-500'>
                    {" "}
                    {cday === day
                        ? time.split(":")[0] + ":" + time.split(":")[1] + " "
                        : ""}
                    {cmonth === month ? day : month} {cmonth === month ? weekday : day}{" "}
                    {cyear === year ? "" : year}
                </span> : <></>}</div>
            </div>

            {/* Comment input */}
            <div className="border-t border-gray-200 p-3">
                <div className="flex items-center">
                    <Input
                        placeholder={commentOrReply === 'REPLY' ? ` Reply to ${replyingTo}'s comment...` : "Add a comment..."}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 text-black border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    />
                    {newComment.trim() && <Button
                        onClick={handleAddComment}
                        variant="ghost"
                        size="sm"
                        className=" font-semibold  hover:bg-transparent"
                        disabled={!newComment.trim()}>
                        Post
                    </Button>}
                </div>
            </div>
        </div>
    )
}
