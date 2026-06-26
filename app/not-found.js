import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', textAlign: 'center', padding: '2rem',
    }}>
      <div style={{
        width: '120px', height: '120px', borderRadius: '24px',
        background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '2rem', color: '#818cf8',
      }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      </div>

      <h1 style={{ fontSize: '5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }}>
        <span className="gradient-text">404</span>
      </h1>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-bright)', marginTop: '0.5rem', marginBottom: '1rem' }}>
        Oops! This page doesn&apos;t exist.
      </h2>

      <p className="muted" style={{ fontSize: '1.05rem', maxWidth: '400px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        The page you&apos;re looking for may have been moved, deleted, or never existed. Let&apos;s get you back on track.
      </p>

      <Link href="/" className="button primary hover-lift" style={{
        padding: '0.85rem 2rem', fontSize: '1rem', borderRadius: '12px',
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Return Home
      </Link>
    </div>
  );
}
