import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getSession();
  if (!session.user) {
    redirect('/login');
  }

  const userId = session.user.id;
  const pitches = db.prepare('SELECT * FROM pitches WHERE user_id = ? ORDER BY updated_at DESC').all(userId);

  const totalPitches = pitches.length;
  const todayActivity = pitches.filter(p => {
    const today = new Date().toDateString();
    return new Date(p.updated_at).toDateString() === today || new Date(p.created_at).toDateString() === today;
  }).length;
  
  const recentPitches = pitches.slice(0, 6);

  // Calculate a simple "streak" based on recent activity
  const thisWeek = pitches.filter(p => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(p.updated_at) > weekAgo;
  }).length;

  return (
    <div className="slide-up">
      {/* Welcome Hero */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <div>
            <p className="muted" style={{ fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              Welcome back
            </p>
            <h2 className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>
              {session.user.username}
            </h2>
            <p className="muted" style={{ marginTop: '0.5rem' }}>
              {totalPitches === 0 
                ? "Ready to craft your first winning pitch?" 
                : `You have ${totalPitches} pitch${totalPitches !== 1 ? 'es' : ''} in your workspace.`
              }
            </p>
          </div>
          <Link href="/pitches/new" className="button accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"/>
            </svg>
            New Pitch
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats">
        <div className="stat-box">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h2>{totalPitches}</h2>
          <p>Total Pitches</p>
        </div>
        <div className="stat-box">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h2>{todayActivity}</h2>
          <p>Today's Activity</p>
        </div>
        <div className="stat-box">
          <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h2>{thisWeek}</h2>
          <p>This Week</p>
        </div>
      </div>

      {/* Recent Pitches */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          Recent Pitches
        </h3>
        {totalPitches > 0 && (
          <Link href="/pitches" className="muted" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
            View all →
          </Link>
        )}
      </div>

      {recentPitches.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>✨</div>
          <h3 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>No pitches yet</h3>
          <p className="muted" style={{ marginBottom: '1.5rem' }}>Start crafting your first AI-powered pitch and get instant feedback!</p>
          <Link href="/pitches/new" className="button" style={{ padding: '0.65rem 1.5rem' }}>
            Create Your First Pitch
          </Link>
        </div>
      ) : (
        <div className="grid">
          {recentPitches.map((pitch, index) => (
            <Link href={`/pitches/${pitch.id}`} key={pitch.id} className="card pitch-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ flex: 1 }}>{pitch.title}</h3>
                <span className="badge">{pitch.target_audience || 'General'}</span>
              </div>
              <p style={{ marginBottom: '1rem' }}>{pitch.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="muted" style={{ fontSize: '0.8rem' }}>
                  {new Date(pitch.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500 }}>
                  Edit →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
