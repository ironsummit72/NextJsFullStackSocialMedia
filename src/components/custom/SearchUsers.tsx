'use client'

import { clientapi } from '@/lib/api'
import { UserData } from '@/types'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import DisplayPicture from './DisplayPicture'
import Link from 'next/link'
import { Button } from '../ui/button'

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<UserData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        handleSearch()
      } else {
        setSearchResults([])
      }
    }, 700)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setIsSearching(true)
    try {
      const response = await clientapi.get(`/user/search/${searchTerm}`)
      setSearchResults(response.data.data)
      setShowResults(true)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSearchResults([])
    setShowResults(false)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center relative">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
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

      {showResults && searchResults.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {searchResults.map((user) => (
            <Link 
              href={`/${user.username}`} 
              key={user._id}
              onClick={() => setShowResults(false)}
            >
              <div className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer">
                <DisplayPicture username={user.username} width={40} height={40} />
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.firstName} {user.lastName}</p>
                </div>
              </div>
            </Link>
          ))}
          <Link 
            href={`/search?q=${encodeURIComponent(searchTerm)}`}
            onClick={() => setShowResults(false)}
            className="block text-center py-2 text-blue-500 hover:bg-gray-100 border-t border-gray-200"
          >
            See all results
          </Link>
        </div>
      )}

      {showResults && searchResults.length === 0 && searchTerm && !isSearching && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center">
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  )
}

export default SearchUsers