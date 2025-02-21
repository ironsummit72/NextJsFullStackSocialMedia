
import { getCurrentUser } from '@/lib/getCurrentUser'
import React from 'react'
 async function Home() {
  const { fullName, id, username } = await getCurrentUser()
  console.log(username, id, fullName);

  return (
    <div>

    </div>
  )
}

export default Home