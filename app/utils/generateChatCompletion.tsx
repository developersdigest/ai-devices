import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";
import Groq from 'groq-sdk';
import { config } from '../config';
import { traceable } from "langsmith/traceable";

const groq = new Groq();

export const generateChatCompletion = traceable(async (responseText: string) => {
    let completion;
    if (config.inferenceModelProvider === 'openai') {
        const chat = new ChatOpenAI({
            model: config.inferenceModel,
            maxTokens: 1024,
        });
        const message = new HumanMessage(responseText);
        completion = await chat.invoke([message]);
        responseText = completion?.lc_kwargs?.content || "No information available.";
    } else if (config.inferenceModelProvider === 'groq') {
        completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant and only responds in one sentence. If you don't know the answer, rephrase the question that will be passed to the next model." },
                { role: "user", content: responseText },
            ],
            model: config.inferenceModel,
        });
        responseText = completion.choices[0].message.content;
    } else {
        throw new Error('Invalid inference model provider');
    }
    return responseText;
}, { name: 'generateChatCompletion' });