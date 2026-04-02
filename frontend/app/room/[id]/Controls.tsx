"use client";

import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";

interface ControlComponentProps {
  onLeave: () => void;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  micOn: boolean;
  videoOn: boolean;
  cameras: MediaDeviceInfo[];
  mics: MediaDeviceInfo[];
  selectedCamera: MediaDeviceInfo | null;
  selectedMic: MediaDeviceInfo | null;
  setSelectedCamera: React.Dispatch<
    React.SetStateAction<MediaDeviceInfo | null>
  >;
  setSelectedMic: React.Dispatch<React.SetStateAction<MediaDeviceInfo | null>>;
}

export default function Controls({
  onLeave,
  onToggleMic,
  onToggleVideo,
  micOn,
  videoOn,
  cameras,
  mics,
  selectedCamera,
  selectedMic,
  setSelectedCamera,
  setSelectedMic,
}: ControlComponentProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      <div className="flex flex-row gap-4">
        <button
          onClick={onToggleMic}
          aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
          aria-pressed={micOn}
          className={`flex h-12 w-14 items-center justify-center rounded-full bg-gray-600 transition-colors hover:bg-gray-700`}
        >
          {micOn ? (
            <Mic className="text-white" />
          ) : (
            <MicOff className="text-white" />
          )}
        </button>

        <button
          onClick={onToggleVideo}
          aria-label={videoOn ? "Turn off video" : "Turn on video"}
          aria-pressed={videoOn}
          className={`flex h-12 w-14 items-center justify-center rounded-full bg-gray-600 transition-colors hover:bg-gray-700`}
        >
          {videoOn ? (
            <Video className="text-white" />
          ) : (
            <VideoOff className="text-white" />
          )}
        </button>

        <button
          onClick={onLeave}
          aria-label="Leave call"
          className="flex h-12 w-14 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
        >
          <PhoneOff className="text-white" />
        </button>
      </div>
      <div className="flex sm:flex-row flex-col gap-4">
        <Select
          value={selectedCamera?.deviceId ?? ""}
          onValueChange={(selectedId) => {
            const cam = cameras.find((c) => c.deviceId === selectedId) || null;
            setSelectedCamera(cam);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Camera" />
          </SelectTrigger>
          <SelectContent className="max-w-[180px]">
            {cameras.map(({ deviceId, label }, idx) => (
              <SelectItem value={deviceId} key={idx}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedMic?.deviceId ?? ""}
          onValueChange={(selectedId) => {
            const m = mics.find((d) => d.deviceId === selectedId) || null;
            setSelectedMic(m);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Mic" />
          </SelectTrigger>
          <SelectContent className="max-w-[180px]">
            {mics.map(({ deviceId, label }, idx) => (
              <SelectItem value={deviceId} key={idx}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
