"use client";

import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { Skeleton } from "../ui/skeleton";
import { LiveVideo } from "./live-video";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
  thumbnailUrl: string | null;
}

export const Video = ({ hostName, hostIdentity, thumbnailUrl }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if(!participant && connectionState === ConnectionState.Connected){
    content = <OfflineVideo username={hostName} thumbnailUrl={thumbnailUrl} />
  } else if(!participant || tracks.length === 0){
    content = <LoadingVideo label={connectionState} thumbnailUrl={thumbnailUrl} />
  } else {
    content = <LiveVideo participant={participant} />
  }
  
  return (
    <div className="aspect-video border-b group relative">
      {content}
    </div>
  )
}

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  )
}