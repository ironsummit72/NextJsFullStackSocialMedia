import { clientapi } from '@/lib/api'
import { PostData, USER, UserData } from '@/types';
import React, { useEffect, useState } from 'react'
import HoverCardProfile from '../../HoverCard/HoverCardProfile';
import Link from 'next/link';
import DisplayPicture from '../../DisplayPicture';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUserClient } from '@/lib/getCurrentUserClient';


function ShowLikeOfPostContent({ postId }: Props) {
    const [data, setData] = useState<UserData[]>();
    useEffect(() => {
        async function getLikes() {
            clientapi.get(`/post/likes/${postId}`).then((res) => {
                setData(res.data.data.likes);
                console.log("like data from like dialog", res.data.data.likes);

            }).catch((err) => {
                console.log(err);
            })
        }
        getLikes()
    }, [])
    return (
        <div>
            {data?.map((userdata) => <UserCard key={userdata._id} username={userdata.username} />)}
        </div>
    )
}
type Props = {
    postId: string
}
export default ShowLikeOfPostContent


function UserCard({ username }: UserCardProps) {

    const [currentUser, setCurrentUser] = useState<USER>();
    const [user, setUser] = useState<UserInfo>();
    const [isFollowing, setIsFollowing] = useState<boolean>();
    getCurrentUserClient().then((res) => {
        setCurrentUser(res);
    })
    const { toast } = useToast();
    useEffect(() => {
        clientapi.get(`/profile/info/${username}`).then((res) => {
            setUser(res.data.data);
        })
    }, [username])
    useEffect(() => {
        clientapi.get(`/user/isfollowing/username/${username}`).then((res) => {
            setIsFollowing(res.data.data);
        })
    }, [username])
    const onHandleFollow = () => {
        clientapi.post(`/user/follow/${user?._id}`).then((res) => {
            toast({
                title: "follow",
                description: res.data?.message
            })
        })
    }
    return (
        <HoverCardProfile username={username}>
            <Link href={`/${username}`} className='flex items-center justify-center cursor-pointer'>
                <div className='flex gap-4 items-center p-2  w-full m-3 rounded-md'>
                    <DisplayPicture username={username} width={40} height={40} />
                    <div className='max-w-[90%] w-[90%]'>
                        <h1 className='font-bold' title='username'>{username}</h1>
                        <h3 title='info' className='text-gray-500'>{user?.firstName} {user?.lastName}</h3>
                    </div>
                    <div>
                        {
                            currentUser?.username == username ? <Button className='font-bold text-blue-500' variant={'ghost'}>You</Button> :
                                isFollowing ? <Button onClick={onHandleFollow} className='font-bold text-blue-500' variant={'ghost'}>Following</Button> : <Button onClick={onHandleFollow} className='font-bold text-blue-500' variant={'ghost'}>Follow</Button>
                        }

                    </div>
                </div>
            </Link>
        </HoverCardProfile>
    )
}
type UserCardProps = {
    username: string
}
interface UserInfo extends UserData {
    followers: []
    following: [],
    posts: PostData[]
}