'use client'
import {  ClapperboardIcon } from "lucide-react";
import { useRef } from "react"
type Props={
    filename:string
}
function Video({filename}:Props) {
  const videoRef=useRef<HTMLVideoElement>(null);
  const handleMouseOver=()=>{
    videoRef.current?.play()
  }
  const handleMouseLeave=()=>{
    videoRef.current?.pause()
  }
  return (
  <div className="relative">
    <ClapperboardIcon className="absolute text-white m-4" size={30}  />
     <video className="cursor-pointer " ref={videoRef} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={`http://localhost:5002/content/stream/video/${filename}`}>
     </video>
  </div>

  )
}

export default Video