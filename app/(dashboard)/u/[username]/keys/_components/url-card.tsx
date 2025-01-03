import { Input } from '@/components/ui/input'
import React from 'react'
import CopyButton from './copy-button'

interface UrlCardProps {
  value: string | null;
};

const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className='rounded-lg bg-darkSecondary p-6'>
      <div className='flex items-center gap-x-8'>
        <p className='font-semibold shrink-0'>
          Server URLs
        </p>
        <div className='space-y-2 w-full'>
          <div className='flex items-center w-full gap-x-2'>
            <Input
              value={value || ""}
              disabled
              className='bg-background rounded-lg'
              placeholder='Server URL'
            />
            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UrlCard