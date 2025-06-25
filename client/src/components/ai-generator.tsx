import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Image as ImageIcon, Video, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function AIGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [videoConcept, setVideoConcept] = useState("");
  const [promptAnalysis, setPromptAnalysis] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("image");
  const { toast } = useToast();

  const handleImageGeneration = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiRequest({
        url: "/api/generate-image",
        method: "POST",
        body: { prompt },
      });

      if (response.success) {
        setGeneratedImage(response.image);
        toast({
          title: "Image generated!",
          description: "Your AI-generated image is ready.",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoGeneration = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate a video concept.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiRequest({
        url: "/api/generate-video",
        method: "POST",
        body: { prompt },
      });

      if (response.success) {
        setVideoConcept(response.concept);
        toast({
          title: "Video concept generated!",
          description: response.message || "Your video concept is ready.",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Video generation error:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate video concept. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePromptAnalysis = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await apiRequest({
        url: "/api/analyze-prompt",
        method: "POST",
        body: { prompt },
      });

      if (response.success) {
        setPromptAnalysis(response.analysis);
        toast({
          title: "Analysis complete!",
          description: "Your prompt has been analyzed for optimization.",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Prompt analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const samplePrompts = [
    "A futuristic AI laboratory with holographic displays and neural networks",
    "A serene mountain landscape with aurora borealis dancing in the sky",
    "A cyberpunk cityscape with neon lights and flying vehicles",
    "An underwater scene with bioluminescent creatures and coral reefs",
  ];

  const handleSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-900">AI Content Generator</h2>
        </div>
        <p className="text-lg text-gray-600">
          Experience the power of AI-generated content using Google's Gemini model
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Enter Your Creative Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Describe what you want to generate... Be creative and detailed!"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Try these sample prompts:</p>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((sample, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSamplePrompt(sample)}
                  >
                    {sample.length > 50 ? sample.substring(0, 50) + "..." : sample}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handlePromptAnalysis}
                disabled={isAnalyzing || !prompt.trim()}
                variant="outline"
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Analyze Prompt
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Image Generation
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Video Concept
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                AI Image Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleImageGeneration}
                disabled={isGenerating || !prompt.trim()}
                className="w-full mb-4"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Image...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>

              {generatedImage && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Generated Image:</h4>
                  <img
                    src={generatedImage}
                    alt="AI Generated"
                    className="w-full rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                AI Video Concept Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleVideoGeneration}
                disabled={isGenerating || !prompt.trim()}
                className="w-full mb-4"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Concept...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Video Concept
                  </>
                )}
              </Button>

              {videoConcept && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Video Concept:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="whitespace-pre-wrap text-gray-700">{videoConcept}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {promptAnalysis && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Prompt Analysis & Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 whitespace-pre-wrap">{promptAnalysis}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Powered by Google Gemini AI • Built with modern web technologies
        </p>
      </div>
    </div>
  );
}