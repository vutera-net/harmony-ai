import { ClaudeProvider } from "./providers/claude";
import { OpenAIProvider } from "./providers/openai";
import { MockAIProvider } from "./providers/mock";
import { AILayerProvider } from "./types";

export function getAIProvider(): AILayerProvider {
  const provider = process.env.AI_PROVIDER || "claude";
  
  switch (provider.toLowerCase()) {
    case "openai":
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is required for OpenAI provider");
      }
      return new OpenAIProvider(process.env.OPENAI_API_KEY);
    case "mock":
      return new MockAIProvider();
    case "claude":
    default:
      if (!process.env.ANTHROPIC_API_KEY) {
        // Fallback to mock in dev if key is missing
        if (process.env.NODE_ENV === "development") {
          console.warn("ANTHROPIC_API_KEY missing, falling back to MockAIProvider");
          return new MockAIProvider();
        }
        throw new Error("ANTHROPIC_API_KEY is required for Claude provider");
      }
      return new ClaudeProvider(process.env.ANTHROPIC_API_KEY);
  }
}

export * from "./types";
