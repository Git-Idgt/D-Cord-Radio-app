"use client";

import { ChatInput } from "@/components/chat-input";
import { SongDisplay } from "@/components/song-display";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Select } from "@/components/ui/select";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [rtmpUrl, setRtmpUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [quality, setQuality] = useState("720p");
  const [previousSong, setPreviousSong] = useState("Yesterday - The Beatles");
  const [nextSong, setNextSong] = useState("Let It Be - The Beatles");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.volume = volume / 100;
        }

        // Replace with your actual RTMP URL
        setRtmpUrl("rtmp://your-rtmp-server/live/stream");
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  }, [volume]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
    }
  };

  const handleQualityChange = (value: string) => {
    setQuality(value);
    // TODO: Implement quality switching logic here.
    console.log("Quality changed to:", value);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background py-4 px-6 items-center">
      {/* D-Cord Radio Title */}
      <div className="flex justify-center mb-2 w-2/3">
        <svg width="100%" height="80" viewBox="0 0 800 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="72" fill="hsl(var(--primary))"
            style={{ fontFamily: 'FancyText, Arial, sans-serif', fontWeight: 'bold'}}>
            D-Cord Radio
          </text>
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow w-full justify-center">

        {/* Video Stream Container */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          {rtmpUrl ? (
            <video src={rtmpUrl} ref={videoRef} className="w-full rounded-md" autoPlay muted controls style={{ maxHeight: '400px' }} />
          ) : (
            <video ref={videoRef} className="w-full rounded-md" autoPlay muted style={{ maxHeight: '400px' }}/>
          )}
          {!(hasCameraPermission) && (
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
          )}

            {/* Stream Controls */}
            <div className="flex flex-col items-center w-full max-w-md mt-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Stream Controls</h3>

            {/* Start/Stop Button */}
            <button
              onClick={togglePlay}
              className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 mb-2"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            {/* Volume Control */}
            <div className="w-full mb-2">
              <label className="block text-sm font-medium text-foreground mb-1">Volume</label>
              <Slider
                defaultValue={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
            </div>

            {/* Video Quality Adjustment */}
            <div className="w-full mb-2">
              <label className="block text-sm font-medium text-foreground mb-1">Video Quality</label>
              <Select value={quality} onValueChange={handleQualityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="360p">360p</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center justify-start w-1/2 p-4">
          <ChatInput />

          {/* Previous/Next Song */}
          <div className="w-full">
            <p className="text-sm text-muted-foreground">Previous Song: {previousSong}</p>
            <p className="text-sm text-muted-foreground">Next Song: {nextSong}</p>
          </div>

          <Toaster />
        </div>
      </div>
    </div>
  );
}
