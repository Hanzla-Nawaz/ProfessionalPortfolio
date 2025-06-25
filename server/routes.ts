import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateImage, generateVideo, analyzePrompt } from "./ai-generation";
import * as fs from "fs";
import * as path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Invalid email format" 
        });
      }
      
      // Log the contact form submission (in production, you'd send an email or store in database)
      console.log("Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      
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

  const httpServer = createServer(app);
  return httpServer;
}
