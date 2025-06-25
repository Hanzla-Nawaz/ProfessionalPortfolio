import * as fs from "fs";
import * as path from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ModelInfo {
  id: string;
  name: string;
  type: 'transformer' | 'resnet50' | 'sklearn';
  description: string;
  accuracy?: number;
  trainedOn: string;
  size: string;
  filePath: string;
  metadata: {
    framework: string;
    inputShape?: string;
    outputClasses?: string[];
    hyperparameters?: Record<string, any>;
  };
}

export class ModelManager {
  private modelsDir: string;
  private modelsMetadata: ModelInfo[];

  constructor() {
    this.modelsDir = path.join(process.cwd(), "models");
    this.ensureModelsDirectory();
    this.modelsMetadata = this.loadModelsMetadata();
  }

  private ensureModelsDirectory() {
    if (!fs.existsSync(this.modelsDir)) {
      fs.mkdirSync(this.modelsDir, { recursive: true });
    }
  }

  private loadModelsMetadata(): ModelInfo[] {
    const metadataPath = path.join(this.modelsDir, "models_metadata.json");
    if (fs.existsSync(metadataPath)) {
      try {
        return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      } catch (error) {
        console.error("Error loading models metadata:", error);
        return [];
      }
    }
    return [];
  }

  private saveModelsMetadata() {
    const metadataPath = path.join(this.modelsDir, "models_metadata.json");
    fs.writeFileSync(metadataPath, JSON.stringify(this.modelsMetadata, null, 2));
  }

  async registerModel(modelInfo: Omit<ModelInfo, 'id'>): Promise<string> {
    const id = `model_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newModel: ModelInfo = {
      id,
      ...modelInfo
    };
    
    this.modelsMetadata.push(newModel);
    this.saveModelsMetadata();
    return id;
  }

  getModels(): ModelInfo[] {
    return this.modelsMetadata;
  }

  getModelById(id: string): ModelInfo | undefined {
    return this.modelsMetadata.find(model => model.id === id);
  }

  async predictWithModel(modelId: string, inputData: any): Promise<any> {
    const model = this.getModelById(modelId);
    if (!model) {
      throw new Error(`Model with ID ${modelId} not found`);
    }

    // For demonstration, we'll simulate model predictions
    // In a real implementation, you'd load and run the actual models
    switch (model.type) {
      case 'transformer':
        return this.simulateTransformerPrediction(model, inputData);
      case 'resnet50':
        return this.simulateResNetPrediction(model, inputData);
      case 'sklearn':
        return this.simulateSklearnPrediction(model, inputData);
      default:
        throw new Error(`Unsupported model type: ${model.type}`);
    }
  }

  private async simulateTransformerPrediction(model: ModelInfo, inputText: string) {
    // Use Gemini to simulate transformer-like text analysis
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze this text using a ${model.name} approach: "${inputText}". Provide sentiment, entities, and key insights.`,
      });

      return {
        modelUsed: model.name,
        prediction: response.text || "Analysis completed",
        confidence: Math.random() * 0.3 + 0.7, // Simulate 70-100% confidence
        processingTime: Math.random() * 200 + 50 // 50-250ms
      };
    } catch (error) {
      throw new Error(`Transformer prediction failed: ${error}`);
    }
  }

  private simulateResNetPrediction(model: ModelInfo, imageDescription: string) {
    // Simulate image classification
    const classes = model.metadata.outputClasses || [
      'cat', 'dog', 'bird', 'car', 'plane', 'ship', 'truck', 'deer', 'frog', 'horse'
    ];
    
    const predictions = classes.map(cls => ({
      class: cls,
      confidence: Math.random()
    })).sort((a, b) => b.confidence - a.confidence);

    return {
      modelUsed: model.name,
      topPredictions: predictions.slice(0, 3),
      processingTime: Math.random() * 100 + 30 // 30-130ms
    };
  }

  private simulateSklearnPrediction(model: ModelInfo, features: number[]) {
    // Simulate sklearn model prediction
    const prediction = Math.random() > 0.5 ? 1 : 0;
    const probability = Math.random() * 0.4 + 0.6; // 60-100% probability

    return {
      modelUsed: model.name,
      prediction,
      probability,
      featureImportance: features.map((_, idx) => ({
        feature: `feature_${idx + 1}`,
        importance: Math.random()
      })).sort((a, b) => b.importance - a.importance),
      processingTime: Math.random() * 50 + 10 // 10-60ms
    };
  }

  async generateModelReport(modelId: string): Promise<string> {
    const model = this.getModelById(modelId);
    if (!model) {
      throw new Error(`Model with ID ${modelId} not found`);
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: `Generate a detailed technical report for this ML model:
        
        Name: ${model.name}
        Type: ${model.type}
        Framework: ${model.metadata.framework}
        Accuracy: ${model.accuracy}%
        Trained on: ${model.trainedOn}
        
        Include sections on: Architecture Overview, Performance Metrics, Use Cases, Technical Specifications, and Deployment Considerations.`,
      });

      return response.text || "Report generation failed";
    } catch (error) {
      throw new Error(`Report generation failed: ${error}`);
    }
  }

  deleteModel(modelId: string): boolean {
    const index = this.modelsMetadata.findIndex(model => model.id === modelId);
    if (index === -1) {
      return false;
    }

    const model = this.modelsMetadata[index];
    
    // Delete model file if it exists
    if (fs.existsSync(model.filePath)) {
      try {
        fs.unlinkSync(model.filePath);
      } catch (error) {
        console.error(`Error deleting model file: ${error}`);
      }
    }

    // Remove from metadata
    this.modelsMetadata.splice(index, 1);
    this.saveModelsMetadata();
    return true;
  }
}

