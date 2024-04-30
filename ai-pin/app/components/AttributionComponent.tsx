import React from 'react';
import { config } from '../config';

interface AttributionComponentProps {
    usePhotos: boolean;
    useInternet: boolean;
    useTTS: boolean;
}

export const AttributionComponent: React.FC<AttributionComponentProps> = ({ usePhotos, useInternet, useTTS }) => {
    const {
        whisperModelProvider,
        whisperModel,
        inferenceModelProvider,
        inferenceModel,
        ttsModelProvider,
        visionModelProvider,
        visionModel,
        useLangSmith,
    } = config;

    return (
        <div className="absolute bottom-0 right-10 bottom-10 text-xs text-center">
            {usePhotos && !useInternet && (
                <>
                    <a href="https://openai.com/research/whisper" target="_blank">
                        {whisperModel} by {whisperModelProvider}
                    </a>{' '}
                    on <a href="https://groq.com" target="_blank">groq</a>,
                    <a href="https://openai.com/research/gpt-4" target="_blank">
                        {' '}
                        {visionModel}
                    </a>
                    {useTTS && `, tts from ${ttsModelProvider}`}{' '}
                    <a href="https://www.langchain.com/langsmith" target="_blank">
                        {useLangSmith ? 'langsmith' : ''}
                    </a>
                    , rate limiting by <a href="https://upstash.com">upstash redis</a>.
                </>
            )}
            {usePhotos && useInternet && (
                <>
                    <a href="https://huggingface.co/openai/whisper-large-v3" target="_blank">
                        {whisperModel} by {whisperModelProvider}
                    </a>{' '}
                    on <a href="https://groq.com" target="_blank">groq</a>,
                    <a href="https://openai.com/research/gpt-4" target="_blank">
                        {' '}
                        {visionModel}
                    </a>
                    {useTTS && `, tts from ${ttsModelProvider}`}{' '}
                    <a href="https://www.langchain.com/langsmith" target="_blank">
                        {useLangSmith ? 'langsmith' : ''}
                    </a>
                    , rate limiting by <a href="https://upstash.com">upstash redis</a>.
                </>
            )}
            {!usePhotos && !useInternet && (
                <>
                    <a href="https://huggingface.co/openai/whisper-large-v3" target="_blank">
                        {whisperModel} by {whisperModelProvider}
                    </a>{' '}
                    on <a href="https://groq.com" target="_blank">groq</a>,{' '}
                    <a href="https://huggingface.co/meta-llama/Meta-Llama-3-8B" target="_blank">
                        {inferenceModel} by {inferenceModelProvider}
                    </a>{' '}
                    on <a href="https://groq.com" target="_blank">groq</a>
                    {useTTS && `, tts from ${ttsModelProvider}`}{' '}
                    <a href="https://www.langchain.com/langsmith" target="_blank">
                        {useLangSmith ? 'observability by langsmith' : ''}
                    </a>
                    , rate limiting by <a href="https://upstash.com">upstash redis</a>.
                </>
            )}
            {!usePhotos && useInternet && (
                <>
                    <a href="https://huggingface.co/openai/whisper-large-v3" target="_blank">
                        {whisperModel} by {whisperModelProvider}
                    </a>{' '}
                    on <a href="https://groq.com" target="_blank">groq</a>,{' '}
                    <a href="https://huggingface.co/meta-llama/Meta-Llama-3-8B" target="_blank">
                        {inferenceModel} by {inferenceModelProvider}
                    </a>{' '}
                    on <a href="https://groq.com" target="_blank">groq</a>
                    {useTTS && `, tts from ${ttsModelProvider}`}, internet search by{' '}
                    <a href="https://serper.com/" target="_blank">
                        serper,
                    </a>{' '}
                    observability by{' '}
                    <a href="https://www.langchain.com/langsmith" target="_blank">
                        langsmith.
                    </a>
                </>
            )}
        </div>
    );
};
