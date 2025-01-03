import React from 'react'

import ChatToggle from './chat-toggle'
import { VariantToggle } from './variant-toggle'
import { Skeleton } from '../ui/skeleton'

const ChatHeader = () => {
  return (
    <div className='relative p-3 border-b'> 
      <div className='absolute left-2 top-2 hidden lg:block'>
        <ChatToggle />
      </div>
      <div className='text-center text-sm font-semibold'>
        Stream Chat
      </div>
      <div className='absolute right-2 top-2'>
        <VariantToggle />
      </div>
    </div>
  )
}

export default ChatHeader

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-3 top-3" />
      <Skeleton className="w-28 h-6 mx-auto" />
    </div>
  )
}