import React from 'react'
import { notFound } from 'next/navigation';

import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { isBlockingUser } from '@/lib/block-service';
import StreamPlayer from '@/components/stream-player';

interface UserPageProps {
  params: {
    username: string;
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  
  if(!user || !user.stream) {
    return notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingUser(user.id);

  if(isBlocking){
    return notFound();
  }

  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  )
}

export default UserPage