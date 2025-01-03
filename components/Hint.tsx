import React from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export const Hint = ({
  label, children, asChild, side, align,
}: HintProps) => {
  return (
  <TooltipProvider>
      <Tooltip delayDuration={1}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            "text-white bg-black rounded-sm z-[999] border border-bluePrimary",
            side === "bottom" && "mt-3",
            side === "top" && "mb-3"
          )}
          side={side}
          align={align}
        >
          <p className="font-semibold text-[11px] p-1.5">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}