import { getSession } from '@/lib/session';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: 'GEMINI_API_KEY is missing. Please set it in your environment variables.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { title, targetAudience, content } = await request.json();

    const prompt = `
      You are an expert startup advisor and pitch coach. Please review the following pitch.
      
      Pitch Title: ${title || 'Untitled'}
      Target Audience: ${targetAudience || 'General Audience'}
      
      Pitch Content:
      ${content}
      
      Please analyze this pitch and provide structured feedback. Your response MUST be formatted strictly using Markdown with the following 4 headers (do not change the headers):
      
      ### Strengths
      (List the strongest parts of the pitch)
      
      ### Weaknesses
      (List the areas that need improvement)
      
      ### Suggested Improvements
      (Provide actionable advice)
      
      ### Rewritten Version
      (Provide a polished, completely rewritten version of the pitch tailored to the target audience)
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ success: true, text });
  } catch (error) {
    console.error('AI Polish Error:', error);
    return Response.json({ error: 'Failed to generate AI feedback. Please try again.' }, { status: 500 });
  }
}
