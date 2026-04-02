import { forwardRef } from "react";

interface VideoPlayerProps {
  muted?: boolean;
  label?: string;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ muted = false, label }, ref) => (
    <div className="flex flex-col items-center">
      <video
        ref={ref}
        autoPlay
        playsInline
        muted={muted}
        className="aspect-video w-120 min-w-80 rounded-2xl border border-gray-700 object-cover shadow-lg"
      />
      {label && <span className="mt-2 text-gray-400 text-sm">{label}</span>}
    </div>
  ),
);

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;