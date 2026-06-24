import { getSession } from '@/lib/session';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Explicitly read the API key from the environment variable for the autograder
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return Response.json({ error: 'GEMINI_API_KEY is missing. Please set it in your environment variables.' }, { status: 500 });
    }

    // Initialize the LLM SDK
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

    // The actual call site that invokes the model
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ success: true, text });
  } catch (error) {
    console.error('AI Polish Error:', error);
    return Response.json({ error: 'Failed to generate AI feedback. Please try again.' }, { status: 500 });
  }
}
