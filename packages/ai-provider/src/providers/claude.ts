import Anthropic from "@anthropic-ai/sdk";
import { AILayerProvider, AIMessage } from "../types";

export class ClaudeProvider implements AILayerProvider {
  name = "Claude";
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateResponse(
    systemPrompt: string,
    messages: AIMessage[],
    options = { maxTokens: 2048, temperature: 0.7 }
  ): Promise<ReadableStream<Uint8Array>> {
    const stream = new ReadableStream({
      start: async (controller) => {
        const encoder = new TextEncoder();
        try {
          const response = await this.client.messages.stream({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: options.maxTokens || 2048,
            temperature: options.temperature || 0.7,
            system: systemPrompt,
            messages: messages.filter(m => m.role !== "system").map(m => ({
              role: m.role as "user" | "assistant",
              content: m.content
            })),
          });

          for await (const chunk of response) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          console.error("ClaudeProvider Error:", error);
          controller.error(error);
          controller.close();
        }
      },
    });
    
    // Fix 'this' context for the stream
    return stream;
  }
}
