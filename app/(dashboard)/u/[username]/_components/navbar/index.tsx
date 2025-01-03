import React from 'react'
import Logo from './logo'
import Actions from './actions'

const NavbarDashboard = () => {
  return (
    <nav className='fixed top-0 w-full bg-background h-20 z-[49] px-2 lg:px-4 flex justify-between items-center shadow-sm border-b'>
      <Logo />
      <Actions />
    </nav>
  )
}

export default NavbarDashboard