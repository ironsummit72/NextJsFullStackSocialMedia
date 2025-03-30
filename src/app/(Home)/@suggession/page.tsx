import SuggessionCard from '@/components/custom/Cards/SuggessionCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

function Suggession() {
  return (
    <div className='h-screen w-auto flex flex-col items-center '>
      <div className='flex justify-between items-center w-[70%]'> <h1 className='font-bold text-gray-600'>Suggested for you</h1> <Button className='font-bold text-blue-500' variant='ghost' asChild><Link href={`/explore/people`}>See All</Link></Button></div>
      <SuggessionCard username='paola' />
      <SuggessionCard username='neha' />
    </div>
  )
}

export default Suggession