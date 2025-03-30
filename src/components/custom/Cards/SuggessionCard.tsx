import React from 'react'
import DisplayPicture from '../DisplayPicture'
import { Button } from '@/components/ui/button'
import HoverCardProfile from '../HoverCard/HoverCardProfile'

type Props = { username: string }
function SuggessionCard({ username }: Props) {
    return (
        <HoverCardProfile username={username}>

            <div className='flex items-center justify-center cursor-pointer'>
                <div className='flex gap-4 items-center p-2  w-full m-3 rounded-md'>
                    <DisplayPicture username={username} width={40} height={40} />
                    <div className='max-w-[90%] w-[90%]'>
                        <h1 className='font-bold' title='username'>{username}</h1>
                        <h3 title='info' className='text-gray-500'>{'Suggested for you'}</h3>
                    </div>
                    <div>
                        <Button className='font-bold text-blue-500' variant={'ghost'}>Follow</Button>
                    </div>
                </div>
            </div>
        </HoverCardProfile>
    )
}

export default SuggessionCard