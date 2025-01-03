"use client";

import { useSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null
    }
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  
  if(!data || data.length === 0){
    return null;
  }

  return (
    <>
      {!collapsed && (
        <div className="pl-5 mb-4">
          <p className="text-sm text-muted-foreground font-semibold">
            Following
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
            <UserItem
              key={user.following.id}
              username={user.following.username}
              imageUrl={user.following.imageUrl}
              isLive={user.following.stream?.isLive}
            />
        ))}
      </ul>
    </>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}