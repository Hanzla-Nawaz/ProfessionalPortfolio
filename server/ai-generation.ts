import * as fs from "fs";
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateImage(
    prompt: string,
    outputPath: string
): Promise<{ success: boolean; imagePath?: string; error?: string }> {
    try {
        // Use Gemini's image generation model
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        const candidates = response.candidates;
        if (!candidates || candidates.length === 0) {
            return { success: false, error: "No image generated" };
        }

        const content = candidates[0].content;
        if (!content || !content.parts) {
            return { success: false, error: "No content in response" };
        }

        for (const part of content.parts) {
            if (part.inlineData && part.inlineData.data) {
                const imageData = Buffer.from(part.inlineData.data, "base64");
                fs.writeFileSync(outputPath, imageData);
                return { success: true, imagePath: outputPath };
            }
        }

        return { success: false, error: "No image data found in response" };
    } catch (error) {
        console.error("Image generation error:", error);
        return { success: false, error: `Failed to generate image: ${error}` };
    }
}

export async function generateVideo(
    prompt: string,
    outputPath: string
): Promise<{ success: boolean; videoPath?: string; error?: string }> {
    try {
        // For video generation, we'll use a text-to-video prompt approach
        // Note: Actual video generation might require specialized models
        const videoPrompt = `Create a detailed video concept for: ${prompt}. Include scene descriptions, camera movements, and visual elements.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: videoPrompt,
        });

        // For now, we'll create a concept description
        // In production, you'd integrate with actual video generation APIs
        const concept = response.text || "Video concept generated";
        
        // Create a simple text file with the video concept
        fs.writeFileSync(outputPath.replace('.mp4', '_concept.txt'), concept);
        
        return { 
            success: true, 
            videoPath: outputPath.replace('.mp4', '_concept.txt'),
            error: "Video generation is currently in concept mode. Full video generation coming soon!"
        };
    } catch (error) {
        console.error("Video generation error:", error);
        return { success: false, error: `Failed to generate video concept: ${error}` };
    }
}

export async function analyzePrompt(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze this creative prompt and suggest improvements for better AI generation results: "${prompt}"`,
        });

        return response.text || "No suggestions available";
    } catch (error) {
        console.error("Prompt analysis error:", error);
        return "Unable to analyze prompt at this time";
    }
}