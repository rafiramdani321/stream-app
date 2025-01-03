import LiveBadge from "@/components/liveBadge";
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import Link from "next/link"
import { usePathname } from "next/navigation";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserItem = ({
  username,
  imageUrl,
  isLive,
}: UserItemProps) => {
  const { collapsed } = useSidebar((state) => state);
  const pathName = usePathname();
  const href = `/${username}`;

  const isActive = pathName === href;

  return (
    <Link 
      href={href}
      className="w-full"
    >
      <Button
        variant="ghost"
        className={cn(
          "flex w-full h-12 mb-2",
          isActive && "bg-darkSecondary"
        )}
      >
        <div className={cn(
          "flex items-center justify-start w-full gap-x-4",
          collapsed && "justify-center"
        )}>
          <UserAvatar
            username={username}
            imageUrl={imageUrl}
            isLive={isLive}
          />
          {!collapsed && (
            <div className="w-40 truncate flex">
              <p className="truncate tracking-wide font-normal">{username}</p>
            </div>
          )}
          {!collapsed && isLive && (
            <LiveBadge />
          )}
        </div>
      </Button>
    </Link>
  )
}

export const UserItemSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </div>
  )
}