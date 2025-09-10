import "../globals.css"
import SideBar from '@/components/custom/SideBar'
import { Toaster } from '@/components/ui/toaster'
import { getCurrentUser } from '@/lib/getCurrentUser'

export const metadata = {
  title: 'Reels | Snapgram',
  description: 'Watch and share short videos on Snapgram',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  const username = user?.username || ''
  
  return (
    <html lang="en">
      <body>
        <div className="grid grid-rows-[60px_1fr] md:grid-rows-[80px_1fr] md:grid-cols-[250px_1fr]">
          <SideBar username={username}/>
          <div className="w-full md:grid md:grid-cols-[1fr] bg-black">
            {children}
          </div>
          <Toaster/>
        </div>
      </body>
    </html>
  )
}
