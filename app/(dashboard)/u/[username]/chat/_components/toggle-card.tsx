"use client";

import { updateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

const ToggleCard = ({
  label, value, field,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success(`Chat setting updated`))
        .catch((res) => toast.error(res.message || "Something went wrong"))
    })
  } 

  return (
    <div className='rounded-lg bg-darkSecondary p-6'>
      <div className='flex justify-between items-center'>
        <p className='font-semibold shrink-0'>
          {label}
        </p>
        <div className='space-y-2'>
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}
          >
            {value ? "On" : "Of"}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default ToggleCard

export const ToggleCardSkeleton = () => {
  return (
    <Skeleton className='rounded-lg p-10 w-full' />
  )
}