"use client";

import { Info } from "lucide-react";
import { useMemo } from "react";

import { Hint } from "../Hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
    const hint = useMemo(() => {
    if(isFollowersOnly && !isDelayed){
      return "Only followers can chat";
    }

    if(isDelayed && !isFollowersOnly){
      return "Messages are delayed by 3 seconds";
    }

    if(isDelayed && isFollowersOnly){
      return "Only followers can chat. Messages are delayed by 3 seconds";
    }

    return "";
  }, [isDelayed, isFollowersOnly])

  const label = useMemo(() => {
    if(isFollowersOnly && !isDelayed){
      return "Followers only";
    }

    if(isDelayed && !isFollowersOnly){
      return "Slow mode";
    }

    if(isDelayed && isFollowersOnly){
      return "Followers only and slow mode";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if(!isDelayed && !isFollowersOnly){
    return null;
  }

  return (
    <div className="flex gap-x-2 p-2 text-muted-foreground border bg-white/5 border-white/10 w-full rounded-t-md items-center">
      <Hint label={hint} asChild>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">
        {label}
      </p>
    </div>
  )
}