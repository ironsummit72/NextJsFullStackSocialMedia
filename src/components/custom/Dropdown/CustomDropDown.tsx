import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
type Props = {
    children: React.ReactNode
    content: React.ReactNode
}
export default function CustomDropDown({ children, content }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {content}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
