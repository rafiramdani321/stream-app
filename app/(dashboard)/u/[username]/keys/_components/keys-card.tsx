"use client";

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CopyButton from './copy-button';
import { Eye, EyeOff, HistoryIcon } from 'lucide-react';

interface KeysCardProps {
  value: string | null;
}

const KeysCard = ({ value }: KeysCardProps) => {
  const [hidden, setIsHidden] = useState(true);

  const Icon = hidden ? EyeOff : Eye;

  return (
    <div className='rounded-lg bg-darkSecondary p-6'>
      <div className='flex items-center gap-x-8'>
        <p className='font-semibold shrink-0'>
          Stream Key
        </p>
        <div className='space-y-2 w-full'>
          <div className='flex items-center w-full gap-x-2'>
            <Input
              type={hidden ? "password" : "text"}
              value={value || ""}
              disabled
              className='bg-background rounded-lg'
              placeholder='Stream Key'
            />
            {value && (
              <Icon 
                onClick={() => setIsHidden(!hidden)} 
                className='h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary' />
            )}
            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeysCard