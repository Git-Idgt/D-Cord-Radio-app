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

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        // toast({
        //   variant: 'destructive',
        //   title: 'Camera Access Denied',
        //   description: 'Please enable camera permissions in your browser settings to use this app.',
        // });
      }
    };

    getCameraPermission();
  }, []);

  return (
    <div className="flex items-start justify-start min-h-screen bg-background py-8 w-full">
      {/* Video Stream Container */}
      <div className="w-1/2 p-4">
        <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
        { !(hasCameraPermission) && (
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
        )
        }
      </div>

      {/* Content Container */}
      <div className="flex flex-col items-center justify-start w-1/2 p-4">
        <SongDisplay />
        <AICard />
        <ChatInput />
        <Toaster />
      </div>
    </div>
  );
}
