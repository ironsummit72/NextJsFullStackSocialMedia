import Link from 'next/link'
import React from 'react'

function Explore() {
  return (
    <div className='flex flex-col'>
      <h1>Explore Page</h1>
      <Link href={'/post/1'}>Post 1</Link>
      <Link href={'/post/2'}>Post 2</Link>
      <Link href={'/post/3'}>Post 3</Link>
    </div>
  )
}

export default Explore