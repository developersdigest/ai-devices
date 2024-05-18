import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from '../config';
import { traceable } from "langsmith/traceable";
import * as fal from "@fal-ai/serverless-client";

export const processImageWithGPT4o = async (imageFile: File, text: string): Promise<string> => {
    const imageData = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageData).toString('base64');
    const imageMessage = new HumanMessage({
        content: [
            {
                type: "text",
                text: `You are a helpful assistant and only respond in one sentence based on this image and the following text. You will not respond with anything else. ${text}`,
            },
            {
                type: "image_url",
                image_url: {
                    "url": `data:image/jpeg;base64,${imageBase64}`,
                }
            },
        ],
    });
    const chat = new ChatOpenAI({
        model: config.visionModel,
    });
    const res = await chat.invoke([imageMessage]);
    return res?.lc_kwargs?.content || "Sorry, I can't do that yet.";
};

export const processImageWithLllavaOnFalAI = traceable(async (imageFile: File, text: string): Promise<string> => {
    const imageData = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageData).toString('base64');
    const result: { output: string } = await fal.subscribe(`fal-ai/${config.visionModel}`, {
        input: {
            image_url: `data:image/jpeg;base64,${imageBase64}`,
            prompt: `Respond in one sentence based on this image and the following text and image ${text}`
        },
        logs: true,
        onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS" && update.logs) {
                update.logs.map((log) => log.message).forEach(console.log);
            }
        },
    });
    return result.output;
}, { name: 'processImageWithLllavaOnFalAI' });

export const processImageWithGoogleGenerativeAI = async (imageFile: File, text: string): Promise<string> => {
    const imageData = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageData).toString('base64');
    const visionModel = new ChatGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY,
        model: config.visionModel,
    });
    const input2 = [
        new AIMessage({
            content: [
                {
                    type: "text",
                    text: `You are a helpful assistant and only respond in one sentence based on this image and the following text. You will not respond with anything else.`,
                },
            ],
        }),
        new HumanMessage({
            content: [
                {
                    type: "text",
                    text: text,
                },
                {
                    type: "image_url",
                    image_url: `data:image/jpeg;base64,${imageBase64}`,
                },
            ],
        }),
    ];

    const res = await visionModel.invoke(input2);

    return String(res.content);
};