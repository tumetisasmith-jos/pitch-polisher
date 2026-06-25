import './globals.css';
import Link from 'next/link';
import { getSession } from '@/lib/session';

export const metadata = {
  title: 'Pitch Polisher — AI-Powered Startup Pitch Analysis',
  description: 'Polish your startup pitches with AI-driven feedback. Get strengths, weaknesses, improvements, and rewritten versions instantly.',
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* Animated background elements */}
        <div className="bg-grid"></div>
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        
        <div className="container">
          <header className="header glass-nav">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="nav-logo">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <defs>
                      <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" fill="url(#navLogoGrad)" opacity="0.15" stroke="url(#navLogoGrad)" strokeWidth="2"/>
                    <path d="M14 18L18 22L26 14" stroke="url(#navLogoGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <h1 className="gradient-text" style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                  Pitch Polisher
                </h1>
              </div>
            </Link>
            <nav>
              {session.user ? (
                <>
                  <Link href="/" className="nav-link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.35rem' }}>
                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 2 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                    </svg>
                    Dashboard
                  </Link>
                  <Link href="/pitches" className="nav-link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.35rem' }}>
                      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm1 3v2h8V3H4zm0 4v2h8V7H4zm0 4v2h5v-2H4z"/>
                    </svg>
                    My Pitches
                  </Link>
                  <div className="nav-user">
                    <span className="nav-avatar">{session.user.username.charAt(0).toUpperCase()}</span>
                    <form action="/api/auth/logout" method="POST" style={{ display: 'inline' }}>
                      <button type="submit" className="ghost" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                        Logout
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <Link href="/login" className="button" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                  Get Started
                </Link>
              )}
            </nav>
          </header>
          <main className="fade-in">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
