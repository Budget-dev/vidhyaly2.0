
'use server';

/**
 * @fileOverview A Vidhyamithra chat and voice response flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import wav from 'wav';

const ChatInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
});

const ChatOutputSchema = z.object({
  text: z.string().describe('The text response from Vidhyamithra.'),
  audio: z.string().optional().describe('Base64 encoded WAV audio data URI.'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

export async function vidhyamithraChat(input: ChatInput): Promise<ChatOutput> {
  return vidhyamithraChatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'vidhyamithraChatPrompt',
  input: { schema: ChatInputSchema },
  prompt: `You are Vidhyamithra, a friendly and highly supportive AI study friend and mentor for NEET aspirants in India. 
  Your tone is motivating, professional, yet warm. You specialize in guiding students through the stress of NEET preparation, 
  helping them with schedules, and providing high-level conceptual summaries.
  
  Keep your responses concise and direct so they are easy to listen to.
  
  User message: {{{message}}}`,
});

const vidhyamithraChatFlow = ai.defineFlow(
  {
    name: 'vidhyamithraChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { text } = await chatPrompt(input);
    
    // Generate TTS for the text response
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });

    let audioUri = undefined;
    if (media?.url) {
      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
      const wavBase64 = await toWav(audioBuffer);
      audioUri = `data:audio/wav;base64,${wavBase64}`;
    }

    return {
      text: text,
      audio: audioUri,
    };
  }
);
