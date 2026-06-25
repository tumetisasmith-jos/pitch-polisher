import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Pitches() {
  const session = await getSession();
  if (!session.user) redirect('/login');

  const pitches = db.prepare('SELECT * FROM pitches WHERE user_id = ? ORDER BY updated_at DESC').all(session.user.id);

  return (
    <div className="slide-up">
      <div className="header" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 800 }}>My Pitches</h2>
          <p className="muted" style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
            {pitches.length} pitch{pitches.length !== 1 ? 'es' : ''} in your workspace
          </p>
        </div>
        <Link href="/pitches/new" className="button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"/>
          </svg>
          New Pitch
        </Link>
      </div>

      {pitches.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📝</div>
          <h3 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>No pitches yet</h3>
          <p className="muted" style={{ marginBottom: '1.5rem' }}>Create your first pitch and let AI help you refine it!</p>
          <Link href="/pitches/new" className="button" style={{ padding: '0.65rem 1.5rem' }}>
            Create Your First Pitch
          </Link>
        </div>
      ) : (
        <div className="grid">
          {pitches.map((pitch, index) => (
            <Link href={`/pitches/${pitch.id}`} key={pitch.id} className="card pitch-card fade-in" style={{ animationDelay: `${index * 0.08}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ flex: 1 }}>{pitch.title}</h3>
              </div>
              <p style={{ marginBottom: '1.25rem' }}>{pitch.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge">{pitch.target_audience || 'General'}</span>
                </div>
                <span className="muted" style={{ fontSize: '0.8rem' }}>
                  {new Date(pitch.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
