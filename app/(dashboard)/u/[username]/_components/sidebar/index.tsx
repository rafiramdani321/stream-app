"use client";

import React from 'react'
import Wrapper from './wrapper'
import Toggle from './toggle'
import { Navigations, NavigationsSkeleton } from './navigations'
import { useUser } from '@clerk/nextjs'

const SidebarDashboard = () => {
  const { user } = useUser();

  if(!user?.username){
    return (
      <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r'>
        <NavigationsSkeleton />
      </aside>                
    )
  }
  
  return (
    <Wrapper>
      <Toggle />
      <Navigations />
    </Wrapper>
  )
}

export default SidebarDashboard