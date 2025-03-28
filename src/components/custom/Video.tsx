'use client'
import { VideoIcon } from "lucide-react";
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
    <VideoIcon className="absolute text-white m-4" size={40} />
     <video className="cursor-pointer " ref={videoRef} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={`http://localhost:5002/content/stream/video/${filename}`}>
     </video>
  </div>

  )
}

export default Video