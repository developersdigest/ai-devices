export const config = {
    // Inference settings
    inferenceModelProvider: 'groq', // 'groq' or 'openai'
    inferenceModel: 'llama3-8b-8192', // Groq: 'llama3-70b-8192' or 'llama3-8b-8192'.. OpenAI: 'gpt-4-turbo etc

    // BELOW OPTIONAL are some options for the app to use
    
    // Whisper settings
    whisperModelProvider: 'openai', // 'groq' or 'openai'
    whisperModel: 'whisper-1', // Groq: 'whisper-large-v3' OpenAI: 'whisper-1'

    // TTS settings
    ttsModelProvider: 'openai', // only openai supported for now...
    ttsModel: 'tts-1', // only openai supported for now...s
    ttsvoice: 'alloy', // only openai supported for now... [alloy, echo, fable, onyx, nova, and shimmer]

    // OPTIONAL:Vision settings 
    visionModelProvider: 'openai', // 'openai' or 'fal.ai'
    visionModel: 'gpt-4-vision', // OpenAI: 'gpt-4-vision' Fal.ai: 'llava-next'

    // Function calling + conditionally rendered UI
    functionCallingModelProvider: 'openai', // 'openai' current only
    functionCallingModel: 'gpt-3.5-turbo', // OpenAI: 'gpt-3-5-turbo'

    // UI settings 
    enableResponseTimes: false, // Display response times for each message
    enableSettingsUIToggle: true, // Display the settings UI toggle
    enableTextToSpeechUIToggle: true, // Display the text to speech UI toggle
    enableInternetResultsUIToggle: true, // Display the internet results UI toggle
    enableUsePhotUIToggle: true, // Display the use photo UI toggle
    enabledRabbitMode: true, // Enable the rabbit mode UI toggle
    enabledLudicrousMode: true, // Enable the ludicrous mode UI toggle
    useAttributionComponent: false, // Use the attribution component to display the attribution of the AI models/services used

    // Rate limiting settings
    useRateLimiting: false, // Use Upstash rate limiting to limit the number of requests per user

    // Tracing with Langchain
    useLangSmith: true, // Use LangSmith by Langchain to trace the execution of the functions in the config.tsx set to true to use.
};