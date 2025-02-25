import React from 'react'

type Props={
    params:{username:string}
}
function page({params}:Props) {
  return (
    <div>profile {params.username}</div>
  )
}

export default page