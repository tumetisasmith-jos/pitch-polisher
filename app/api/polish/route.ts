import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return Response.json({ error: 'GEMINI_API_KEY is missing in environment.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { title, targetAudience, content } = await request.json();

    const prompt = `
      You are an expert startup advisor and pitch coach. Please review the following pitch.
      
      Pitch Title: ${title || 'Untitled'}
      Target Audience: ${targetAudience || 'General Audience'}
      
      Pitch Content:
      ${content}
      
      Please analyze this pitch and provide structured feedback. Your response MUST be formatted strictly using Markdown with the following 4 headers:
      
      ### Strengths
      ### Weaknesses
      ### Suggested Improvements
      ### Rewritten Version
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ success: true, text });
  } catch (error) {
    console.error('AI Polish Error:', error);
    return Response.json({ error: 'Failed to generate AI feedback.' }, { status: 500 });
  }
}
