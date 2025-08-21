'use client'
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card'
import { clientapi } from '@/lib/api'
import { getCurrentUser } from '@/lib/getCurrentUser'
import Image from 'next/image'
import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import { USER } from '@/types'
import DisplayPicture from '@/components/custom/DisplayPicture'
import Link from 'next/link'
type followingData = {
  id: string,
  username: string
}
function Stories() {

  const [user, setUser] = useState<USER | null>(null)
  useEffect(() => {
    getCurrentUserClient().then((res) => {
      setUser(res)
    })
  }, [])


  const [followingdata, setFollowingData] = useState<followingData[]>([]);
  const [stories, setStories] = useState<string[]>([]);
  console.log(stories);




  useEffect(() => {
    function fetchData() {
      clientapi.get(`/profile/following/${user?.username}`).then((data) => {
        setFollowingData(data.data.data?.following);
      })
    }
    fetchData()
  }, [user])

  useEffect(() => {
    followingdata?.map(async (data) => {
      if (await UserHasStory(data.username)) {
        setStories((stories) => [...stories, data.username])
      }
    })

  }, [followingdata])


  async function UserHasStory(username: string) {
    const data = (await clientapi.get(`story/hasstory/${username}`)).data.data;
    if (data) { return username }
  }

  return (
    <div><Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {/* {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
        {/* {followingdata?.map((data) => {
          return <CarouselItem key={data.id} className="md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{data.username.charAt(0).toUpperCase()}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        })} */}
        {stories?.map((data) => {
          return <CarouselItem key={data} className="md:basis-1/2 lg:basis-1/5">
            <div className="flex items-center justify-center">
              <StoryDP username={data} />
            </div>
          </CarouselItem>
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel></div>
  )
}

export default Stories




function StoryDP({ username }: { username: string }) {

  return <Link href={`/stories/${username}`}>
    <DisplayPicture username={username} width={500} height={500} />
  </Link>
}