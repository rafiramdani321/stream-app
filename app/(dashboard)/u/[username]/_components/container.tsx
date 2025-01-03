"use client";

import React, { useEffect } from "react";

import { useSidebarDashboard } from "@/store/use-sidebar-dashboard";
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebarDashboard((state) => state);

  useEffect(() => {
    if(matches){
      onCollapse();
    }else{
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn(
      "flex-1",
      collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
    )}>
      {children}
    </div>
  )
}