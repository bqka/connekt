"use client";

import { useUser } from "@/context/UserContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GetStarted() {
  const { user } = useUser();
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");

  const handleRoomName = () => {
    if (!roomName.trim()) {
      alert("Room Name can't be empty!");
      return;
    }

    const cleanName = roomName.trim().replace(/\s+/g, "-").toLowerCase();
    router.push(`/room/${cleanName}`);
  };

  return (
    <div>
      {user ? (
        <div className="flex flex-row gap-2">
          <Input
            id="room-name-input"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Button className="font-semibold" onClick={handleRoomName}>
            Create Room
          </Button>
        </div>
      ) : (
        <Button className="scale-115 rounded-sm text-sm font-semibold" onClick={() => router.push("/auth/login")}>
          Get Started
        </Button>
      )}
    </div>
  );
}
