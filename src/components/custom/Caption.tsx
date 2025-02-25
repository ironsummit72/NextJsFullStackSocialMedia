'use client'
import React from 'react'
import { FormField,FormItem,FormControl,FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
type Props={
    username:string,
    form:any
}
function Caption({username,form}:Props) {
    const handleOnKeyUp=(e:React.KeyboardEvent)=>{
        console.log((e.target as HTMLInputElement).value);
        const value=(e.target as HTMLInputElement).value;
        const cursorPos=(e.target as HTMLInputElement).value;
    }
  return (
    <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea onKeyUp={handleOnKeyUp}
                    placeholder={`What's on Your Mind ${username} ?`}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  )
}

export default Caption