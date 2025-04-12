"use client";

import { AICard } from "@/components/ai-card";
import { ChatInput } from "@/components/chat-input";
import { SongDisplay } from "@/components/song-display";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background py-8">
      <SongDisplay />
      <AICard />
      <ChatInput />
      <Toaster />
    </div>
  );
}

