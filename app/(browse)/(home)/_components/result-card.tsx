"use client";

import { useState } from "react";
import Link from "next/link"
import { User } from "@prisma/client"

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail"
import UserAvatar, { UserAvatarSkeleton } from "@/components/user-avatar"

interface ResultCardProps {
  data: {
    user: User,
    isLive: boolean,
    name: string,
    thumbnailUrl: string | null,
  }
};

export const ResultCard = ({ data }: ResultCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/${data.user.username}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="h-full w-full space-y-3"
      >
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
          hover={isHovered}
        />
        <div className="flex gap-x-3 px-1">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className={cn(
              "truncate font-semibold",
              isHovered && "text-bluePrimary"
            )}>
              {data.name}
            </p>
            <p className="text-muted-foreground">
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  )
}