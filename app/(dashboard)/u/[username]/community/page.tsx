import React from 'react'
import { format } from "date-fns";

import { columns } from "./_components/columns";
import { getBlockedUsers } from '@/lib/block-service'
import { DateTable } from './_components/data-table';

const PageCommunity = async () => {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yy"),
  }));

  return (
    <div className='p-5'>
      <div className='mb-4'>
        <h1 className='font-semibold text-2xl'>
          Community Settings
        </h1>
      </div>
      <DateTable data={formattedData} columns={columns} />
    </div>
  )
}

export default PageCommunity