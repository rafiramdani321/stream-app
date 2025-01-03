"use client";

import React from 'react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useSidebar((state) => state);
  
  return (
    <aside className={cn(
      "fixed left-0 flex flex-col bg-background z-50 w-60 border-r h-full",
      collapsed && "w-[70px]"
    )}>
      {children}
    </aside>
  )
}

export default Wrapper