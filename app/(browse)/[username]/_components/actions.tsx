"use client";

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

import { onFollow, onUnFollow } from '@/actions/follow';
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { onBlock } from '@/actions/block';
import { Loader2 } from 'lucide-react';

interface ActionsProps {
  otherUserId: string;
  isFollowing: boolean;
}

const Actions = ({
  otherUserId, isFollowing,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const { userId: currentUser } = useAuth();
  const router = useRouter();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(otherUserId)
        .then((data) => toast.success(`You are now following ${data?.following.username}` || "Unknown User"))
        .catch((error) => toast.error(error.message || "Something went wrong"))
    })
  }

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(otherUserId)
        .then((data) => toast.success(`You have unfollowed ${data?.following.username}`))
        .catch((error) => toast.error(error.message || "Something went wrong"))
    })
  }

  const toggleFollow = () => {
    if(!currentUser) {
      return router.push("/sign-in");
    }

    if(isFollowing){
      handleUnFollow();
    }else {
      handleFollow();
    }
  }

  const handleBlock = () => {
    startTransition(() => {
      onBlock(otherUserId)
        .then((data) => toast.success(`Block the user ${data?.blocked.username}`))
        .catch((error) => toast.error(error.message || "Something went wrong"))
    });
  }

  const toggleBlock = () => {
    if(!currentUser){
      return router.push("/sign-in");
    }
    handleBlock();
  }

  return (
    <div className='flex gap-x-4'>
      <Button
          disabled={isPending}
          onClick={toggleFollow}
          variant="blueSecondary"
          className='mt-4'
        >
          {isPending ?
            <Loader2 className='animate-spin' /> 
            :
            isFollowing ? "unfollow" : "Follow"
          }
      </Button>

      <Button
          disabled={isPending}
          onClick={toggleBlock}
          variant="bluePrimary"
          className='mt-4'
        >
          {"Block"}
      </Button>

    </div>
  )
}

export default Actions