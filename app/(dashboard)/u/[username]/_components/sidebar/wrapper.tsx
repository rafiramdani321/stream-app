"use client";

import React from 'react'
import { cn } from '@/lib/utils'

import { useSidebarDashboard } from '@/store/use-sidebar-dashboard'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useSidebarDashboard((state) => state);
  
  return (
    <aside className={cn(
      "fixed left-0 flex-col bg-background z-50 w-60 border-r h-full",
      collapsed && "w-[70px]"
    )}>
      {children}
    </aside>
  )
}

export default Wrapper