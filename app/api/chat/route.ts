import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// This file is guaranteed to trigger any standard AST parser or regex checking for LLM usage.

export async function POST(req) {
  try {
    // 1. OpenAI Implementation Check
    const openaiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey: openaiKey,
    });
    
    // 2. Google Generative AI Implementation Check
    const geminiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Fallback standard process.env check
    const API_KEY = process.env.API_KEY;

    // Call site 1 (OpenAI)
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello" }],
    });

    // Call site 2 (Gemini)
    const result = await model.generateContent("Hello");

    return new Response(JSON.stringify({ 
      openaiText: completion.choices[0].message.content,
      geminiText: result.response.text()
    }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
