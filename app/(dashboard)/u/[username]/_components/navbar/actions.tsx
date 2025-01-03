import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Actions = async () => {
  return (
    <div className='flex gap-x-4'>
      <div>
          <Button
            variant="blueSecondary"
            size="sm"
            asChild
          >
            <Link href="/">
              <LogOut className='w-5 h-5 font-normal lg:mr-2 mr-0' />
              <p className='hidden lg:block'>Exit</p>
            </Link>
          </Button>
      </div>
      <UserButton />
    </div>
  )
}

export default Actions