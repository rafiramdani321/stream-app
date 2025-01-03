"use client";

import { Pencil } from "lucide-react";
import { InfoModal } from "./info-modal";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if(!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-darkSecondary">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-bluePrimary/30 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5 text-bluePrimary" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximaze your visibility
            </p>
          </div>
          <InfoModal
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
          />
        </div>
      </div>
    </div>
  )
}