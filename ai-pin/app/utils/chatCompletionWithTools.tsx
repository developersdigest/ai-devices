import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

// tools
import { getCurrentWeather } from "./tools/getWeather";
import { searchSong } from "./tools/getSpotify";
import { getTime } from "./tools/getTime";
import { config } from '../config';

const tool_calls = new ChatOpenAI({
    model: "gpt-3.5-turbo",
}).bind({
    tools: [
        {
            type: "function",
            function: {
                name: "getCurrentWeather",
                description: "Retrieves the current weather conditions for a given city based on its latitude and longitude coordinates.",
                parameters: {
                    type: "object",
                    properties: {
                        latitude: {
                            type: "number",
                            description: "The latitude coordinate of the city in decimal degrees.",
                        },
                        longitude: {
                            type: "number",
                            description: "The longitude coordinate of the city in decimal degrees.",
                        },
                    },
                    required: ["latitude", "longitude"]
                },
            },
        },
        {
            type: "function",
            function: {
                name: "searchSong",
                description: "Searches for a song on Spotify based on the provided search query and returns the track ID.",
                parameters: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "The search query to find a song on Spotify, such as the song title or artist name.",
                        },
                    },
                    required: ["query"],
                },
            },
        },
        {
            type: "function",
            function: {
                name: "getTime",
                description: "Retrieves the current time in the local time zone.",
                parameters: {
                    type: "object",
                    properties: {},
                    required: []
                },
            },
        }
    ],
    tool_choice: "auto",
});


export const chatCompletionWithTools = async (query: string) => {
    const res = await tool_calls.invoke([
        ["system", "You are a helpful assistant and only responds in one sentence. Use the tools included only if they are relevant to the query. ."],
        ["human", query],
    ]);
    const toolCalls = res.additional_kwargs.tool_calls;
    if (toolCalls && toolCalls.length > 0) {
        if (toolCalls[0].function.name === "getCurrentWeather") {
            const { function: { arguments: argString } } = toolCalls[0];
            const { latitude, longitude } = JSON.parse(argString);
            const weatherData = await getCurrentWeather(latitude, longitude);
            (weatherData);
            return {
                uiComponent: {
                    component: 'weather',
                    data: weatherData
                }
            };
        } else if (toolCalls[0].function.name === "searchSong") {
            const { function: { arguments: argString } } = toolCalls[0];
            const { query } = JSON.parse(argString);
            const trackId = await searchSong(query);
            return {
                uiComponent: {
                    component: 'spotify',
                    data: trackId
                }
            };
        } else if (toolCalls[0].function.name === "getTime") {
            const time = await getTime();
            return {
                uiComponent: {
                    component: 'time',
                    data: time
                }
            };
        } 
    } else {
        return { message: res?.lc_kwargs?.content };
    }
};

