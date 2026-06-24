'use server';

import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function createPitch(formData) {
  const session = await getSession();
  if (!session.user) throw new Error('Unauthorized');

  const title = formData.get('title');
  const content = formData.get('content');
  const targetAudience = formData.get('targetAudience');

  const result = db.prepare(`
    INSERT INTO pitches (title, content, target_audience, user_id, updated_at) 
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `).run(title, content, targetAudience, session.user.id);

  redirect(`/pitches/${result.lastInsertRowid}`);
}

export async function updatePitch(id, formData) {
  const session = await getSession();
  if (!session.user) throw new Error('Unauthorized');

  const title = formData.get('title');
  const content = formData.get('content');
  const targetAudience = formData.get('targetAudience');

  db.prepare(`
    UPDATE pitches 
    SET title = ?, content = ?, target_audience = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `).run(title, content, targetAudience, id, session.user.id);

  redirect('/pitches');
}

export async function deletePitch(id) {
  const session = await getSession();
  if (!session.user) throw new Error('Unauthorized');

  db.prepare('DELETE FROM pitches WHERE id = ? AND user_id = ?').run(id, session.user.id);
  
  redirect('/pitches');
}

export async function generateAIFeedback(title, targetAudience, content) {
  const session = await getSession();
  if (!session.user) throw new Error('Unauthorized');

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing from environment variables.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
  return result.response.text();
}
