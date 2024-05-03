import { toFile } from 'openai';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import { config } from '../config';
import { traceable } from "langsmith/traceable";
const groq = new Groq();
const openai = new OpenAI();
export const transcribeAudio = traceable(async (audioBlob: Blob, timestamp: number) => {
    try {
        let transcription;
        if (config.whisperModelProvider === 'openai') {
            transcription = await openai.audio.transcriptions.create({
                file: await toFile(audioBlob, `audio-${timestamp}.wav`),
                model: config.whisperModel,
            });
        } else if (config.whisperModelProvider === 'groq') {
            transcription = await groq.audio.transcriptions.create({
                file: await toFile(audioBlob, `audio-${timestamp}.wav`),
                model: config.whisperModel,
            });
        } else {
            throw new Error('Invalid whisper model');
        }
        return transcription.text;
    } catch (error) {
        console.error('Error transcribing audio:', error);
        return 'Error transcribing audio. Please try again later.';
    }
}, { name: 'transcribeAudio' });