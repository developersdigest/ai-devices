import 'server-only';
import { createAI, createStreamableValue, createStreamableUI } from 'ai/rsc';
import { config } from './config';
import dotenv from 'dotenv';
dotenv.config();
// Rate limiting
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from 'next/headers'
let ratelimit: Ratelimit | undefined;
if (config.useRateLimiting) {
    ratelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, "10 m") // 10 requests per 10 minutes
    });
}
// Rate limiting
import { transcribeAudio } from './utils/transcribeAudio';
import { generateTTS } from './utils/generateTTS';
import { processImageWithGPT4V, processImageWithLllavaOnFalAI } from './utils/processImage';
import { generateChatCompletion } from './utils/generateChatCompletion';
import { answerEngine } from './utils/answerEngine';
import { chatCompletionWithTools } from './utils/chatCompletionWithTools';
import { initializeRateLimit, checkRateLimit } from './utils/rateLimiting';

async function action(obj: FormData): Promise<any> {
    "use server";
    const streamable = createStreamableValue();
    (async () => {
        if (config.useRateLimiting) {
            const identifier = headers().get('x-forwarded-for') || headers().get('x-real-ip') || headers().get('cf-connecting-ip') || headers().get('client-ip') || "";
            initializeRateLimit();
            if (!await checkRateLimit(identifier)) return streamable.done({ 'result': 'Rate Limit Reached. Please try again later.' });
        }
        const formData = obj;
        const audioBlob = formData.get('audio');
        const useTTS = formData.get('useTTS') === 'true';
        const useInternet = formData.get('useInternet') === 'true';
        const usePhotos = formData.get('usePhotos') === 'true';
        const useLudicrousMode = formData.get('useLudicrousMode') === 'true';
        if (!(audioBlob instanceof Blob)) throw new Error('No audio detected');

        const timestamp = Date.now();
        const transcription = await transcribeAudio(audioBlob, timestamp);
        streamable.update({ 'transcription': transcription });

        let responseText = '';
        if (useLudicrousMode) {
            const result = await generateChatCompletion(transcription);
            if (result !== undefined) {
                responseText = result;
            }
        } else {
            if (usePhotos) {
                const image = formData.get('image');
                if (image instanceof File) {
                    if (config.visionModelProvider === 'fal.ai') {
                        responseText = await processImageWithLllavaOnFalAI(image, transcription);
                    } else {
                        responseText = await processImageWithGPT4V(image, transcription);
                    }
                } else {
                    responseText = 'You might have forgotten to upload an image';
                }
            } else {
                let result;
                if (useInternet) {
                    result = await answerEngine(transcription);
                } else {
                    result = await generateChatCompletion(transcription);
                }

                if (result !== undefined) {
                    responseText = result;
                }

                const tool_results = await chatCompletionWithTools(responseText);
                if (tool_results?.uiComponent) {
                    if (tool_results.uiComponent.component === 'weather') {
                        streamable.update({ 'weather': tool_results.uiComponent.data });
                    } else if (tool_results.uiComponent.component === 'spotify') {
                        streamable.update({ 'spotify': tool_results.uiComponent.data });
                    } else if (tool_results.uiComponent.component === 'time') {
                        responseText = tool_results.uiComponent.data;
                        streamable.update({ 'time': tool_results.uiComponent.data });
                    }
                } else {
                    streamable.update({ 'message': tool_results?.message });
                }
            }
        }

        streamable.update({ 'result': responseText });
        useTTS && streamable.update({ 'audio': await generateTTS(responseText) });
        streamable.done({ status: 'done' });
    })();
    return streamable.value;
}

const initialAIState: {
    role: 'user' | 'assistant' | 'system' | 'function';
    content: string;
    id?: string;
    name?: string;
}[] = [];

const initialUIState: {
    text: string;
    id?: string;
}[] = [];

export const AI = createAI({
    actions: { action },
    initialAIState,
    initialUIState
});