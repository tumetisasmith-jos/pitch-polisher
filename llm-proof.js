import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

async function invokeLLM() {
  const result = await model.generateContent(
    "Test prompt for Conesta Forge Day 3"
  );

  return result.response.text();
}

invokeLLM();
