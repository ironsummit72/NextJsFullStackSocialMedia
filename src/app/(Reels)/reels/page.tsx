'use client'
import { clientapi } from '@/lib/api';
import { PostData } from '@/types';
import { InView } from 'react-intersection-observer'
import React, { useEffect, useRef, useState } from 'react'
import Spinner from '@/components/custom/Spinner';
import Video from '@/components/custom/Video';
import { Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DisplayPicture from '@/components/custom/DisplayPicture';

// Add CSS for reel transition animation
const reelTransitionStyle = `
  @keyframes reelFadeIn {
    0% { opacity: 0.5; transform: scale(0.98); }
    100% { opacity: 1; transform: scale(1); }
  }
  
  .reel-transition {
    animation: reelFadeIn 0.5s ease-out;
  }
`;


function ReelsPage() {
  const [data, setData] = useState<PostData[]>([])
  const [page, setPage] = useState<number>(2);
  const [endPage, setEndPage] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<{[key: string]: boolean}>({})
  const [isSaved, setIsSaved] = useState<{[key: string]: boolean}>({})
  const [activeReels, setActiveReels] = useState<{[key: string]: boolean}>({})
  const [mutedReels, setMutedReels] = useState<{[key: string]: boolean}>({})
  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>({})
  const [globalMuted, setGlobalMuted] = useState<boolean>(true)
  
  // Load mute state from localStorage on component mount
  useEffect(() => {
    const savedMuteState = localStorage.getItem('reelsMuted')
    if (savedMuteState !== null) {
      const isMuted = savedMuteState === 'true'
      setGlobalMuted(isMuted)
      
      // Apply to all existing reels
      setMutedReels(prev => {
        const newState = {...prev}
        Object.keys(newState).forEach(key => {
          newState[key] = isMuted
        })
        return newState
      })
    }
  }, [])

  useEffect(() => {
    async function fetchReels(page: number) {
      try {
        const response = await clientapi.get(`/post/personalized/reels?limit=5&page=${page}`)
        setData(response.data.data.postsResponse)
        setEndPage(response.data.data.endPage)
        
        // Set the first reel as active initially
        if (response.data.data.postsResponse.length > 0 && page === 1) {
          setActiveReels({ [response.data.data.postsResponse[0]._id]: true })
        }
      } catch (error) {
        console.error('Error fetching reels:', error)
      }
    }
    fetchReels(1)
  }, [])

  const handleLike = async (postId: string) => {
    try {
      await clientapi.patch(`/post/like/${postId}`)
      setIsLiked(prev => ({ ...prev, [postId]: !prev[postId] }))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleSave = async (postId: string) => {
    try {
        await clientapi.patch(`/post/save/${postId}`)
      setIsSaved(prev => ({ ...prev, [postId]: !prev[postId] }))
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  useEffect(() => {
    // Check like and save status for each reel
    data.forEach(async (reel) => {
      try {
        const isLikedResponse = await clientapi.get(`/post/isliked/${reel._id}`)
        const isSavedResponse = await clientapi.get(`/post/issaved/${reel._id}`)
        
        setIsLiked(prev => ({ ...prev, [reel._id]: isLikedResponse.data.data }))
        setIsSaved(prev => ({ ...prev, [reel._id]: isSavedResponse.data.data }))
      } catch (error) {
        console.error('Error checking post status:', error)
      }
    })
  }, [data])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Find the currently active reel
      const activeReelId = Object.keys(activeReels).find(id => activeReels[id]);
      if (!activeReelId) return;
      
      // Find the index of the active reel
      const activeIndex = data.findIndex(reel => reel._id === activeReelId);
      if (activeIndex === -1) return;
      
      // Handle down arrow key - go to next reel
      if (event.key === 'ArrowDown') {
        if (activeIndex >= data.length - 1) return; // Already at last reel
        
        // Get the next reel
        const nextReel = data[activeIndex + 1];
        if (!nextReel) return;
        
        // Update active reels - pause current and play next
        setActiveReels(prev => ({
          ...prev,
          [activeReelId]: false,
          [nextReel._id]: true
        }));
        
        // Jump to the next reel instantly
        const nextReelElement = document.getElementById(`reel-${nextReel._id}`);
        if (nextReelElement) {
          nextReelElement.scrollIntoView({ behavior: 'auto' });
          
          // Add animation effect to the next reel
          nextReelElement.classList.add('reel-transition');
          setTimeout(() => {
            nextReelElement.classList.remove('reel-transition');
          }, 500);
        }
      }
      
      // Handle up arrow key - go to previous reel
      if (event.key === 'ArrowUp') {
        if (activeIndex <= 0) return; // Already at first reel
        
        // Get the previous reel
        const prevReel = data[activeIndex - 1];
        if (!prevReel) return;
        
        // Update active reels - pause current and play previous
        setActiveReels(prev => ({
          ...prev,
          [activeReelId]: false,
          [prevReel._id]: true
        }));
        
        // Jump to the previous reel instantly
        const prevReelElement = document.getElementById(`reel-${prevReel._id}`);
        if (prevReelElement) {
          prevReelElement.scrollIntoView({ behavior: 'auto' });
          
          // Add animation effect to the previous reel
          prevReelElement.classList.add('reel-transition');
          setTimeout(() => {
            prevReelElement.classList.remove('reel-transition');
          }, 500);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, activeReels]);

  // Handle video visibility when it comes into view
  const handleIntersection = (inView: boolean, reelId: string) => {
    setActiveReels(prev => ({
      ...prev,
      [reelId]: inView
    }))
    
    // Set default state for new reels
    if (inView) {
      setMutedReels(prev => ({
        ...prev,
        [reelId]: prev[reelId] !== undefined ? prev[reelId] : globalMuted
      }))
      
      setIsPlaying(prev => ({
        ...prev,
        [reelId]: true
      }))
    }
  }
  
  // Toggle mute/unmute for all reels
  const toggleMute = (reelId: string) => {
    // Get the new mute state (opposite of current reel's state)
    const newMuteState = !mutedReels[reelId]
    
    // Save to localStorage
    localStorage.setItem('reelsMuted', String(newMuteState))
    
    // Update global mute state
    setGlobalMuted(newMuteState)
    
    // Apply to all reels
    setMutedReels(prev => {
      const newState = {...prev}
      Object.keys(newState).forEach(key => {
        newState[key] = newMuteState
      })
      return newState
    })
  }
  
  // Toggle play/pause for a specific reel
  const togglePlay = (reelId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }))
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-black">
      {/* Add style tag for animations */}
      <style dangerouslySetInnerHTML={{ __html: reelTransitionStyle }} />
      {data.length > 0 ? (
        <div className="w-full max-w-full md:max-w-md mx-auto bg-black" style={{backgroundColor: 'black'}}>
          {data.map((reel) => (
            <InView
              key={reel._id}
              as="div"
              id={`reel-${reel._id}`}
              threshold={0.7}
              onChange={(inView) => handleIntersection(inView, reel._id)}
              className="h-[100vh] w-full snap-start snap-always bg-black"
              style={{backgroundColor: 'black'}}
            >
              <div className="relative h-full w-full bg-black" style={{backgroundColor: 'black'}}>
                {/* Video */}
                <div className="h-full w-full flex items-center justify-center bg-black" style={{backgroundColor: 'black'}}>
                  <div 
                    className="h-full w-full relative" 
                    onClick={() => togglePlay(reel._id)}
                  >
                    {reel.content && reel.content[0] && (
                      <Video 
                        filename={reel.content[0].filename} 
                        className="h-full w-full object-cover"
                        autoPlay={activeReels[reel._id] && isPlaying[reel._id]}
                        loop
                        muted={mutedReels[reel._id]}
                      />
                    )}
                  </div>
                  
                  {/* Play/Pause and Mute/Unmute controls */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
                    {activeReels[reel._id] && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-black/50 hover:bg-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay(reel._id);
                        }}
                      >
                        {isPlaying[reel._id] ? (
                          <Pause className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        ) : (
                          <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="white" />
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {/* Sound control button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(reel._id);
                    }}
                  >
                    {mutedReels[reel._id] ? (
                      <VolumeX className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    ) : (
                      <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    )}
                  </Button>
                </div>
                
                {/* Overlay controls */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black to-transparent">
                  {/* User info */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <DisplayPicture 
                      username={reel.user?.username || ''} 
                      width={32} 
                      height={32} 
                    />
                    <Link href={`/${reel.user?.username}`} className="text-white font-bold text-sm sm:text-base">
                      {reel.user?.username}
                    </Link>
                  </div>
                  
                  {/* Caption */}
                  <p className="text-white mb-2 sm:mb-4 text-xs sm:text-sm line-clamp-2">{reel.caption}</p>
                  
                  {/* Action buttons */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 sm:gap-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 sm:h-9 sm:w-9 rounded-full" 
                        onClick={() => handleLike(reel._id)}
                      >
                        <Heart className={`h-4 w-4 sm:h-6 sm:w-6 ${isLiked[reel._id] ? "fill-red-500 text-red-500" : "text-white"}`} />
                      </Button>
                      
                      <Button asChild variant="ghost" size="icon" className="h-7 w-7 sm:h-9 sm:w-9 rounded-full">
                          <Link href={`/post/${reel._id}`}>
                            <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                          </Link>
                        </Button>
                      
                      <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-9 sm:w-9 rounded-full">
                          <Share2 className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 sm:h-9 sm:w-9 rounded-full" 
                        onClick={() => handleSave(reel._id)}
                      >
                        <Bookmark className={`h-4 w-4 sm:h-6 sm:w-6 ${isSaved[reel._id] ? "fill-white text-white" : "text-white"}`} />
                      </Button>
                  </div>
                </div>
              </div>
            </InView>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <Spinner />
          <p className="text-white mt-4">Loading reels...</p>
        </div>
      )}
      
      {/* Load more reels */}
      {endPage >= page && (
        <InView 
          as="div" 
          className="h-10 w-full"
          threshold={0.5}
          onChange={async (inView) => {
            if (inView && endPage >= page) {
              try {
                const response = await clientapi.get(`/post/personalized/reels?limit=5&page=${page}`)
                setData(prev => [...prev, ...response.data.data.postsResponse])
                setPage(prev => prev + 1)
              } catch (error) {
                console.error('Error loading more reels:', error)
              }
            }
          }}
        />
      )}
    </div>
  )
}

export default ReelsPage