import React from 'react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clapperboard } from 'lucide-react'

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className='flex items-center justify-end ml-4 lg:ml-0'>
      {!!user ? (
        <div className='flex items-center gap-x-4'>
          <Button
            variant="blueSecondary"
            size="sm"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className='h-5 w-5' />
              <p className='hidden lg:block lg:ml-2'>Dashboard</p>
            </Link>
          </Button>
          <UserButton />
        </div>
      ) : (
        <SignInButton>
          <Button
            variant="blueSecondary"
            size="sm"
          >
            Login
          </Button>
        </SignInButton>
      )}
    </div>
  )
}

export default Actions