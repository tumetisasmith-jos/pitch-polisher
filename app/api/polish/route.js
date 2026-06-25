import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { title, targetAudience, content } = await request.json();
    const promptText = `
      Review this pitch: 
      Title: ${title} 
      Target Audience: ${targetAudience} 
      Content: ${content}

      You must return ONLY a raw JSON object (without markdown code blocks) with the following structure:
      {
        "strengths": ["array of 2-3 strengths"],
        "weaknesses": ["array of 2-3 weaknesses"],
        "improvements": ["array of 2-3 suggested improvements"],
        "rewritten": "A fully rewritten and polished version of the pitch"
      }
    `;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(promptText);
    
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return Response.json({ success: true, text });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
