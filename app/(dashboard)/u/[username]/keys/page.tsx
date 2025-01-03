import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service';
import React from 'react'
import ConnectModal from './_components/connect-modal';
import UrlCard from './_components/url-card';
import KeysCard from './_components/keys-card';

const PageKeys = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if(!stream) throw new Error("Stream not found");

  return (
    <div className='p-5'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-semibold text-2xl'>
          Keys & URLs
        </h1>
        <ConnectModal />
      </div>
      <div className='space-y-2'>
        <UrlCard value={stream.serverUrl} />
        <KeysCard value={stream.streamKey} />
      </div>
    </div>
  )
}

export default PageKeys