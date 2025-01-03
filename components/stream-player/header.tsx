"use client";

import { UserIcon } from "lucide-react";
import UserAvatar from "../user-avatar";
import { VerifiedMark } from "../verifiend-mark";
import { Actions } from "./actions";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
}

export const Header = ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  name,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">
              {hostName}
            </h2>
            <VerifiedMark />
          </div>
          <p className="text-sm">
            {name}
          </p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount} {participantCount <= 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              offline
            </p>
          )}
        </div>
      </div>
      {!isHost && (
        <Actions
          isFollowing={isFollowing}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
      )}
    </div>
  )
}