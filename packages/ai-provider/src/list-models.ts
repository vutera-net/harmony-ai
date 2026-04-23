import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    // Note: listModels is a method of the genAI object in some versions or needs a separate client
    // Actually, in @google/generative-ai, there isn't a direct listModels on the genAI instance.
    // It's typically part of the REST API or a different client.
    // But let's check if we can use it.
    console.log("Attempting to list models...");
    // According to docs, listModels is not in the JS SDK but available via REST.
    // Let's use curl via bash instead.
  } catch (e) {
    console.error(e);
  }
}

listModels();
