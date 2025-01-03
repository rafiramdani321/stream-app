"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useSidebar } from "@/store/use-sidebar"
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/Hint";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse"

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full justify-center items-center pt-4 mb-4">
          <Hint label={label} side="bottom" asChild>
            <Button
              onClick={onExpand}
              variant="ghost"
              size="sm"
              className="h-auto p-2"
            >
              <ArrowRightFromLine className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="flex w-full items-center p-3 pl-5 pt-4 mb-2">
          <div className="font-semibold tracking-wide">
            <p>For you</p>
          </div>
          <Hint label={label} side="bottom" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              size="sm"
              className="h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export const ToggleSkeleton = () => {
  return (
    <div className="hidden lg:flex p-3 pl-4 mb-2 items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  )
}