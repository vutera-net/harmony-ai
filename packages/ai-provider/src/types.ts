export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AILayerProvider {
  name: string;
  generateResponse(
    systemPrompt: string, 
    messages: AIMessage[], 
    options?: {
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<ReadableStream<Uint8Array>>;
}
