"use client";

import React, { ElementRef, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Hint } from "../Hint";
import { Trash } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { removeThumnailUrl, updateStream } from "@/actions/stream";
import { toast } from "sonner";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName, initialThumbnailUrl,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();

  const onRemoveThumbnail = () => {
    startTransition(() => {
      removeThumnailUrl(thumbnailUrl)
        .then(() => {
          toast.success("Thumbnail removed")
          setThumbnailUrl("")
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"))
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Stream Info
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>
              Name
            </Label>
            <Input
              placeholder="Stream name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Thumbnail
            </Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute z-[10] top-2 right-2">
                  <Hint label="Remove thumbnail" side="bottom" asChild>
                    <Button
                      onClick={onRemoveThumbnail}
                      type="button"
                      disabled={isPending}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  className="cursor-pointer"
                  endpoint="thumbnailUploader"
                  appearance={{ 
                    label: {
                      color: "#FFFFFF"
                    },
                    allowedContent: {
                      color: "#FFFFFF"
                    },
                    button: {
                      color: "white"
                    }
                   }}
                   onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    toast.success("Thumbnail uploaded");
                    router.refresh();
                    closeRef?.current?.click();
                   }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              variant="blueSecondary"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}