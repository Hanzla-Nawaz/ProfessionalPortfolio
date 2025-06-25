import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { staticModels, simulatePrediction, simulateContactSubmission, simulateAIGeneration } from "./api-static";

// Check if we're in static deployment mode (GitHub Pages)
const isStaticDeploy = import.meta.env.VITE_STATIC_DEPLOY === 'true' || 
                      (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

async function handleStaticApiRequest(method: string, url: string, body?: any) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 400));

  if (url === '/api/models') {
    return { success: true, models: staticModels };
  }

  if (url.startsWith('/api/models/') && url.endsWith('/predict')) {
    const modelId = url.split('/')[3];
    const prediction = simulatePrediction(modelId, body?.inputData);
    return { success: true, prediction };
  }

  if (url.startsWith('/api/models/') && url.endsWith('/report')) {
    const modelId = url.split('/')[3];
    const model = staticModels.find(m => m.id === modelId);
    return {
      success: true,
      report: `# ${model?.name} Technical Report\n\nThis is a demonstration report for the static GitHub Pages deployment. The full interactive version includes detailed AI-generated technical analysis.`
    };
  }

  if (url === '/api/contact') {
    const result = simulateContactSubmission(body);
    return result;
  }

  if (url === '/api/generate-image' || url === '/api/generate-video' || url === '/api/analyze-prompt') {
    return simulateAIGeneration(body?.prompt || 'demo');
  }

  throw new Error(`API endpoint ${url} not implemented in static mode`);
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Handle static API calls for GitHub Pages
  if (isStaticDeploy) {
    const result = await handleStaticApiRequest(method, url, data);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Handle static API calls
    if (isStaticDeploy) {
      const result = await handleStaticApiRequest('GET', queryKey[0] as string);
      return result;
    }

    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
