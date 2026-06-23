import { getSession } from '@/lib/session';
import db from '@/lib/db';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Simple auth for MVP
    let user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (!user) {
      // Auto register for demo purposes
      const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
      user = { id: result.lastInsertRowid, username };
    } else if (user.password !== password) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    const session = await getSession();
    session.user = { id: user.id, username: user.username };
    await session.save();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
