'use client'
import { ClapperboardIcon } from "lucide-react";
import { useRef } from "react"
import { twMerge } from "tailwind-merge";
type Props = {
  filename: string
  width?: number | string
  height?: number | string
  className?: string
}
function Video({ filename, height, width, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleMouseOver = () => {
    videoRef.current?.play()
  }
  const handleMouseLeave = () => {
    videoRef.current?.pause()
  }
  return (
    <div className="relative">
      <ClapperboardIcon className="absolute text-white m-4" size={30} />
      <video width={width} height={height} className={twMerge("cursor-pointer ", className)} ref={videoRef} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={`http://localhost:5002/content/stream/video/${filename}`}>
      </video>
    </div>

  )
}

export default Video