import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service';
import React, { Suspense } from 'react'
import ToggleCard from './_components/toggle-card';
import ChatLoading from './_components/loading';

const PageChat = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if(!stream) throw new Error("Stream not found");

  return (
    <div className='p-5'>
      <div className='mb-4'>
        <h1 className='font-semibold text-2xl'>
          Chat Settings
        </h1>
      </div>
      <div className='space-y-2'>
        <ToggleCard
          field="isChatEnabled"
          label="Enabled chat"
          value={stream.isChatEnabled}         
        />
        <ToggleCard
          field="isChatDelayed"
          label="Chat delayed"
          value={stream.isChatDelayed}         
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Followers only"
          value={stream.isChatFollowersOnly}         
        />
      </div>
    </div>
  )
}

const PageChatWithSuspense = () => {
  return (
    <Suspense fallback={<ChatLoading />}>
      <PageChat />
    </Suspense>
  );
}

export default PageChatWithSuspense;