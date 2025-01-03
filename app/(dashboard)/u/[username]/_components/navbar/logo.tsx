import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/">
      <div className='flex lg:flex items-center gap-x-4 hover:opacity-75 transition'>
        <div className='rounded-full bg-bluePrimary p-1 lg:mr-0 shrink-0 lg:shrink'>
          <Image
            src="/game.svg"
            height="32"
            width="32"
            alt='Game'
          />
        </div>
        <div className=''>
          <p className='text-xl font-semibold'>StreamApp</p>
          <p className='text-xs text-muted-foreground tracking-tight font-semibold'>Dashboard Creator</p>
        </div>
      </div>
    </Link>
  )
}

export default Logo