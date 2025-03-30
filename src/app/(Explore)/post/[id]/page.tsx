import React from 'react'
type Props={
    params:Promise<{id:string}>
}
async function page({params}:Props) {
    const {id}=await params
  return (
    <div> post {id}</div>
  )
}

export default page