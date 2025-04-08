'use client'
import '@/app/globals.css'
import SideBar from '@/components/custom/SideBar'
import { Toaster } from '@/components/ui/toaster'
import ProfileInfo from './components/ProfileInfo'
import { getCurrentUserClient } from '@/lib/getCurrentUserClient'
import { useEffect, useState } from 'react'
import { USER } from '@/types'
import { usePathname } from 'next/navigation'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode

}) {
  const [user, setUser] = useState<USER | null>(null);
  const pathname = usePathname().split('/')[1]
  useEffect(() => {
    getCurrentUserClient().then((res) => {
      setUser(res);
    }).catch((error) => {
      setUser(null);
      console.error(error);

    })
  }, [])

  return (
    <html lang="en">
      <body>
        <div className="grid grid-rows-[80px_1fr] md:grid-cols-[250px_1fr]">
          <SideBar username={user?.username!} />
          <div className="md:grid md:grid-cols-[80vw_1fr]">
            <ProfileInfo username={pathname} stories={<></>} poststab={children} />
            <div className="hidden md:block">
            </div>
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
