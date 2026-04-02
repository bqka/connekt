import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface SignalingClientOptions {
  roomTopic: string;
  onMessage: (data: any) => void;
  onConnect?: (client: Client) => void;
}

const getWsUrl = () => {
  // const envUrl = process.env.NEXT_PUBLIC_WS_URL;
  // if (envUrl) return envUrl;

  const protocol = window.location.protocol === "https:" ? "https" : "http";
  return `${protocol}://${window.location.host}/ws`;
};

export function createSignalingClient({
  roomTopic,
  onMessage,
  onConnect,
}: SignalingClientOptions) {
  const wsUrl = getWsUrl();
  console.log("[Signaling WS URL]", wsUrl);
  const client = new Client({
    webSocketFactory: () => new SockJS(wsUrl),
    onConnect: () => {
      console.log("Connected to signaling server");
      client.subscribe(roomTopic, (msg: IMessage) => {
        if (!msg.body) return;

        let data;
        try {
          data = JSON.parse(msg.body);
        } catch {
          console.warn("Invalid signalling JSON:", msg.body);
          return;
        }
        onMessage(data);
      });

      onConnect?.(client);
    },
    // debug: (msg) => console.log("[STOMP]", msg),
  });

  client.activate();
  return client;
}
