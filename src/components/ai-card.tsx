"use client";

import { useEffect, useState } from "react";
import { generateSongDescription } from "@/ai/flows/generate-song-description";
import { getCurrentTrackMetadata } from "@/services/music";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AICard = () => {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateDescription = async () => {
      setIsLoading(true);
      try {
        const track = await getCurrentTrackMetadata();
        if (track) {
          const aiResponse = await generateSongDescription({
            title: track.title,
            artist: track.artist,
          });
          setDescription(aiResponse.description);
        }
      } catch (error) {
        console.error("Error generating song description:", error);
        setDescription("Failed to generate description.");
      } finally {
        setIsLoading(false);
      }
    };

    generateDescription();
  }, []);

  return (
    <Card className="w-[400px] mb-8 animate-in fade-in duration-700">
      <CardHeader>
        <CardTitle>AI Song Description</CardTitle>
        <CardDescription>Powered by Genkit</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading description...</p>
        ) : description ? (
          <p>{description}</p>
        ) : (
          <p>No description available.</p>
        )}
      </CardContent>
    </Card>
  );
};
