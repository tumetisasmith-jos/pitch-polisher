import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Pitches() {
  const session = await getSession();
  if (!session.user) redirect('/login');

  const pitches = db.prepare('SELECT * FROM pitches WHERE user_id = ? ORDER BY updated_at DESC').all(session.user.id);

  return (
    <div>
      <div className="header">
        <h2>My Pitches</h2>
        <Link href="/pitches/new" className="button">Create Pitch</Link>
      </div>

      {pitches.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <p className="muted">You haven't created any pitches yet.</p>
        </div>
      ) : (
        <div className="grid">
          {pitches.map(pitch => (
            <Link href={`/pitches/${pitch.id}`} key={pitch.id} className="card pitch-card">
              <h3>{pitch.title}</h3>
              <p style={{ marginBottom: '1rem' }}>{pitch.content}</p>
              <span className="muted" style={{ fontSize: '0.8rem' }}>
                Audience: {pitch.target_audience || 'General'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
