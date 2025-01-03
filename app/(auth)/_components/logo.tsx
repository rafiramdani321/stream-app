import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex flex-col items-center gap-y-4'>
      <div className='bg-bluePrimary rounded-full p-1'>
        <Image
          src="/game.svg"
          width="75"
          height="75"
          alt='LogoGame'
        />
      </div>
      <div>
        <p className='text-2xl font-semibold'>StreamApp</p>
      </div>
    </div>
  )
}

export default Logo