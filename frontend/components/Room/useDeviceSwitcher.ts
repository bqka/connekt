import { RefObject, useEffect } from "react";

interface UseDeviceSwitcherProps {
  pcRef: RefObject<RTCPeerConnection | null>;
  stream: MediaStream | null;
  setStream: (s: MediaStream) => void;
  selectedCamera: MediaDeviceInfo | null;
  selectedMic: MediaDeviceInfo | null;
  localVideo: RefObject<HTMLVideoElement | null>;
}

export function useDeviceSwitcher({
  pcRef,
  stream,
  setStream,
  selectedCamera,
  selectedMic,
  localVideo,
}: UseDeviceSwitcherProps) {
  useEffect(() => {
    if (!pcRef.current || !stream) return;
    const pc = pcRef.current;

    (async () => {
      try {
        const constraints: MediaStreamConstraints = {
          audio: selectedMic ? { deviceId: { exact: selectedMic.deviceId } } : true,
          video: selectedCamera ? { deviceId: { exact: selectedCamera.deviceId } } : true,
        };

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        const newAudio = newStream.getAudioTracks()[0];
        const newVideo = newStream.getVideoTracks()[0];

        const audioSender = pc.getSenders().find((s) => s.track?.kind === "audio");
        if (audioSender && newAudio) await audioSender.replaceTrack(newAudio);

        const videoSender = pc.getSenders().find((s) => s.track?.kind === "video");
        if (videoSender && newVideo) await videoSender.replaceTrack(newVideo);

        if (localVideo.current) localVideo.current.srcObject = newStream;
        stream.getTracks().forEach((t) => t.stop());
        setStream(newStream);
      } catch (e) {
        console.error("Error switching devices:", e);
      }
    })();
  }, [selectedCamera, selectedMic]);
}