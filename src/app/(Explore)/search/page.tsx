'use client'

import { clientapi } from '@/lib/api'
import { UserData } from '@/types'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import DisplayPicture from '@/components/custom/DisplayPicture'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''
  
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<UserData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    } else {
      setIsLoading(false)
    }
  }, [initialQuery])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        // Update URL with search query
        const params = new URLSearchParams()
        params.set('q', searchTerm)
        router.push(`/search?${params.toString()}`)
        
        handleSearch(searchTerm)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, router])

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsLoading(false)
      return
    }
    
    setIsSearching(true)
    setIsLoading(true)
    
    try {
      const response = await clientapi.get(`/user/search/${query}`)
      setSearchResults(response.data.data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
      setIsLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSearchResults([])
    router.push('/search')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Search Users</h1>
      
      <div className="flex items-center relative mb-8 max-w-md">
        <Input
          placeholder="Search by username or full name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-8"
        />
        {searchTerm ? (
          <X
            className="absolute right-2 h-4 w-4 text-gray-500 cursor-pointer"
            onClick={clearSearch}
          />
        ) : (
          <Search className="absolute right-2 h-4 w-4 text-gray-500" />
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((user) => (
            <Link 
              href={`/${user.username}`} 
              key={user._id}
            >
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <DisplayPicture username={user.username} width={60} height={60} />
                <div>
                  <p className="font-semibold text-lg">{user.username}</p>
                  <p className="text-gray-600">{user.firstName} {user.lastName}</p>
                  {user.bio && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{user.bio}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : searchTerm && !isSearching ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found matching &quot;{searchTerm}&quot;</p>
          <p className="text-gray-400 mt-2">Try searching with a different name or username</p>
        </div>
      ) : null}
      
      {!searchTerm && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Enter a username or name to search</p>
        </div>
      )}
    </div>
  )
}