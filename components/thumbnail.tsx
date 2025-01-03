import Image from "next/image";

import { cn } from "@/lib/utils";
import UserAvatar from "./user-avatar";
import LiveBadge from "./liveBadge";
import { Skeleton } from "./ui/skeleton";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
  hover: boolean;
};

export const Thumbnail = ({
  src,
  fallback,
  isLive,
  username,
  hover,
}: ThumbnailProps) => {
  let content;

  if(!src){
    content = (
      <div className="bg-darkSecondary flex flex-col items-center justify-center h-full w-full rounded-md">
        <UserAvatar
          size="lg"
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
          ) 
  }else{
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className={cn(
          "object-cover rounded-md"
        )}
      />
    )
  }

  return (
    <div className={cn(
      "group aspect-video relative rounded-md cursor-pointer",
      hover && `border ${isLive ? "border-rose-500" : "border-bluePrimary"}` 
    )}>
      <div className="rounded-md absolute inset-0 flex items-center justify-center">
        {content}
        {isLive && src && (
          <div className="absolute top-2 left-2">
            <LiveBadge liveText={true} />
          </div>
        )}
      </div>
    </div>
  )
}

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  )
}