"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnFollow } from "@/actions/follow";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}

export const Actions = ({
  isFollowing, hostIdentity, isHost,
}: ActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) => toast.success(`you have unfollow ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    })
  }

  const handleClick = () => {
    if(!userId){
      return router.push("/sign-in")
    }

    if(isHost) return;

    if(isFollowing){
      handleUnfollow();
    }else{
      handleFollow();
    }
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleClick}
      variant="blueSecondary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart className={cn(
        "h-4 w-4 mr-2",
        isFollowing ? "fill-rose-500" : "fill-none"
      )} />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}