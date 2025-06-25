import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Image as ImageIcon, 
  BarChart3, 
  Play, 
  FileText, 
  Database,
  Cpu,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ModelInfo {
  id: string;
  name: string;
  type: 'transformer' | 'resnet50' | 'sklearn';
  description: string;
  accuracy?: number;
  trainedOn: string;
  size: string;
  metadata: {
    framework: string;
    inputShape?: string;
    outputClasses?: string[];
    hyperparameters?: Record<string, any>;
  };
}

interface PredictionResult {
  modelUsed: string;
  prediction?: any;
  topPredictions?: Array<{ class: string; confidence: number }>;
  probability?: number;
  featureImportance?: Array<{ feature: string; importance: number }>;
  confidence?: number;
  processingTime: number;
}

export default function ModelShowcase() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const [inputFeatures, setInputFeatures] = useState("");
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [modelReport, setModelReport] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: modelsData, isLoading: modelsLoading } = useQuery({
    queryKey: ['/api/models'],
    queryFn: () => apiRequest({ url: '/api/models' }),
  });

  const predictMutation = useMutation({
    mutationFn: async ({ modelId, inputData }: { modelId: string; inputData: any }) =>
      apiRequest({
        url: `/api/models/${modelId}/predict`,
        method: 'POST',
        body: { inputData }
      }),
    onSuccess: (data) => {
      setPredictionResult(data.prediction);
      toast({
        title: "Prediction completed!",
        description: `Model inference completed in ${data.prediction.processingTime.toFixed(0)}ms`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Prediction failed",
        description: error.message || "Failed to run model prediction",
        variant: "destructive",
      });
    }
  });

  const reportMutation = useMutation({
    mutationFn: async (modelId: string) =>
      apiRequest({
        url: `/api/models/${modelId}/report`,
        method: 'POST'
      }),
    onSuccess: (data) => {
      setModelReport(data.report);
      toast({
        title: "Report generated!",
        description: "Technical model report is ready for review",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Report generation failed",
        description: error.message || "Failed to generate model report",
        variant: "destructive",
      });
    }
  });

  const models: ModelInfo[] = modelsData?.models || [];
  const selectedModelInfo = models.find(m => m.id === selectedModel);

  const handlePredict = () => {
    if (!selectedModel) {
      toast({
        title: "Model required",
        description: "Please select a model before making predictions",
        variant: "destructive",
      });
      return;
    }

    const model = selectedModelInfo;
    if (!model) return;

    let inputData;
    if (model.type === 'transformer') {
      if (!inputText.trim()) {
        toast({
          title: "Input required",
          description: "Please enter text for transformer model prediction",
          variant: "destructive",
        });
        return;
      }
      inputData = inputText;
    } else if (model.type === 'sklearn') {
      if (!inputFeatures.trim()) {
        toast({
          title: "Features required",
          description: "Please enter comma-separated numerical features",
          variant: "destructive",
        });
        return;
      }
      try {
        inputData = inputFeatures.split(',').map(f => parseFloat(f.trim()));
        if (inputData.some(isNaN)) {
          throw new Error("Invalid numbers");
        }
      } catch {
        toast({
          title: "Invalid input",
          description: "Please enter valid comma-separated numbers",
          variant: "destructive",
        });
        return;
      }
    } else {
      inputData = inputText || "A sample image for classification";
    }

    predictMutation.mutate({ modelId: selectedModel, inputData });
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'transformer': return <Brain className="w-5 h-5" />;
      case 'resnet50': return <ImageIcon className="w-5 h-5" />;
      case 'sklearn': return <BarChart3 className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transformer': return 'bg-blue-100 text-blue-700';
      case 'resnet50': return 'bg-green-100 text-green-700';
      case 'sklearn': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (modelsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading ML models...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Database className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-900">ML Model Showcase</h2>
        </div>
        <p className="text-lg text-gray-600">
          Trained models ready for inference: Transformer, ResNet50, and Scikit-learn
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {models.map((model) => (
          <Card 
            key={model.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedModel === model.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedModel(model.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {getModelIcon(model.type)}
                {model.name}
              </CardTitle>
              <Badge className={getTypeColor(model.type)}>{model.type}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{model.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span>Accuracy: {model.accuracy}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>Size: {model.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <span>{model.metadata.framework}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedModelInfo && (
        <Tabs defaultValue="inference" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inference" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Model Inference
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Model Details
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Technical Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inference" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Run Inference: {selectedModelInfo.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedModelInfo.type === 'transformer' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Input Text</label>
                    <Textarea
                      placeholder="Enter text for sentiment analysis or classification..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                )}

                {selectedModelInfo.type === 'resnet50' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Image Description</label>
                    <Textarea
                      placeholder="Describe an image for classification (e.g., 'A golden retriever playing in a park')..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Note: This demo uses text descriptions. In production, you'd upload actual images.
                    </p>
                  </div>
                )}

                {selectedModelInfo.type === 'sklearn' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Feature Values (comma-separated)
                    </label>
                    <Input
                      placeholder="1.2, 3.4, 0.8, 2.1, 0.9, 1.7, 2.3, 0.5, 3.2, 1.1, 0.6, 2.8, 1.4, 0.7, 2.0"
                      value={inputFeatures}
                      onChange={(e) => setInputFeatures(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Expected: {selectedModelInfo.metadata.inputShape}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handlePredict}
                  disabled={predictMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {predictMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Running Inference...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Prediction
                    </>
                  )}
                </Button>

                {predictionResult && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Prediction Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          Processing time: {predictionResult.processingTime.toFixed(0)}ms
                        </div>

                        {predictionResult.topPredictions && (
                          <div>
                            <h4 className="font-semibold mb-2">Top Predictions:</h4>
                            <div className="space-y-2">
                              {predictionResult.topPredictions.map((pred, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                  <span className="w-16 text-sm">{pred.class}</span>
                                  <Progress value={pred.confidence * 100} className="flex-1" />
                                  <span className="text-sm text-gray-600">
                                    {(pred.confidence * 100).toFixed(1)}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {predictionResult.prediction !== undefined && !predictionResult.topPredictions && (
                          <div>
                            <h4 className="font-semibold mb-2">Prediction:</h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <pre className="text-sm whitespace-pre-wrap">
                                {typeof predictionResult.prediction === 'string' 
                                  ? predictionResult.prediction 
                                  : JSON.stringify(predictionResult.prediction, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}

                        {predictionResult.featureImportance && (
                          <div>
                            <h4 className="font-semibold mb-2">Feature Importance:</h4>
                            <div className="space-y-1">
                              {predictionResult.featureImportance.slice(0, 5).map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm">
                                  <span className="w-20">{feat.feature}</span>
                                  <Progress value={feat.importance * 100} className="flex-1" />
                                  <span className="text-gray-600">{(feat.importance * 100).toFixed(1)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Framework:</span>
                      <span className="ml-2">{selectedModelInfo.metadata.framework}</span>
                    </div>
                    <div>
                      <span className="font-medium">Accuracy:</span>
                      <span className="ml-2">{selectedModelInfo.accuracy}%</span>
                    </div>
                    <div>
                      <span className="font-medium">Model Size:</span>
                      <span className="ml-2">{selectedModelInfo.size}</span>
                    </div>
                    <div>
                      <span className="font-medium">Input Shape:</span>
                      <span className="ml-2">{selectedModelInfo.metadata.inputShape}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Training Data:</span>
                      <p className="text-sm text-gray-600 mt-1">{selectedModelInfo.trainedOn}</p>
                    </div>
                    {selectedModelInfo.metadata.outputClasses && (
                      <div>
                        <span className="font-medium">Output Classes:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedModelInfo.metadata.outputClasses.map((cls, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedModelInfo.metadata.hyperparameters && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="font-semibold mb-3">Hyperparameters</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm">
                          {JSON.stringify(selectedModelInfo.metadata.hyperparameters, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Technical Model Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => reportMutation.mutate(selectedModel)}
                  disabled={reportMutation.isPending}
                  className="mb-4"
                >
                  {reportMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Technical Report
                    </>
                  )}
                </Button>

                {modelReport && (
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800">
                        {modelReport}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}