// Initialize default models for demonstration
export function initializeDefaultModels(manager: ModelManager) {
  const defaultModels: Omit<ModelInfo, 'id'>[] = [
    {
      name: "BERT Sentiment Analyzer",
      type: "transformer",
      description: "Fine-tuned BERT model for sentiment analysis of product reviews",
      accuracy: 94.2,
      trainedOn: "Amazon Product Reviews Dataset (50K samples)",
      size: "435 MB",
      filePath: path.join(process.cwd(), "models", "bert_sentiment.bin"),
      metadata: {
        framework: "PyTorch + Transformers",
        inputShape: "Variable length text (max 512 tokens)",
        outputClasses: ["negative", "neutral", "positive"],
        hyperparameters: {
          learning_rate: 2e-5,
          batch_size: 16,
          epochs: 3
        }
      }
    },
    {
      name: "ResNet50 Image Classifier",
      type: "resnet50",
      description: "Pre-trained ResNet50 fine-tuned for custom image classification",
      accuracy: 89.7,
      trainedOn: "Custom dataset + ImageNet transfer learning",
      size: "98 MB",
      filePath: path.join(process.cwd(), "models", "resnet50_custom.h5"),
      metadata: {
        framework: "TensorFlow/Keras",
        inputShape: "224x224x3",
        outputClasses: ["cat", "dog", "bird", "car", "plane"],
        hyperparameters: {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 20
        }
      }
    },
    {
      name: "Random Forest Predictor",
      type: "sklearn",
      description: "Ensemble model for tabular data prediction and feature importance analysis",
      accuracy: 91.5,
      trainedOn: "Structured business dataset (10K records)",
      size: "12 MB",
      filePath: path.join(process.cwd(), "models", "rf_predictor.joblib"),
      metadata: {
        framework: "Scikit-learn",
        inputShape: "15 numerical features",
        outputClasses: ["class_0", "class_1"],
        hyperparameters: {
          n_estimators: 100,
          max_depth: 10,
          min_samples_split: 5
        }
      }
    }
  ];

  // Only add if no models exist
  if (manager.getModels().length === 0) {
    defaultModels.forEach(async (model) => {
      await manager.registerModel(model);
    });
  }
}

export const modelManager = new ModelManager();
initializeDefaultModels(modelManager);