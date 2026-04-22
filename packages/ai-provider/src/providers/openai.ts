import OpenAI from "openai";
import { AILayerProvider, AIMessage } from "../types";

export class OpenAIProvider implements AILayerProvider {
  name = "OpenAI";
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
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
          const response = await this.client.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.filter(m => m.role !== "system").map(m => ({
                role: m.role as "user" | "assistant",
                content: m.content
              }))
            ],
            stream: true,
            max_tokens: options.maxTokens || 2048,
            temperature: options.temperature || 0.7,
          });

          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          console.error("OpenAIProvider Error:", error);
          controller.error(error);
          controller.close();
        }
      },
    });

    return stream;
  }
}
