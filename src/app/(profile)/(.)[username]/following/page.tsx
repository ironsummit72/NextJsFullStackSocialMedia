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
import { InView } from 'react-intersection-observer'
import Spinner from '@/components/custom/Spinner'



function Following() {
  const pathname = usePathname().split('/')[1];
  const [data, setData] = useState<UserData[]>([])
  const [page, setPage] = useState<number>(2);
  const [endPage, setEndPage] = useState<number>(0)


  const router = useRouter()
  const onHandleClose = () => {
    router.back()
  }

  async function fetchData(pageNumber: number) {
    const response = await clientapi.get(`/profile/following/${pathname}?page=${pageNumber}&limit=10`)
    console.log('followers data', response.data.data);
    setData(response.data.data.dbResponse.following)
    setEndPage(response.data.data.endPage)
  }
  useEffect(() => {
    fetchData(1);
  }, [])

  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={onHandleClose} >
      <DialogContent className='overflow-y-auto'>
        <DialogTitle className='text-center'><span className='text-lg font-bold'>Followers</span></DialogTitle>
        <div className='flex flex-col w-full items-center'>
          {data?.map((userdata) => {
            return <HoverCardProfile key={userdata._id} username={userdata.username}>
              <Link href={`/${userdata.username}`} className='w-[90%]'>
                <Content username={userdata.username} data={userdata} />
              </Link>
            </HoverCardProfile>
          })}
          <InView as={'div'} onChange={async () => {
            if (endPage >= page) {
              const response = await clientapi.get(`/profile/following/${pathname}?page=${page}&limit=10`)
              setData((data) => [...data!, ...response.data.data.dbResponse.following])
              setPage((page) => page + 1)
            }
          }}>
          </InView>
          <div className='w-full flex items-center  justify-center gap-3'>
            {page >= endPage ? <h1>{`that's all folks ${endPage}`}</h1> : <>
              <Spinner />
              <h1>loading...</h1>
            </>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default Following
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