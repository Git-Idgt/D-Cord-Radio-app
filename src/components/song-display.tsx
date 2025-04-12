"use client";

import { useEffect, useState } from "react";
import { getCurrentTrackMetadata, TrackMetadata } from "@/services/music";

export const SongDisplay = () => {
  const [track, setTrack] = useState<TrackMetadata | null>(null);

  useEffect(() => {
    const fetchTrackMetadata = async () => {
      const metadata = await getCurrentTrackMetadata();
      setTrack(metadata);
    };

    fetchTrackMetadata();
  }, []);

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mb-8">
      <img
        src={track.albumArtUrl}
        alt="Album Art"
        className="w-64 h-64 rounded-md shadow-md mb-4"
      />
      <h2 className="text-2xl font-semibold text-foreground">{track.title}</h2>
      <p className="text-lg text-muted-foreground">By {track.artist}</p>
    </div>
  );
};
