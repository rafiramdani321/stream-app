import StreamPlayer from '@/components/stream-player';
import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

interface CreatorPageProps {
  params: { username: string }
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username)

  if(!user || user.externalUserId !== externalUser?.id || !user.stream){
    throw new Error("Unauthorized");
  }

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className='h-full'>
      <StreamPlayer 
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
    </div>
  )
}

export default CreatorPage