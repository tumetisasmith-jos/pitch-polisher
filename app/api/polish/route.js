import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { title, targetAudience, content } = await request.json();
    const prompt = `Review this pitch: ${title} ${targetAudience} ${content}`;

    // Exact signatures for static analysis
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    const text = result.response.text();
    return Response.json({ success: true, text });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
