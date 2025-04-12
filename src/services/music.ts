/**
 * Represents music track metadata.
 */
export interface TrackMetadata {
  /**
   * The title of the track.
   */
  title: string;
  /**
   * The name of the artist.
   */
  artist: string;
  /**
   * The URL of the album art.
   */
  albumArtUrl: string;
}

/**
 * Asynchronously retrieves the currently playing track's metadata.
 *
 * @returns A promise that resolves to a TrackMetadata object.
 */
export async function getCurrentTrackMetadata(): Promise<TrackMetadata> {
  // TODO: Implement this by calling the music API.

  return {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    albumArtUrl: 'https://example.com/bohemian-rhapsody.jpg',
  };
}
