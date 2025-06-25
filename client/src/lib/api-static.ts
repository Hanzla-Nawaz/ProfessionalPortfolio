// Static API responses for GitHub Pages deployment
// Since GitHub Pages can't run Node.js, we'll use static data

export const staticModels = [
  {
    id: "model_bert_sentiment",
    name: "BERT Sentiment Analyzer",
    type: "transformer" as const,
    description: "Fine-tuned BERT model for sentiment analysis of product reviews",
    accuracy: 94.2,
    trainedOn: "Amazon Product Reviews Dataset (50K samples)",
    size: "435 MB",
    metadata: {
      framework: "PyTorch + Transformers",
      inputShape: "Variable length text (max 512 tokens)",
      outputClasses: ["negative", "neutral", "positive"],
      hyperparameters: {
        epochs: 3,
        batch_size: 16,
        learning_rate: 0.00002
      }
    }
  },
  {
    id: "model_resnet50_classifier",
    name: "ResNet50 Image Classifier",
    type: "resnet50" as const,
    description: "Pre-trained ResNet50 fine-tuned for custom image classification",
    accuracy: 89.7,
    trainedOn: "Custom dataset + ImageNet transfer learning",
    size: "98 MB",
    metadata: {
      framework: "TensorFlow/Keras",
      inputShape: "224x224x3",
      outputClasses: ["cat", "dog", "bird", "car", "plane"],
      hyperparameters: {
        epochs: 20,
        batch_size: 32,
        learning_rate: 0.001
      }
    }
  },
  {
    id: "model_random_forest",
    name: "Random Forest Predictor",
    type: "sklearn" as const,
    description: "Ensemble model for tabular data prediction and feature importance analysis",
    accuracy: 91.5,
    trainedOn: "Structured business dataset (10K records)",
    size: "12 MB",
    metadata: {
      framework: "Scikit-learn",
      inputShape: "15 numerical features",
      outputClasses: ["class_0", "class_1"],
      hyperparameters: {
        max_depth: 10,
        n_estimators: 100,
        min_samples_split: 5
      }
    }
  }
];

export const simulatePrediction = (modelId: string, inputData: any) => {
  const model = staticModels.find(m => m.id === modelId);
  if (!model) {
    throw new Error(`Model ${modelId} not found`);
  }

  // Simulate different prediction results based on model type
  switch (model.type) {
    case 'transformer':
      return {
        modelUsed: model.name,
        sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
        confidence: Math.random() * 0.4 + 0.6, // 0.6-1.0
        entities: ['product', 'quality'],
        processingTime: Math.random() * 100 + 50
      };
    
    case 'resnet50':
      return {
        modelUsed: model.name,
        topPredictions: model.metadata.outputClasses!.map(cls => ({
          class: cls,
          confidence: Math.random()
        })).sort((a, b) => b.confidence - a.confidence).slice(0, 3),
        processingTime: Math.random() * 200 + 50
      };
    
    case 'sklearn':
      return {
        modelUsed: model.name,
        prediction: Math.round(Math.random()),
        probability: Math.random() * 0.4 + 0.6,
        featureImportance: Array.from({length: 15}, (_, i) => ({
          feature: `feature_${i + 1}`,
          importance: Math.random()
        })).sort((a, b) => b.importance - a.importance),
        processingTime: Math.random() * 100 + 20
      };
    
    default:
      throw new Error(`Unsupported model type: ${model.type}`);
  }
};

export const simulateContactSubmission = (contactData: any) => {
  // In static deployment, we can't actually save to database
  // Could integrate with services like Formspree, Netlify Forms, etc.
  console.log('Contact form submitted:', contactData);
  return {
    success: true,
    message: "Thank you for your message! I'll get back to you soon."
  };
};

export const simulateAIGeneration = (prompt: string) => {
  // For static deployment, return a placeholder response
  return {
    success: true,
    message: "AI generation is available in the full deployment. This is a static demo version.",
    image: "data:image/svg+xml;base64," + btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f3f4f6"/>
        <text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="#6b7280">
          AI Image Generation Demo
        </text>
        <text x="200" y="180" text-anchor="middle" font-family="Arial" font-size="12" fill="#9ca3af">
          Prompt: ${prompt.substring(0, 30)}...
        </text>
      </svg>
    `)
  };
};