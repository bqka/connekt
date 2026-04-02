"use client";

import { MutableRefObject, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";

export function useWebRTC(
  roomId: string,
  localVideo: MutableRefObject<HTMLVideoElement | null>,
  remoteVideo: MutableRefObject<HTMLVideoElement | null>,
  stompClient: MutableRefObject<Client | null>
) {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const clientId = useRef(uuidv4());
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const isPolite = clientId.current.localeCompare(roomId) > 0;

  // 🔹 Handle incoming WebRTC messages from signaling
  async function onSignalingMessage(data: any) {
    if (data.sender === clientId.current) return;

    console.log("📨 Incoming:", data.type, data);
    const pc = pcRef.current;
    if (!pc) return;

    try {
      switch (data.type) {
        case "offer":
          console.log("📡 Received offer");
          await pc.setRemoteDescription(data.offer);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          stompClient.current?.publish({
            destination: `/app/send/${roomId}`,
            body: JSON.stringify({
              sender: clientId.current,
              type: "answer",
              answer,
            }),
          });
          break;

        case "answer":
          if (pc.signalingState === "have-local-offer") {
            await pc.setRemoteDescription(data.answer);
          } else {
            console.warn("⚠️ Unexpected answer in state:", pc.signalingState);
          }
          break;

        case "candidate":
          await pc.addIceCandidate(data.candidate);
          break;
      }
    } catch (err) {
      console.error("Signaling message handling error:", err);
    }
  }

  // 🔹 Start WebRTC connection
  async function startWebRTC(client: Client) {
    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    // Send ICE candidates through STOMP
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        client.publish({
          destination: `/app/send/${roomId}`,
          body: JSON.stringify({
            sender: clientId.current,
            type: "candidate",
            candidate: e.candidate,
          }),
        });
      }
    };

    // Display remote video stream
    pc.ontrack = (e) => {
      if (remoteVideo.current) remoteVideo.current.srcObject = e.streams[0];
    };

    // Pick a mic and video source
    const devices = await navigator.mediaDevices.enumerateDevices();
    let mic =
      devices.find((d) => d.kind === "audioinput" && d.deviceId === "communications") ??
      devices.find((d) => d.kind === "audioinput" && d.deviceId === "default") ??
      devices.find((d) => d.kind === "audioinput");

    console.log("🎤 Using mic:", mic?.label || mic?.deviceId);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: mic ? { deviceId: { exact: mic.deviceId } } : true,
      video: true,
    });

    setStream(stream);
    if (localVideo.current) localVideo.current.srcObject = stream;

    // Add all tracks to the peer connection
    stream.getTracks().forEach((t) => pc.addTrack(t, stream));

    // Offer/Answer logic
    if (!isPolite) {
      console.log("🟢 Creating offer (impolite peer)");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      client.publish({
        destination: `/app/send/${roomId}`,
        body: JSON.stringify({
          sender: clientId.current,
          type: "offer",
          offer,
        }),
      });
    } else {
      console.log("🟣 Waiting for offer (polite peer)");
    }
  }

  // 🔹 Toggle mic
  function handleToggleMic() {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => (track.enabled = !micOn));
    setMicOn((prev) => !prev);
  }

  // 🔹 Toggle video
  async function handleToggleVideo() {
    if (!stream) return;

    if (videoOn) {
      stream.getVideoTracks().forEach((track) => track.stop());
      if (localVideo.current) localVideo.current.srcObject = null;
      setVideoOn(false);
    } else {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const newTrack = newStream.getVideoTracks()[0];

      const sender = pcRef.current
        ?.getSenders()
        .find((s) => s.track?.kind === "video");
      if (sender) sender.replaceTrack(newTrack);

      if (localVideo.current) localVideo.current.srcObject = newStream;

      setStream((prev) => {
        if (prev) {
          prev.addTrack(newTrack);
          return prev;
        }
        return newStream;
      });

      setVideoOn(true);
    }
  }

  // 🔹 Leave room and cleanup
  function handleLeave() {
    stream?.getTracks().forEach((t) => t.stop());
    pcRef.current?.close();
    stompClient.current?.deactivate();
    window.location.href = "/";
  }

  return {
    pcRef,
    clientId,
    micOn,
    videoOn,
    stream,
    setStream,
    handleToggleMic,
    handleToggleVideo,
    handleLeave,
    onSignalingMessage,
    startWebRTC,
  };
}