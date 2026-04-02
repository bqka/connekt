import { useEffect, useState } from "react";

export function useMediaDevices() {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<MediaDeviceInfo | null>(
    null,
  );
  const [selectedMic, setSelectedMic] = useState<MediaDeviceInfo | null>(null);
  const [devicesReady, setDevicesReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const tempStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        const devices = await navigator.mediaDevices.enumerateDevices();
        const localCameras = devices.filter((d) => d.kind === "videoinput");
        const localMics = devices.filter((d) => d.kind === "audioinput");

        setCameras(localCameras);
        setMics(localMics);

        const activeVideoTrack = tempStream.getVideoTracks()[0];
        const activeAudioTrack = tempStream.getAudioTracks()[0];

        if (activeVideoTrack?.getSettings().deviceId) {
          const cam = localCameras.find(
            (c) => c.deviceId === activeVideoTrack.getSettings().deviceId,
          );
          if (cam) setSelectedCamera(cam);
        }

        if (activeAudioTrack?.getSettings().deviceId) {
          const mic = localMics.find(
            (m) => m.deviceId === activeAudioTrack.getSettings().deviceId,
          );
          if (mic) setSelectedMic(mic);
        }

        tempStream.getTracks().forEach((t) => t.stop());
        setDevicesReady(true);
      } catch (err) {
        console.error("Device permissions error:", err);
      }
    })();
  }, []);

  return {
    cameras,
    mics,
    selectedCamera,
    selectedMic,
    setSelectedCamera,
    setSelectedMic,
    devicesReady,
  };
}
