'use server';

import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

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


