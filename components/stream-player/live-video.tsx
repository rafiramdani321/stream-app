"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { VolumeControl } from "./volume-control";
import { useEventListener } from "usehooks-ts";
import { FullscreenControl } from "./fullscreen-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onVolumeChange = (value: number) => {
    setVolume(value)
    if(videoRef.current){
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);

    if(videoRef.current){
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  }

  useEffect(() => {
    onVolumeChange(0);
  }, [])

  const toggleFullscreen = () => {
    if(isFullscreen){
      document.exitFullscreen();
    } else if(wrapperRef.current){
      wrapperRef.current.requestFullscreen();
    }
  }

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  }

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if(videoRef.current){
        track.publication.track?.attach(videoRef.current);
      }
    });
  
  return (
    <div
      ref={wrapperRef}
      className="relative h-full flex"
    >
      <video ref={videoRef} className="100%" />
      <div className="opacity-0 hover:opacity-100 absolute top-0 h-full w-full hover:transition-all">
        <div className="absolute bottom-0 flex w-full items-center justify-between px-4 bg-background/30">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  )
}