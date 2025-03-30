import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import HoverCardContentProfile from './Contents/HoverCardContentProfile'
type Props = {
    children: React.ReactNode,
    username: string
}
function HoverCardProfile({ children, username }: Props) {
    return (
        <HoverCard >
            <HoverCardTrigger asChild>{children}</HoverCardTrigger>
            <HoverCardContent className='w-[25vw] min-h-[40vh]'>
                <HoverCardContentProfile username={username} />
            </HoverCardContent>
        </HoverCard>
    )
}

export default HoverCardProfile



