// Settings.tsx
import React, { RefObject } from 'react';
import { config } from '../config';

interface SettingsProps {
  useTTS: boolean;
  useInternet: boolean;
  usePhotos: boolean;
  useLudicrousMode: boolean;
  onTTSToggle: () => void;
  onInternetToggle: () => void;
  onPhotosToggle: () => void;
  onLudicrousModeToggle: () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const Settings: React.FC<SettingsProps> = ({
  useTTS,
  useInternet,
  usePhotos,
  useLudicrousMode,
  onTTSToggle,
  onInternetToggle,
  onPhotosToggle,
  onLudicrousModeToggle,
  ref,
}) => {
  return (
    <div ref={ref} className="absolute bottom-24 left-7 bg-white rounded-md shadow-md p-4 animate-slide-up">
      <div className="flex items-center mb-4">
        <label htmlFor="ludicrous-mode-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="ludicrous-mode-toggle"
              className="sr-only"
              checked={useLudicrousMode}
              onChange={onLudicrousModeToggle}
            />
            <div className={`block w-10 h-6 rounded-full ${useLudicrousMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useLudicrousMode ? 'transform translate-x-full' : ''}`}></div>
          </div>
          <div className="ml-3 text-sm">Ludicrous Mode</div>
        </label>
      </div>
      <div className="text-xs text-gray-500 mb-4">(groq llama3 + groq whisper only)</div>
      {config.enableTextToSpeechUIToggle && (
        <div className="flex items-center mb-4">
          <label htmlFor="tts-toggle" className="flex items-center cursor-pointer">
            <div className={`relative`}>
              <input
                type="checkbox"
                id="tts-toggle"
                className="sr-only"
                checked={useTTS}
                onChange={onTTSToggle}
              />
              <div className={`block w-10 h-6 rounded-full ${useTTS ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useTTS ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm">Text-to-Speech</div>
          </label>
        </div>
      )}
      {config.enableInternetResultsUIToggle && (
        <div className="flex items-center mb-4">
          <label htmlFor="internet-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="internet-toggle"
                className="sr-only"
                checked={useInternet}
                onChange={onInternetToggle}
              />
              <div className={`block w-10 h-6 rounded-full ${useInternet ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useInternet ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm">Use Internet Results</div>
          </label>
        </div>
      )}
      {config.enableUsePhotUIToggle && (
        <div className="flex items-center cursor-not-allowed">
          <label htmlFor="photos-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="photos-toggle"
                className="sr-only"
                checked={usePhotos}
                onChange={onPhotosToggle}
              />
              <div className={`block w-10 h-6 rounded-full ${usePhotos ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${usePhotos ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm">Use Photos</div>
          </label>
        </div>
      )}
    </div>
  );
};