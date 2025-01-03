"use client";

import React, { ElementRef, useRef, useState, useTransition } from 'react'
import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
  
import { 
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Alert,
  AlertDescription,
  AlertTitle, 
} from '@/components/ui/alert';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { createIngress } from '@/actions/ingress';

const RTMP = String(IngressInput.RTMP_INPUT);
type IngressType = typeof RTMP;

const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const handleSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress created");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blueSecondary">
          Generate connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-sm'>Generate connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle className='text-yellow-500'>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>
        <div className='flex justify-between'>
          <DialogClose asChild>
            <Button ref={closeRef} variant="ghost">
              Close
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={handleSubmit} 
            variant="blueSecondary"
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectModal