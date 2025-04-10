'use client'
import DisplayPicture from '@/components/custom/DisplayPicture'
import { Button } from '@/components/ui/button'
import { clientapi } from '@/lib/api'
import { PostData, USER, UserData } from '@/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from 'next/navigation'
import { Clapperboard, Grid, Tags } from 'lucide-react'
import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Linkify from '@/components/custom/Linkify'
import linkify from '@/components/custom/Linkify'
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
    const [isFollowing, setIsFollowing] = useState<boolean>();
    const [collapsibleIsOpen,setCollapsibleIsOpen]=useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const pathname = usePathname()
    const router = useRouter()
    const [user, setUser] = useState<USER | null>(null);
    useEffect(() => {
        getCurrentUserClient().then((res) => {
            setUser(res);
        }).catch((error) => {
            setUser(null);
            console.error(error);
        })
    }, [])
    useEffect(() => {
        clientapi.get(`/profile/info/${username}`).then((res) => {
            setProfileInfo(res.data.data);
        })
    }, [reload,username])
    useEffect(() => {
        if (!profileInfo) return;
        clientapi.get(`/user/isfollowing/${profileInfo?._id}`).then((res) => {
            console.log(res.data.data, 'isFollowing');
            setIsFollowing(res.data.data);
        }).catch((err) => {
            console.error(err);
        })
    }, [profileInfo, reload])
    const handleFollow = () => {
        clientapi.post(`user/follow/${profileInfo?._id}`).then((res) => {
            console.log(res.data.data);
            setReload((prev) => !prev)
        }).catch((err) => {
            console.error(err);
        })
    }
    return (
        <div className="mt-5 flex flex-col items-center ">
            <div className="flex items-center">
                {/* {Profile displaypicture and profile meta data} */}
                <DisplayPicture username={username} width={170} height={170} />
                <div className="flex flex-col gap-5 mx-6 ">
                    <div className="flex gap-5 items-center"><h1 className="text-2xl">{profileInfo?.username}</h1>{username === user?.username ? <Button asChild ><Link href={'/accounts/edit'}>Edit Profile</Link></Button> : <Button onClick={handleFollow}>{isFollowing ? "Following" : "Follow"}</Button>} <Button>Message</Button> </div>
                    <div className="Info flex items-center gap-2 justify-between p-2">
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
                        <Collapsible className='w-80' defaultOpen={collapsibleIsOpen} open={collapsibleIsOpen} onOpenChange={setCollapsibleIsOpen} >
                            {profileInfo?.bio.length! > 30 ?<div>
                                <CollapsibleTrigger><Linkify text={profileInfo?.bio.substring(0,30)!}/><span className='text-gray-500 font-semibold'> {collapsibleIsOpen?"":"...more"}</span></CollapsibleTrigger> <CollapsibleContent onClick={()=>{setCollapsibleIsOpen((prev)=>!prev)}}><Linkify text={profileInfo?.bio.substring(30,profileInfo.bio.length)!}/></CollapsibleContent>
                            </div> : <CollapsibleTrigger>{profileInfo?.bio}</CollapsibleTrigger>}
                        </Collapsible>
                    </div>
                </div>
            </div>
            <div>
                {stories}
            </div>
            <div className=' flex justify-center items-center w-[80vw] mt-10'>
                <Tabs defaultValue="posts" value={pathname.split('/')[2]} className="w-full flex items-center flex-col " onValueChange={(e) => { router.push(`../${username}/${e}`) }}>
                    <TabsList className='w-full '>
                        <TabsTrigger value="posts"><div className='flex items-center gap-2'><Grid /> POSTS</div></TabsTrigger>
                        <TabsTrigger value="reels"><div className='flex items-center gap-2'><Clapperboard /> REELS</div></TabsTrigger>
                        <TabsTrigger value="tagged"><div className='flex items-center gap-2'><Tags /> TAGGED</div></TabsTrigger>
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