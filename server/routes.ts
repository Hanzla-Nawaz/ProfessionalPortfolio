import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateImage, generateVideo, analyzePrompt } from "./ai-generation";
import { modelManager, initializeDefaultModels } from "./model-manager";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize default models
  await initializeDefaultModels(modelManager);

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate using schema
      const contactData = insertContactSchema.parse(req.body);
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email)) {
        return res.status(400).json({ 
          message: "Invalid email format" 
        });
      }
      
      // Store in database
      await storage.createContact(contactData);
      
      // Send success response
      res.json({ 
        message: "Message sent successfully. Thank you for your contact!" 
      });
      
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Internal server error. Please try again later." 
      });
    }
  });

  // AI Image Generation endpoint
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ 
          message: "Prompt is required" 
        });
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const timestamp = Date.now();
      const imagePath = path.join(uploadsDir, `generated_image_${timestamp}.png`);
      
      const result = await generateImage(prompt, imagePath);
      
      if (result.success && result.imagePath) {
        // Convert to base64 for sending to frontend
        const imageBuffer = fs.readFileSync(result.imagePath);
        const base64Image = imageBuffer.toString('base64');
        
        res.json({
          success: true,
          image: `data:image/png;base64,${base64Image}`,
          message: "Image generated successfully!"
        });
        
        // Clean up the file after sending
        fs.unlinkSync(result.imagePath);
      } else {
        res.status(500).json({
          success: false,
          message: result.error || "Failed to generate image"
        });
      }
      
    } catch (error) {
      console.error("Image generation error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during image generation"
      });
    }
  });

  // AI Video Generation endpoint
  app.post("/api/generate-video", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ 
          message: "Prompt is required" 
        });
      }

      const uploadsDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const timestamp = Date.now();
      const videoPath = path.join(uploadsDir, `generated_video_${timestamp}.mp4`);
      
      const result = await generateVideo(prompt, videoPath);
      
      if (result.success) {
        // For now, return the concept text
        if (result.videoPath && fs.existsSync(result.videoPath)) {
          const conceptText = fs.readFileSync(result.videoPath, 'utf8');
          fs.unlinkSync(result.videoPath); // Clean up
          
          res.json({
            success: true,
            concept: conceptText,
            message: result.error || "Video concept generated successfully!"
          });
        } else {
          res.json({
            success: true,
            concept: "Video generation initiated",
            message: "Video concept created"
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: result.error || "Failed to generate video"
        });
      }
      
    } catch (error) {
      console.error("Video generation error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during video generation"
      });
    }
  });

  // Prompt Analysis endpoint
  app.post("/api/analyze-prompt", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ 
          message: "Prompt is required" 
        });
      }

      const analysis = await analyzePrompt(prompt);
      
      res.json({
        success: true,
        analysis,
        message: "Prompt analyzed successfully!"
      });
      
    } catch (error) {
      console.error("Prompt analysis error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during prompt analysis"
      });
    }
  });

  // Model Management endpoints
  app.get("/api/models", async (req, res) => {
    try {
      const models = await modelManager.getModels();
      res.json({ success: true, models });
    } catch (error) {
      console.error("Error fetching models:", error);
      res.status(500).json({ success: false, message: "Failed to fetch models" });
    }
  });

  app.get("/api/models/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const model = await modelManager.getModelById(id);
      
      if (!model) {
        return res.status(404).json({ success: false, message: "Model not found" });
      }
      
      res.json({ success: true, model });
    } catch (error) {
      console.error("Error fetching model:", error);
      res.status(500).json({ success: false, message: "Failed to fetch model" });
    }
  });

  app.post("/api/models/:id/predict", async (req, res) => {
    try {
      const { id } = req.params;
      const { inputData } = req.body;
      
      if (!inputData) {
        return res.status(400).json({ success: false, message: "Input data is required" });
      }

      const prediction = await modelManager.predictWithModel(id, inputData);
      res.json({ success: true, prediction });
    } catch (error) {
      console.error("Model prediction error:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Prediction failed" 
      });
    }
  });

  app.post("/api/models/:id/report", async (req, res) => {
    try {
      const { id } = req.params;
      const report = await modelManager.generateModelReport(id);
      res.json({ success: true, report });
    } catch (error) {
      console.error("Model report generation error:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Report generation failed" 
      });
    }
  });

  app.post("/api/models/register", async (req, res) => {
    try {
      const modelInfo = req.body;
      
      // Validate required fields
      if (!modelInfo.name || !modelInfo.type || !modelInfo.description) {
        return res.status(400).json({ 
          success: false, 
          message: "Name, type, and description are required" 
        });
      }

      const modelId = await modelManager.registerModel(modelInfo);
      res.json({ success: true, modelId, message: "Model registered successfully" });
    } catch (error) {
      console.error("Model registration error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to register model" 
      });
    }
  });

  app.delete("/api/models/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await modelManager.deleteModel(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Model not found" });
      }
      
      res.json({ success: true, message: "Model deleted successfully" });
    } catch (error) {
      console.error("Model deletion error:", error);
      res.status(500).json({ success: false, message: "Failed to delete model" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
