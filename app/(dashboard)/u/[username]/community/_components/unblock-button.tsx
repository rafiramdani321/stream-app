"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export const UnblockButton = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => toast.success(`User ${result.blocked.username} unblocked`))
        .catch(() => toast.error("Something went wrong"))
    })
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="w-full"
    >
      Unblock
    </Button>
  )
}