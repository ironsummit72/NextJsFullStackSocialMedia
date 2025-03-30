'use client'

import { clientapi } from "@/lib/api"
import DisplayPicture from "../../DisplayPicture"
import { useEffect, useState } from "react"
import { PostData, UserData } from "@/types"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

type Props = {
    username: string
}
export default function HoverCardContentProfile({ username }: Props) {
    interface UserInfo extends UserData {
        followers: []
        following: [],
        posts: PostData[]
    }
    const [user, setUser] = useState<UserInfo>();
    useEffect(() => {
        clientapi.get(`/profile/info/${username}`).then((res) => {
            setUser(res.data.data);
        })
    }, [username])

    return <div className="flex flex-col  gap-4">
        <div className="flex items-center gap-4">
            <DisplayPicture width={50} height={50} username={username} />
            <div className="profileInfo">
                <h1 className="username font-bold">{user?.username}</h1>
                <h2 className="text-gray-500 font-medium">{`${user?.firstName} ${user?.lastName}`}</h2>

            </div>
        </div>

        <div className="Info flex items-center justify-between p-2">
            <div className="Post flex flex-col items-center ">
                <h1 className="font-bold">{user?.posts.length}</h1>
                <h2>posts</h2>
            </div>
            <div className="Followers flex flex-col items-center  ">
                <h1 className="font-bold">{user?.followers.length}</h1>
                <h2>followers</h2>
            </div>
            <div className="Followers flex flex-col items-center  ">
                <h1 className="font-bold">{user?.following.length}</h1>
                <h2>following</h2>
            </div>
        </div>

        <div className="PostInfo grid grid-cols-3 gap-1">
            {user?.posts.slice(0, 3).map((post) => {
                if (post.content[0].mimetype.split('/')[0] === 'video') {
                    return <video className="w-40 h-40" key={post._id} src={`http://localhost:5002/content/stream/${post.content[0].mimetype.split('/')[0]}/${post.content[0].filename}`} />
                } else {
                    return <img className="w-40 h-40" key={post._id} src={`http://localhost:5002/content/stream/${post.content[0].mimetype.split('/')[0]}/${post.content[0].filename}`} alt="" />
                }
            })}

        </div>
        <Button><UserPlus/> Follow</Button>
    </div>
}