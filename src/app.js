import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;

        // Validation: Ensure a prompt was provided
        if (!userPrompt) {
            return res.status(400).json({ error: "Please provide a 'prompt' in the request body." });
        }

        // Call the Gemini API
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: userPrompt,
        });

        // Send the AI's response back to the client
        res.json({ 
            success: true, 
            reply: response.text 
        });

    } catch (error) {
        console.error("Error communicating with Gemini:", error);
        res.status(500).json({ 
            success: false, 
            error: "An error occurred while generating content." 
        });
    }
});

export default app; 