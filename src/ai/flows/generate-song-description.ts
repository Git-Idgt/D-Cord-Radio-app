'use server';
/**
 * @fileOverview An AI agent that generates a short description of a song's mood or genre.
 *
 * - generateSongDescription - A function that generates the song description.
 * - GenerateSongDescriptionInput - The input type for the generateSongDescription function.
 * - GenerateSongDescriptionOutput - The return type for the generateSongDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {getCurrentTrackMetadata} from '@/services/music';
import {z} from 'genkit';

const GenerateSongDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the song.'),
  artist: z.string().describe('The artist of the song.'),
});
export type GenerateSongDescriptionInput = z.infer<typeof GenerateSongDescriptionInputSchema>;

const GenerateSongDescriptionOutputSchema = z.object({
  description: z.string().describe('A short description of the song.'),
});
export type GenerateSongDescriptionOutput = z.infer<typeof GenerateSongDescriptionOutputSchema>;

export async function generateSongDescription(input: GenerateSongDescriptionInput): Promise<GenerateSongDescriptionOutput> {
  return generateSongDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSongDescriptionPrompt',
  input: {
    schema: z.object({
      title: z.string().describe('The title of the song.'),
      artist: z.string().describe('The artist of the song.'),
    }),
  },
  output: {
    schema: z.object({
      description: z.string().describe('A short description of the song, focusing on the mood or genre.'),
    }),
  },
  prompt: `You are a music expert. Please provide a short description of the song "{{{title}}}" by {{{artist}}}, focusing on its mood and genre. Keep it concise and engaging.`,
});

const generateSongDescriptionFlow = ai.defineFlow<
  typeof GenerateSongDescriptionInputSchema,
  typeof GenerateSongDescriptionOutputSchema
>({
  name: 'generateSongDescriptionFlow',
  inputSchema: GenerateSongDescriptionInputSchema,
  outputSchema: GenerateSongDescriptionOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
