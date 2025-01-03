"use client";

import React from 'react'
import { LucideIcon } from "lucide-react";
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebarDashboard } from '@/store/use-sidebar-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

interface NavItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

const NavItem = ({ 
  title, href, icon: Icon, isActive,
 }: NavItemProps) => {
  const { collapsed } = useSidebarDashboard((state) => state);

  return (
    <Link 
      href={href}
      className='flex'  
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full h-12",
          collapsed ? "justify-center" : "justify-start gap-x-4",
          isActive && "bg-darkSecondary"
        )}
      >
        <Icon className={cn(
          "text-muted-foreground h-6 w-6",
          isActive && "text-primary"
        )} />
        {!collapsed && (
          <p className='font-semibold text-sm'>{title}</p>
        )}
      </Button>
    </Link>
  )
}

export default NavItem

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}