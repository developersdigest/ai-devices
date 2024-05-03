export const config = {
    // Inference settings
    inferenceModelProvider: 'groq', // 'groq' or 'openai'
    inferenceModel: 'llama3-8b-8192', // Groq: 'llama3-70b-8192' or 'llama3-8b-8192' OpenAI: 'gpt-4-turbo etc
    // Whisper settings
    whisperModelProvider: 'groq', // 'groq' or 'openai'
    whisperModel: 'whisper-large-v3', // Groq: 'whisper-large-v3' OpenAI: 'whisper-1'
    // TTS settings
    ttsModelProvider: 'openai', // only openai supported for now...
    ttsModel: 'tts-1', // only openai supported for now...s
    ttsvoice: 'alloy', // only openai supported for now... [alloy, echo, fable, onyx, nova, and shimmer]
    // Vision settings 
    visionModelProvider: 'openai', // 'openai' or 'fal.ai'
    visionModel: 'gpt-4-vision', // OpenAI: 'gpt-4-vision' Fal.ai: 'llava-next'
    // Function calling + conditionally rendered UI
    functionCallingModelProvider: 'openai', // 'openai' current only
    functionCallingModel: 'gpt-3.5-turbo', // OpenAI: 'gpt-3-5-turbo'
    // UI settings 
    enableResponseTimes: false, // OPTIONAL: Display response times for each message
    enableSettingsUIToggle: true,
    enableTextToSpeechUIToggle: true,
    enableInternetResultsUIToggle: true,
    enableUsePhotUIToggle: true,
    useAttributionComponent: false, // OPTIONAL: Use the attribution component to display the attribution of the AI models/services used
    // Rate limiting settings
    useRateLimiting: false, // OPTIONAL: Use Upstash rate limiting to limit the number of requests per user
    // Tracing with Langchain
    useLangSmith: true, // OPTIONAL: Use LangSmith by Langchain to trace the execution of the functions in the config.tsx set to true to use.
};