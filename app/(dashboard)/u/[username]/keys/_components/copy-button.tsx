"use client";

import React, { useState } from 'react';

import { Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  value: string | null;
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    if(!value) return false;

    setIsCopy(true);
    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setIsCopy(false)
    }, 2000);
  }

  const Icon = isCopy ? CheckCheck : Copy;

  return (
    <Button
      disabled={!value} 
      onClick={handleCopy}
      variant="ghost"
    >
      <Icon className={cn(
        "w-4 h-4",
        isCopy ? "text-bluePrimary cursor-default" : "hover:text-primary text-muted-foreground",
      )} />
    </Button>
  )
}

export default CopyButton