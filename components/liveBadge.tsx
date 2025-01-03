import { cn } from '@/lib/utils';
import { Radio } from 'lucide-react';
import React from 'react'

interface LiveBadeProps {
  className?: string;
  liveText?: boolean;
}

const LiveBadge = ({ className, liveText }: LiveBadeProps) => {
  return (
    <>
      {liveText ? (
        <div>
          <div className='bg-rose-500 border border-background px-0.5 rounded-sm'>
            <p className='text-xs tracking-tight'>
              Live
            </p>
          </div>
        </div>
      ) : (
        <div className={className}>
          <Radio className='w-4 r-4 text-red-500' />
        </div>
      )}
    </>
  )
}

export default LiveBadge;