'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ user }) {
  const pathname = usePathname();

  return (
    <nav className="header" style={{ padding: '1.5rem', background: 'rgba(10, 11, 26, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          Pitch Polisher
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {user ? (
            <>
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Dashboard</Link>
              <Link href="/pitches" className={`nav-link ${pathname === '/pitches' ? 'active' : ''}`}>My Pitches</Link>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-default)' }}>
                <button className="icon-btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }} className="user-dropdown-trigger">
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600 }}>
                    {user.email ? user.email.substring(0, 1).toUpperCase() : 'U'}
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">Sign In</Link>
              <Link href="/login" className="button primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '8px' }}>
                Get Started
                <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', verticalAlign: '-0.2em' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
