"use client";

import { AICard } from "@/components/ai-card";
import { ChatInput } from "@/components/chat-input";
import { SongDisplay } from "@/components/song-display";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [rtmpUrl, setRtmpUrl] = useState<string | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Replace with your actual RTMP URL
        setRtmpUrl("rtmp://your-rtmp-server/live/stream");
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background py-4 px-6">
      {/* D-Cord Radio Title */}
      <div className="flex justify-center mb-2">
        <svg width="400" height="80" viewBox="0 0 800 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="80" fill="hsl(var(--primary))"
            style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontStyle: 'italic' }}>
            D-Cord Radio
          </text>
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow">

        {/* Video Stream Container */}
        <div className="w-1/2 flex items-center justify-center">
          {rtmpUrl ? (
            <video src={rtmpUrl} ref={videoRef} className="w-full max-h-full rounded-md" autoPlay muted controls />
          ) : (
            <video ref={videoRef} className="w-full max-h-full rounded-md" autoPlay muted />
          )}
          {!(hasCameraPermission) && (
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center justify-start w-1/2 p-4">
          <SongDisplay />
          <AICard />
          <ChatInput />
          <Toaster />
        </div>
      </div>
    </div>
  );
}
