"use client";
import { useState, useEffect } from 'react';
import { useActions, readStreamableValue } from 'ai/rsc';
import { type AI } from './action';
import { Settings } from './components/Settings';
import { AttributionComponent } from './components/AttributionComponent';
import { MobileNotSupported } from './components/Mobile';
import InputComponent from './components/InputComponent';
import { WeatherData } from './components/tools/Weather';
import { SpotifyTrack } from './components/tools/Spotify';
import { ClockComponent } from './components/tools/Clock';
import { config } from './config';

interface Message {
  rateLimitReached: any;
  transcription?: string;
  audio?: string;
  result?: string;
  weather?: string;
  spotify?: string;
  time?: string;
}

interface UIComponent {
  component: string;
  data: any;
}

const Main = () => {
  const { action } = useActions<typeof AI>();
  const [useLudicrousMode, setUseLudicrousMode] = useState(true);
  const [useTTS, setUseTTS] = useState(false);
  const [useInternet, setUseInternet] = useState(false);
  const [usePhotos, setUsePhotos] = useState(false);
  const [useRabbitMode, setuseRabbitMode] = useState(false);
  const [useSpotify, setUseSpotify] = useState('');
  const [currentTranscription, setCurrentTranscription] = useState<{ transcription: string, responseTime: number } | null>(null);
  const [totalResponseTime, setTotalResponseTime] = useState<number | null>(null);
  const [currentUIComponent, setCurrentUIComponent] = useState<UIComponent | null>(null);
  const [message, setMessage] = useState<{ message: string; responseTime: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleTTSToggle = () => {
    setUseTTS(!useTTS);
  };

  const handleInternetToggle = () => {
    setUseInternet(!useInternet);
  };

  const handleLudicrousModeToggle = () => {
    setUseLudicrousMode(!useLudicrousMode);
  };

  const handleRabbitModeToggle = () => {
    setuseRabbitMode(!useRabbitMode);
  };
  const handleSubmit = async (formData: FormData) => {
    const startTime = Date.now();
    const streamableValue = await action(formData);
    let transcriptionResponseTime;
    let transcriptionCompletionTime;
    let messageResponseTime;
    let audioResponseTime;
    setCurrentUIComponent(null);
    setMessage(null);
    for await (const message of readStreamableValue<Message>(streamableValue)) {
      if (message && message.rateLimitReached && typeof message.rateLimitReached === 'string') {
        setMessage({ message: message.rateLimitReached, responseTime: 0 });
      }
      if (message && message.time && typeof message.time === 'string') {
        setCurrentUIComponent({ component: 'time', data: message.time });
      }
      if (message && message.transcription && typeof message.transcription === 'string') {
        transcriptionResponseTime = (Date.now() - startTime) / 1000;
        transcriptionCompletionTime = Date.now();
        setCurrentTranscription({ transcription: message.transcription, responseTime: transcriptionResponseTime });
      }
      if (message && message.weather && typeof message.weather === 'string') {
        setCurrentUIComponent({ component: 'weather', data: JSON.parse(message.weather) });
      }
      if (message && message.result && typeof message.result === 'string') {
        messageResponseTime = (Date.now() - (transcriptionCompletionTime || startTime)) / 1000;
        setMessage({ message: message.result, responseTime: messageResponseTime });
      }
      if (message && message.audio && typeof message.audio === 'string') {
        audioResponseTime = (Date.now() - (transcriptionCompletionTime || startTime)) / 1000;
        const audio = new Audio(message.audio);
        audio.play();
      }
      if (message && message.spotify && typeof message.spotify === 'string') {
        setUseSpotify(message.spotify);
      }
    }
    let totalResponseTime = 0;
    if (transcriptionResponseTime) {
      totalResponseTime += transcriptionResponseTime;
    }
    if (messageResponseTime) {
      totalResponseTime += messageResponseTime;
    }
    if (audioResponseTime) {
      totalResponseTime += audioResponseTime;
    }
    setTotalResponseTime(totalResponseTime);
  };
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768; // Adjust the breakpoint as needed
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile); // Check on window resize
    return () => {
      window.removeEventListener('resize', checkMobile); // Cleanup the event listener
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {isMobile ? (
        <MobileNotSupported />
      ) : (
        <>
          <a
            href="https://git.new/ai-devices"
            target="_blank"
            rel="noreferrer"
            className="absolute top-7 right-7 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="cursor-pointer w-6 h-6"
            />
          </a>
          <InputComponent
            onSubmit={handleSubmit}
            useTTS={useTTS}
            useInternet={useInternet}
            usePhotos={usePhotos}
            useLudicrousMode={useLudicrousMode}
            useRabbitMode={useRabbitMode}
          />
          {currentTranscription && (
            <div className={`absolute  ${useRabbitMode ? 'transform -translate-x-1/2 left-1/2 bottom-[100px]' : 'left-[30px] bottom-0 top-3/4'} text-center min-w-[300px] max-w-[300px]`}>
              <p className="text-md text-gray-500">{currentTranscription.transcription} </p>
              {config.enableResponseTimes && (
                <p className="text-xs text-gray-500">Transcription response time: +{currentTranscription.responseTime.toFixed(2)} seconds</p>
              )}
            </div>
          )}
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center w-full px-4 relative">
              <div className={`max-w-[700px] self-center absolute ${useRabbitMode ? 'top-[250px] left-1/2 transform -translate-x-1/2' : 'top-[200px] right-0'}`}>
                {useRabbitMode ? (
                  <img
                    className="animate-slide-in-right w-full max-w-[395px] rabbit-animation"
                    src="https://developersdigest.s3.amazonaws.com/r1.png"
                    alt="Rabbit"
                  />
                ) : (
                  <img
                    className={`animate-slide-in-right w-full min-w-[700px]`}
                    src="https://developersdigest.s3.amazonaws.com/hand-1.png"
                    alt="Hand"
                  />
                )}
                {useSpotify && (
                  <div className={`absolute left-0 bottom-0 flex items-center justify-end transform ${useRabbitMode ? 'left-[24px] top-[-240px]' : 'top-0 -translate-x-[300px] right-10'} z-10`}>
                    <SpotifyTrack trackId={useSpotify} width={useRabbitMode ? 260 : 300} height={useRabbitMode ? 80 : 80} />
                  </div>
                )}
                {message && message.message && !currentUIComponent && (
                  <div
                    className={`absolute flex items-center justify-end ${useRabbitMode ? 'top-[200px]' : 'top-0 left-0 right-0 bottom-0'}`}
                    style={{
                      color: useRabbitMode ? '#fff' : '#78F6EB',
                      textShadow: '0 0 5px #000, 0 0 10px #000, 0 0 20px #000, 0 0 40px #000',
                    }}
                  >
                    <div className={`text-center mx-5 ${useRabbitMode ? 'pl-5 text-sm w-[250px]' : 'text-xl w-[300px]'}`}>{message.message}</div>
                  </div>
                )}
                {currentUIComponent && currentUIComponent.component === 'weather' && (
                  <div className={`weather-data absolute ${useRabbitMode ? '-top-[68px] right-[79px] scale-[0.92]' : 'top-0 left-0 right-0 justify-end'} bottom-0 flex items-center `}>
                    <WeatherData data={currentUIComponent.data} />
                  </div>
                )}
                {currentUIComponent && currentUIComponent.component === 'time' && (
                  <div className={`z-10 absolute ${useRabbitMode ? 'left-[55px] top-[92px]' : 'right-[125px] top-[30px]'} bottom-0 flex items-center justify-end`}>
                    <ClockComponent />
                  </div>
                )}
                {message && message.message && (
                  <div className={`absolute ${useRabbitMode ? 'top-[calc(100%+20px)]' : 'top-[450px] right-[50px]'} bottom-0 flex items-center justify-end`}>
                    {config.enableResponseTimes && (
                      <p className="text-xs text-gray-500">Message response time: +{message.responseTime.toFixed(2)} seconds</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {config.enableSettingsUIToggle && (
        <div
          className="absolute bottom-7 left-7 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer"
          onClick={handleSettingsClick}
        >
          <img
            src={showSettings ? "https://upload.wikimedia.org/wikipedia/commons/a/a0/OOjs_UI_icon_close.svg" : "https://upload.wikimedia.org/wikipedia/commons/2/20/Factotum_gear_icon.svg"}
            alt={showSettings ? "Close Settings" : "Settings"}
            className="w-6 h-6"
          />
        </div>
      )}
      {showSettings && (
        <Settings
          useLudicrousMode={useLudicrousMode}
          useTTS={useTTS}
          useInternet={useInternet}
          usePhotos={usePhotos}
          useRabbitMode={useRabbitMode}
          onLudicrousModeToggle={handleLudicrousModeToggle}
          onTTSToggle={handleTTSToggle}
          onInternetToggle={handleInternetToggle}
          onPhotosToggle={() => setUsePhotos(!usePhotos)}
          onRabbitModeToggle={handleRabbitModeToggle}
          setTTS={setUseTTS}
          setInternet={setUseInternet}
          setPhotos={setUsePhotos}
        />
      )}
      {config.useAttributionComponent && (
        <AttributionComponent usePhotos={usePhotos} useInternet={useInternet} useTTS={useTTS} useRateLimiting={config.useRateLimiting} />
      )}
    </div>
  );
};
export default Main;