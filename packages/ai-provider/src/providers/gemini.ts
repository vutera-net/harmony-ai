import { GoogleGenerativeAI } from "@google/generative-ai";
import { AILayerProvider, AIMessage } from "../types";

export class GeminiProvider implements AILayerProvider {
  name = "Gemini";
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateResponse(
    systemPrompt: string,
    messages: AIMessage[],
    options = { maxTokens: 2048, temperature: 0.7 }
  ): Promise<ReadableStream<Uint8Array>> {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: systemPrompt,
    });

    const history = messages
      .filter(m => m.role !== "system")
      .slice(0, -1)
      .map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const lastMessage = messages
      .filter(m => m.role !== "system")
      .pop()?.content || "";

    return new ReadableStream({
      start: async (controller) => {
        const encoder = new TextEncoder();
        try {
          const chat = model.startChat({
            history: history,
            generationConfig: {
              maxOutputTokens: options.maxTokens,
              temperature: options.temperature,
            },
          });

          const result = await chat.sendMessageStream(lastMessage);

          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          console.error("GeminiProvider Error:", error);
          controller.error(error);
          controller.close();
        }
      },
    });
  }
}
