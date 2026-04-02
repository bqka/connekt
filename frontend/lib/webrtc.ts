export function createPeerConnection(
  onTrack: (stream: MediaStream) => void,
  onIceCandidate: (candidate: RTCIceCandidate) => void
) {
  const pc = new RTCPeerConnection();

  pc.onicecandidate = (e) => {
    if (e.candidate) onIceCandidate(e.candidate);
  };

  pc.ontrack = (e) => {
    onTrack(e.streams[0]);
  };

  return pc;
}