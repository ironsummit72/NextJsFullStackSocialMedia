'use client'
import DisplayPicture from '@/components/custom/DisplayPicture'
import { Button } from '@/components/ui/button'

import { clientapi } from '@/lib/api'
import { PostData, UserData } from '@/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from 'next/navigation'
import { Clapperboard, Grid, Tags } from 'lucide-react'
interface UserInfo extends UserData {
    followers: []
    following: [],
    posts: PostData[]
}
type Props = {
    username: string
    stories: React.ReactNode
    poststab: React.ReactNode
}
function ProfileInfo({ username, stories, poststab }: Props) {
    const [profileInfo, setProfileInfo] = useState<UserInfo>();
    const pathname=usePathname()
    const router = useRouter()
    useEffect(() => {
        clientapi.get(`/profile/info/${username}`).then((res) => {
            setProfileInfo(res.data.data);
        })
    }, [username])
    return (
        <div className="mt-5 flex flex-col items-center ">
            <div className="flex items-center">
                {/* {Profile displaypicture and profile meta data} */}
                <DisplayPicture username={username} width={170} height={170} />
                <div className="flex flex-col gap-5 mx-6 ">
                    <div className="flex gap-5 items-center"><h1 className="text-2xl">{profileInfo?.username}</h1> <Button>Follow</Button> <Button>Message</Button> </div>
                    <div className="Info flex items-center justify-between p-2">
                        <div className="Post flex gap-1 items-center ">
                            <h1 className="font-bold">{profileInfo?.posts.length}</h1>
                            <h2>posts</h2>
                        </div>
                        <Link href={`../${username}/followers`} className="Followers flex gap-1 items-center  ">
                            <h1 className="font-bold">{profileInfo?.followers.length}</h1>
                            <h2>followers</h2>
                        </Link>
                        <Link href={`../${username}/following`} className="Followers flex gap-1 items-center  ">
                            <h1 className="font-bold">{profileInfo?.following.length}</h1>
                            <h2>following</h2>
                        </Link>
                    </div>
                    <div>
                        <h1 className="font-medium text-lg">{profileInfo?.firstName} {profileInfo?.lastName}</h1>
                    </div>
                </div>
            </div>
            <div>
                {stories}
            </div>
            <div className=' flex justify-center items-center w-[80vw] mt-10'>
                <Tabs defaultValue="posts" value={pathname.split('/')[2]} className="w-full flex items-center flex-col " onValueChange={(e) => { router.push(`../${username}/${e}`) }}>
                    <TabsList className='w-full '>
                        <TabsTrigger value="posts"><div className='flex items-center gap-2'><Grid/> POSTS</div></TabsTrigger>
                        <TabsTrigger value="reels"><div className='flex items-center gap-2'><Clapperboard/> REELS</div></TabsTrigger>
                        <TabsTrigger value="tagged"><div className='flex items-center gap-2'><Tags/> TAGGED</div></TabsTrigger>
                    </TabsList>
                    <div className='h-auto min-h-screen  w-full mt-2'>
                    {poststab}
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default ProfileInfo