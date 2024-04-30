// Settings.tsx\
import React, { RefObject } from 'react';
import { config } from '../config';

interface SettingsProps {
  useTTS: boolean;
  useInternet: boolean;
  usePhotos: boolean;
  onTTSToggle: () => void;
  onInternetToggle: () => void;
  onPhotosToggle: () => void;
  ref?: RefObject<HTMLDivElement>; // Add this line
}

export const Settings: React.FC<SettingsProps> = ({
  useTTS,
  useInternet,
  usePhotos,
  onTTSToggle,
  onInternetToggle,
  onPhotosToggle,
  ref,
}) => {
  return (
    <div ref={ref} className="absolute bottom-24 left-7 bg-white rounded-md shadow-md p-4 animate-slide-up">
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

