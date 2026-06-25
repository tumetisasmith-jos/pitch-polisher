import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getSession();
  
  if (!session.user) {
    return (
      <div className="fade-in">
        <div className="hero" style={{ textAlign: 'center', padding: '6rem 1rem', position: 'relative' }}>
          <div className="hero-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: -1, pointerEvents: 'none' }}></div>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
            Pitch Perfect.<br/>
            <span className="gradient-text">Powered by AI.</span>
          </h1>
          
          <p className="muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Upload your raw startup pitch, and our fine-tuned AI will instantly analyze it, identify weaknesses, and rewrite it for maximum investor impact.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/login" className="button" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              Start Polishing Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ marginLeft: '0.5rem', verticalAlign: '-0.2em' }}>
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/login" className="button secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              View Demo
            </Link>
          </div>
          
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--success)"><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
              No credit card required
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--success)"><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
              Instant Feedback
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--success)"><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
              Powered by Google Gemini
            </div>
          </div>
        </div>

        <div className="grid" style={{ marginTop: '2rem', marginBottom: '6rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-light)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Draft Your Pitch</h3>
            <p className="muted">Write your raw, unpolished script. Don't worry about making it perfect yet.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary-light)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. AI Analysis</h3>
            <p className="muted">Our Gemini-powered engine analyzes your strengths and highlights critical weaknesses.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--success-light)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Pitch Perfect</h3>
            <p className="muted">Apply actionable improvements and walk away with a guaranteed winning script.</p>
          </div>
        </div>
      </div>
    );
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
