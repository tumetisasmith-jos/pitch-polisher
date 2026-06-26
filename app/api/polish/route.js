import { GoogleGenerativeAI } from "@google/generative-ai";

const MIN_PITCH_LENGTH = 50;
const MAX_PITCH_LENGTH = 10000;
const REQUEST_TIMEOUT_MS = 30000;

export async function POST(request) {
  try {
    const { title, targetAudience, content } = await request.json();

    // ── Input Validation ────────────────────────────────────────
    if (!content || content.trim().length === 0) {
      return Response.json(
        { error: "No pitch detected. Please enter your startup pitch before requesting AI analysis." },
        { status: 400 }
      );
    }

    if (content.trim().length < MIN_PITCH_LENGTH) {
      return Response.json(
        { error: `Your pitch is too short (${content.trim().length} characters). Please write at least ${MIN_PITCH_LENGTH} characters for meaningful AI analysis.` },
        { status: 400 }
      );
    }

    if (content.trim().length > MAX_PITCH_LENGTH) {
      return Response.json(
        { error: `Your pitch exceeds the maximum length of ${MAX_PITCH_LENGTH.toLocaleString()} characters. Please shorten it and try again.` },
        { status: 400 }
      );
    }

    // ── API Key Validation ──────────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "The Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable." },
        { status: 503 }
      );
    }

    // ── Build Prompt ────────────────────────────────────────────
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

    // ── Call Gemini with Timeout ─────────────────────────────────
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let text;
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(promptText, { signal: controller.signal });

      text = result.response.text();
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    } catch (aiError) {
      clearTimeout(timeout);

      // Timeout / Abort
      if (aiError.name === 'AbortError' || aiError.message?.includes('abort')) {
        return Response.json(
          { error: "The AI request timed out. This usually means the server is busy. Please retry in a moment." },
          { status: 504 }
        );
      }

      const errorMsg = aiError.message || '';
      const status = aiError.status || aiError.httpStatusCode || 0;

      // Invalid API Key
      if (status === 401 || status === 403 || errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('PERMISSION_DENIED')) {
        return Response.json(
          { error: "The Gemini API key is invalid or has been revoked. Please check your API key configuration." },
          { status: 401 }
        );
      }

      // Quota Exceeded / Rate Limited
      if (status === 429 || errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('quota') || errorMsg.includes('rate')) {
        return Response.json(
          { error: "Your Gemini API quota has been exceeded. Please wait a few minutes and try again, or upgrade your API plan." },
          { status: 429 }
        );
      }

      // Network / Fetch Failures
      if (errorMsg.includes('fetch') || errorMsg.includes('ENOTFOUND') || errorMsg.includes('ECONNREFUSED') || errorMsg.includes('network')) {
        return Response.json(
          { error: "Unable to contact the Gemini API right now. Please check your internet connection and try again." },
          { status: 502 }
        );
      }

      // Generic Gemini error
      return Response.json(
        { error: "Something went wrong while analyzing your pitch. Please try again." },
        { status: 500 }
      );
    } finally {
      clearTimeout(timeout);
    }

    // ── Validate JSON Response ──────────────────────────────────
    try {
      JSON.parse(text);
    } catch {
      return Response.json(
        { error: "The AI returned an unexpected response format. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ success: true, text });
  } catch (error) {
    // Catch-all: never expose raw stack traces
    console.error('Polish API error:', error);
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
