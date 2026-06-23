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
  
  const recentPitches = pitches.slice(0, 3);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Welcome back, {session.user.username}!</h2>
        <Link href="/pitches/new" className="button">Quick Create Pitch</Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-box">
          <p>Total Pitches</p>
          <h2>{totalPitches}</h2>
        </div>
        <div className="stat-box">
          <p>Recent Pitches</p>
          <h2>{recentPitches.length}</h2>
        </div>
        <div className="stat-box">
          <p>Today's Activity</p>
          <h2>{todayActivity}</h2>
        </div>
      </div>

      <h3>Recent Pitches</h3>
      {recentPitches.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p className="muted">No pitches yet. Start polishing your first pitch!</p>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: '1rem' }}>
          {recentPitches.map(pitch => (
            <Link href={`/pitches/${pitch.id}`} key={pitch.id} className="card pitch-card">
              <h3>{pitch.title}</h3>
              <p>{pitch.content}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
