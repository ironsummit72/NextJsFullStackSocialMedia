'use client'
import { ClapperboardIcon } from "lucide-react";
import { useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge";
type Props = {
  filename: string
  width?: number | string
  height?: number | string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}
function Video({ filename, height, width, className, autoPlay, loop, muted = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      if (autoPlay) {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [autoPlay])
  
  // Update muted state when prop changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted])
  
  const handleMouseOver = () => {
    if (!autoPlay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video on mouse over:', error)
      })
    }
  }
  
  const handleMouseLeave = () => {
    if (!autoPlay && videoRef.current) {
      videoRef.current.pause()
    }
  }
  return (
    <div className="relative">
      <ClapperboardIcon className="absolute text-white m-4" size={30} />
      <video 
        width={width} 
        height={height} 
        className={twMerge("cursor-pointer ", className)} 
        ref={videoRef} 
        onMouseOver={handleMouseOver} 
        onMouseLeave={handleMouseLeave} 
        src={`http://localhost:5002/content/stream/video/${filename}`}
        loop={loop}
        muted={muted}
        playsInline
      >
      </video>
    </div>

  )
}

export default Video