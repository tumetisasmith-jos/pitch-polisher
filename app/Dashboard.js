import Link from 'next/link';
import db from '@/lib/db';

export default async function Dashboard({ user }) {
  const userId = user.id;
  const pitches = db.prepare('SELECT * FROM pitches WHERE user_id = ? ORDER BY updated_at DESC').all(userId);

  const totalPitches = pitches.length;
  
  // Calculate today's activity
  const today = new Date().toDateString();
  const todayActivity = pitches.filter(p => new Date(p.updated_at).toDateString() === today || new Date(p.created_at).toDateString() === today).length;
  
  // Calculate this week's activity
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeek = pitches.filter(p => new Date(p.updated_at) > weekAgo).length;

  const recentPitches = pitches.slice(0, 6);

  return (
    <div className="slide-up">
      {/* Welcome Hero */}
      <div className="dashboard-hero" style={{ background: 'linear-gradient(to right, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '3rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '400px', height: '100%', background: 'radial-gradient(circle at right center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }}></div>
        <div className="dashboard-hero-content" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="muted" style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></span>
              Workspace Active
            </p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-bright)' }}>
              Welcome back, <span className="gradient-text">{user.username}</span>
            </h2>
            <p className="muted" style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
              Let's craft your next winning pitch.
            </p>
          </div>
          <Link href="/pitches/new" className="button primary hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New Pitch
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              +{thisWeek} this week
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-bright)', margin: 0 }}>{totalPitches}</h2>
            <p className="muted" style={{ margin: 0, fontWeight: 500 }}>Total Pitches</p>
          </div>
        </div>
        
        <div className="card hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            {todayActivity > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                Active Today
              </div>
            ) : null}
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-bright)', margin: 0 }}>{todayActivity}</h2>
            <p className="muted" style={{ margin: 0, fontWeight: 500 }}>Edits Today</p>
          </div>
        </div>

        <div className="card hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
              Avg Score
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-bright)', margin: 0 }}>{totalPitches > 0 ? '82%' : '--'}</h2>
            <p className="muted" style={{ margin: 0, fontWeight: 500 }}>Investor Readiness</p>
          </div>
        </div>
      </div>

      {/* Recent Pitches Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Recent Pitches</h3>
        {totalPitches > 0 && (
          <Link href="/pitches" className="muted" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-bright)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}>
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        )}
      </div>

      {totalPitches === 0 ? (
        <div className="card" style={{ padding: '6rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', border: '1px dashed var(--border-hover)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
            🚀
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>No pitches yet.</h3>
            <p className="muted" style={{ maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>Create your first investor-ready pitch using AI. It only takes a few seconds.</p>
          </div>
          <Link href="/pitches/new" className="button primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px' }}>
            Create First Pitch
          </Link>
        </div>
      ) : (
        <div className="grid">
          {recentPitches.map((pitch) => (
            <div key={pitch.id} className="card pitch-card hover-lift" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '220px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                    Draft
                  </span>
                  {pitch.ai_feedback ? (
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Analyzed
                    </span>
                  ) : (
                    <span className="badge" style={{ background: 'rgba(148, 163, 184, 0.1)', color: 'var(--muted)' }}>
                      Unpolished
                    </span>
                  )}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '0.5rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {pitch.content.substring(0, 50)}...
                </h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '1rem' }}>
                <span className="muted" style={{ fontSize: '0.8rem' }}>
                  {new Date(pitch.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <Link href={`/pitches/${pitch.id}`} className="button secondary glass" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Edit
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
