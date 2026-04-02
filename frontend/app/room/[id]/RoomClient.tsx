"use client";

import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { createSignalingClient } from "@/lib/signaling";
import Controls from "./Controls";

import {
  useWebRTC,
  useMediaDevices,
  useDeviceSwitcher,
  VideoPlayer,
} from "@/components/Room/index";

export default function RoomClient({ roomId }: { roomId: string }) {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const stompClient = useRef<Client | null>(null);

  const {
    cameras,
    mics,
    selectedCamera,
    selectedMic,
    setSelectedCamera,
    setSelectedMic,
    devicesReady,
  } = useMediaDevices();

  const {
    pcRef,
    clientId,
    micOn,
    videoOn,
    stream,
    setStream,
    handleToggleMic,
    handleToggleVideo,
    handleLeave,
    startWebRTC,
    onSignalingMessage,
  } = useWebRTC(roomId, localVideo, remoteVideo, stompClient);

  // Hook: handle switching between devices dynamically
  useDeviceSwitcher({
    pcRef,
    stream,
    setStream,
    selectedCamera,
    selectedMic,
    localVideo,
  });

  // STOMP signaling setup
  useEffect(() => {
    if (!devicesReady) return;
    const client = createSignalingClient({
      roomTopic: `/topic/room/${roomId}`,
      onMessage: onSignalingMessage,
      onConnect: () => startWebRTC(client),
    });
    stompClient.current = client;
    return () => {
      void client.deactivate();
      pcRef.current?.close();
    };
  }, [devicesReady]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Room ID: {roomId}</h1>

      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-6 lg:flex-row">
        <VideoPlayer ref={localVideo} muted label="You" />
        <VideoPlayer ref={remoteVideo} label="Remote" />
      </div>

      <div className="mt-6">
        <Controls
          micOn={micOn}
          videoOn={videoOn}
          onToggleMic={handleToggleMic}
          onToggleVideo={handleToggleVideo}
          onLeave={handleLeave}
          cameras={cameras}
          mics={mics}
          selectedCamera={selectedCamera}
          selectedMic={selectedMic}
          setSelectedCamera={setSelectedCamera}
          setSelectedMic={setSelectedMic}
        />
      </div>
    </div>
  );
}
