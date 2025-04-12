'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { clientapi } from '@/lib/api'
import { USER, UserData } from '@/types'
import HoverCardProfile from '@/components/custom/HoverCard/HoverCardProfile'
import DisplayPicture from '@/components/custom/DisplayPicture'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import Link from 'next/link'

interface customUserData extends UserData {
  followers: UserData[]
}

interface Data {
  dbResponse: customUserData,
  endPage: number
}

function Followers() {
  const pathname = usePathname().split('/')[1];
  const [data, setData] = useState<Data>()

  const router = useRouter()
  const onHandleClose = () => {
    router.back()
  }

  useEffect(() => {
    clientapi.get(`/profile/followers/${pathname}?page=1&limit=10`).then((res) => {
      console.log(res.data);
      setData(res.data.data)
    }).catch((error) => {
      console.error(error);

    })
  }, [])

  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={onHandleClose} >
      <DialogContent>
        <DialogTitle className='text-center'><span className='text-lg font-bold'>Followers</span></DialogTitle>
        <div className='flex flex-col w-full items-center'>
          {data?.dbResponse.followers.map((data) => {
            return <HoverCardProfile key={data._id} username={data.username}>
              <Link href={`/${data.username}`} className='w-[90%]'>
              <Content username={data.username} data={data} />
              </Link>
            </HoverCardProfile>
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default Followers
type ContentProps = {
  username: string,
  data: UserData
}

function Content({ username, data }: ContentProps) {
  const [isFollowing, setIsFollowing] = useState<boolean>();
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
    if (!data) return;
    clientapi.get(`/user/isfollowing/${data?._id}`).then((res) => {
      console.log(res.data.data, 'isFollowing');
      setIsFollowing(res.data.data);
    }).catch((err) => {
      console.error(err);
    })
  }, [data])
  const { toast } = useToast()
  const onHandleFollow = (userId: string) => {
    clientapi.post(`/user/follow/${userId}`).then((res) => {
      toast({
        title: "follow",
        description: res.data?.message
      })
    })
  }

  return <div className='flex items-center justify-center cursor-pointer  min-w-[90%]'>
    <div className='flex gap-4 items-center p-2  w-full m-3 rounded-md '>
      <DisplayPicture username={username} width={40} height={40} />
      <div className='max-w-[90%] w-[90%]'>
        <h1 className='font-bold' title='username'>{username}</h1>
        <h3 title='info' className='text-gray-500'>{data.firstName} {data.lastName}</h3>
      </div>
      <div>
        {/* <Button onClick={() => { onHandleFollow(data._id) }} className='font-bold text-blue-500' variant={'ghost'}>Follow</Button> */}
        {username === user?.username ? <Button asChild ><Link href={'/accounts/edit'}>Edit Profile</Link></Button> : <Button variant={isFollowing ? "outline" : 'default'} onClick={() => onHandleFollow(data._id)}>{isFollowing ? "Following" : "Follow"}</Button>}
      </div>
    </div>
  </div>
}