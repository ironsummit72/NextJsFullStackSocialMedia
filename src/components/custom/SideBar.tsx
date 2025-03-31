import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Bell, Compass, Home, LogOut, MessageCircle, Plus, Settings, VideotapeIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import DisplayPicture from '@/components/custom/DisplayPicture'
import CustomDropDown from './Dropdown/CustomDropDown'
import CreatePostMenu from './Dropdown/CreatePostMenu'
import CustomAlertDialog from './AlertDialog/CustomAlertDialog'
type Props={
    username:string
}
function SideBar({username}:Props) {
  return (
    <div>
        <aside>
            <div className='hidden sm:flex md:flex flex-col gap-10 h-screen fixed top-0 left-0 bg-white border border-black border p-4 md:px-8 '>
                <Link className='flex items-center gap-4' href={'/'}>
                <Image src={'/logo.png'} alt='logo' width={32} height={32} />
                <h1 className='text-2xl font-bold hidden md:block'>Snapgram</h1>
                </Link>
                <div className='flex flex-col gap-14 font-bold'>
                    <Link className='flex items-center gap-4' href={'/'}><Home /> <span className='hidden md:block'>Home</span></Link>
                    <Link className='flex items-center gap-4' href={'/explore'}><Compass/> <span className='hidden md:block'>Explore</span></Link>
                    <Link className='flex items-center gap-4' href={'/reels'}><VideotapeIcon/> <span className='hidden md:block'>Reels</span></Link>
                    <Link className='flex items-center gap-4' href={'/messages'}><MessageCircle/> <span className='hidden md:block'>Messages</span></Link>
                    <Link className='flex items-center gap-4' href={'/notifications'}><Bell/> <span className='hidden md:block'>Notifications</span></Link>
                    <CustomDropDown content={<CreatePostMenu/>}>

                    <div className='flex items-center gap-4'><Plus className='border border-2 border-black rounded-md '/> <span className='hidden md:block'>Create</span> </div>
                    </CustomDropDown>
                    <Link title='profile' className='flex items-center gap-4' href={`/${username}`}><DisplayPicture username={username} width={30} height={30}/> <span className='hidden md:block'>Profile</span></Link>
                    <Link className='flex items-center gap-4' href={'/settings'}><Settings/> <span className='hidden md:block'>Settings</span></Link>
                    <CustomAlertDialog>
                    <h1 className='flex items-center gap-4' ><LogOut/> <span className='hidden md:block'>Logout</span></h1>
                    </CustomAlertDialog>
                </div>
            </div>
            {/* top navbar */}
            <div className='md:hidden z-20 flex items-center  gap-14 fixed top-0 left-0 right-0 bg-white border shadow-lg border-1 border-x-0 p-4 md:px-8'>
                  <Link className='flex items-center gap-4' href={'/'}>
                      <h1 className='text-2xl font-bold'>Snapgram</h1>
                  </Link>
                  <Input className='w-full' placeholder='Search' />
                  <Link title='Notifications' className='flex items-center gap-4' href={'/notifications'}><Bell /> </Link>
            </div>
            {/* bottom navbar */}
            <div className='md:hidden z-20 flex items-center justify-center gap-14 fixed bottom-0 left-0 right-0 bg-white border shadow-2xl border-2 border-x-0 p-4 md:px-8'>
                <Link title='Home' className='flex items-center gap-4' href={'/'}><Home /></Link>
                <Link title='Explore' className='flex items-center gap-4' href={'/explore'}><Compass/> </Link>
                <Link title='Reels' className='flex items-center gap-4' href={'/reels'}><VideotapeIcon/> </Link>    
                <Link title='Messages' className='flex items-center gap-4' href={'/messages'}><MessageCircle/> </Link>
                <Link title='Notifications' className='flex items-center gap-4' href={'/notifications'}><Bell/> </Link>
                <Link title='Profile'  className='flex items-center gap-4' href={`/${username}`}><DisplayPicture username={username} width={30} height={30}/> </Link>
            </div>
        </aside>
    </div>
  )
}

export default SideBar