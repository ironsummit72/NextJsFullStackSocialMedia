
import { getCurrentUser } from '@/lib/getCurrentUser'
import Link from 'next/link';

import React from 'react'
async function Home() {
  const { fullName, id, username } = await getCurrentUser()
  console.log(username, id, fullName);

  return (
    <div className='flex flex-col gap-4 text-blue-500'>
      <Link href={'/post/1'}>Post 1</Link>
      <Link href={'/post/2'}>Post 2</Link>
      <Link href={'/post/3'}>Post 3</Link>
    </div>
  )
}

export default Home