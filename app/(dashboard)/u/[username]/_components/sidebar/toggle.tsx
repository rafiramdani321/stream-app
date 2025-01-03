"use client";

import React from 'react'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Hint } from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { useSidebarDashboard } from '@/store/use-sidebar-dashboard'

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebarDashboard((state) => state);
  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className='hidden lg:flex justify-center p-3 mb-2 pt-4'>
          <Hint label={label} side='bottom' asChild>
            <Button
              onClick={onExpand}
              variant="ghost"
              size="sm"
              className='h-auto p-2'
            >
              <ArrowRightFromLine className='w-4 h-4 text-muted-foreground' />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className='flex w-full items-center p-3 pl-4 pt-4 mb-2'>
          <div className='font-semibold text-muted-foreground'>
            <p>Dashboard</p>
          </div>
          <Hint label={label} side='bottom' asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              size="sm"
              className='h-auto ml-auto p-2'
            >
              <ArrowLeftFromLine className='w-4 h-4 text-muted-foreground' />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export default Toggle