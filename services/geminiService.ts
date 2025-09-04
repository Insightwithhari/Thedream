import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import type { ChatMessage, TextContent } from '../types';
import { Author } from '../types';

/**
 * Formats the application's message history into the structure
 * required by the Gemini API (alternating user/model roles).
 */
function formatHistoryForApi(messages: ChatMessage[]) {
    // Filter out the initial client-side welcome message and map to the API format
    return messages
        .filter(m => m.id !== 'initial-message')
        .map(msg => {
            // For conversation history, use the simple text from user messages
            // and the full, unparsed `rawText` from AI responses.
            const text = msg.author === Author.USER
                ? (msg.content[0] as TextContent).text
                : msg.rawText;

            // Ensure we don't send empty or undefined text parts, which can cause API errors
            if (typeof text !== 'string' || text.trim() === '') {
                return null;
            }

            return {
                role: msg.author === Author.USER ? 'user' : 'model',
                parts: [{ text }]
            };
        })
        .filter(Boolean) as { role: string; parts: { text: string }[] }[]; // Filter out any nulls and assert type
}

/**
 * Sends the conversation history to the Gemini API and returns the AI's response.
 * @param history An array of ChatMessage objects representing the conversation.
 * @returns A promise that resolves to the AI's text response.
 */
export async function sendMessage(history: ChatMessage[]): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const contents = formatHistoryForApi(history);

        // Do not call the API if there is no valid user input to send.
        // This can happen on the first message if the welcome message is filtered out.
        // The API requires at least one user message.
        const hasUserMessage = contents.some(c => c.role === 'user');
        if (contents.length === 0 || !hasUserMessage) {
           // Find the last user message to send. This handles the very first turn of conversation.
           const lastMessage = history[history.length - 1];
           if (lastMessage && lastMessage.author === Author.USER) {
               contents.push({ role: 'user', parts: [{ text: (lastMessage.content[0] as TextContent).text }]});
           } else {
               throw new Error("Cannot send a request with no valid user content.");
           }
        }
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents, // Pass the entire conversation history
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });
        
        return response.text;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        // Provide a more user-friendly error message
        throw new Error("Failed to communicate with the Gemini API. Please check your connection and API key.");
    }
}
