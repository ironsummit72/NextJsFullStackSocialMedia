import SuggessionCard from '@/components/custom/Cards/SuggessionCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { headers } from 'next/headers'
import { UserData } from '@/types'

export async function Suggession() {
  const headersList = await headers()
  const response=await  api.get('/profile/suggession',{headers:{cookie:headersList.get('cookie')}})
  const data=response.data
  return (
    <div className='h-screen w-auto flex flex-col items-center '>
      <div className='flex justify-between items-center w-[70%]'> <h1 className='font-bold text-gray-600'>Suggested for you</h1> <Button className='font-bold text-blue-500' variant='ghost' asChild><Link href={`/explore/people`}>See All</Link></Button></div>
      {data.data.slice(0,5).map((user:UserData)=>{
        return <SuggessionCard key={user._id} username={user.username} />
      })}
    </div>
  )
}
export default Suggession