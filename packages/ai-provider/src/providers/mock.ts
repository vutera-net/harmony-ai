import { AILayerProvider, AIMessage } from "../types";

export class MockAIProvider implements AILayerProvider {
  name = "MockAI";

  async generateResponse(
    systemPrompt: string,
    messages: AIMessage[],
    options = { maxTokens: 2048, temperature: 0.7 }
  ): Promise<ReadableStream<Uint8Array>> {
    const responseText = `[MOCK RESPONSE] This is a simulated response from Master AI. 
System Prompt: ${systemPrompt.substring(0, 100)}...
Last User Message: ${messages[messages.length - 1]?.content || "No messages"}`;

    return new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const words = responseText.split(" ");
        let i = 0;
        
        const interval = setInterval(() => {
          if (i < words.length) {
            controller.enqueue(encoder.encode(words[i++] + " "));
          } else {
            clearInterval(interval);
            controller.close();
          }
        }, 50);
      },
    });
  }
}
