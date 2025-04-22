'use client'
import React, { useEffect, useState } from 'react'
import DisplayPicture from '../DisplayPicture'
import { Button } from '@/components/ui/button'
import HoverCardProfile from '../HoverCard/HoverCardProfile'
import { clientapi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { PostData, UserData } from '@/types'
import Link from 'next/link'

type Props = { username: string }
interface UserInfo extends UserData {
    followers: []
    following: [],
    posts: PostData[]
}
function SuggessionCard({ username }: Props) {
    const [user, setUser] = useState<UserInfo>();
    const { toast } = useToast();
    useEffect(() => {
        clientapi.get(`/profile/info/${username}`).then((res) => {
            setUser(res.data.data);
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
                        <h3 title='info' className='text-gray-500'>{'Suggested for you'}</h3>
                    </div>
                    <div>
                        <Button onClick={onHandleFollow} className='font-bold text-blue-500' variant={'ghost'}>Follow</Button>
                    </div>
                </div>
            </Link>
        </HoverCardProfile>
    )
}

export default SuggessionCard