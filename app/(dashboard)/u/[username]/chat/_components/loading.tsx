import React from 'react'
import { ToggleCardSkeleton } from './toggle-card'
import { Skeleton } from '@/components/ui/skeleton'

const ChatLoading = () => {
  return (
    <div className='p-5 space-y-4'>
      <Skeleton className='h-10 w-[200px]' />
      <div className='space-y-2'>
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}

export default ChatLoading