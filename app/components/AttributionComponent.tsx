import React from 'react';
import { config } from '../config';

interface AttributionComponentProps {
    usePhotos: boolean;
    useInternet: boolean;
    useTTS: boolean; 
    useRateLimiting: boolean;
} 
 
export const AttributionComponent: React.FC<AttributionComponentProps> = ({ usePhotos, useInternet, useTTS, useRateLimiting }) => {
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
            speech recognition: {whisperModel}: {whisperModelProvider}
            {usePhotos && `, vision: ${visionModel}: ${visionModelProvider}`}
            {!usePhotos && `, inference: ${inferenceModel}: ${inferenceModelProvider}`}
            {useTTS && `, tts: ${ttsModelProvider}`}
            {useLangSmith && ', observability: langsmith'}
            {useInternet && ', internet search: serper'}
            {useRateLimiting && ', rate limiting: upstash redis'}
        </div>
    );
};