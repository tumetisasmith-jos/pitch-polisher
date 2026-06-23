import './globals.css';
import Link from 'next/link';
import { getSession } from '@/lib/session';

export const metadata = {
  title: 'Pitch Polisher',
  description: 'Polish your startup pitches',
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <Link href="/">
              <h1>Pitch Polisher</h1>
            </Link>
            <nav>
              {session.user ? (
                <>
                  <Link href="/">Dashboard</Link>
                  <Link href="/pitches">My Pitches</Link>
                  <form action="/api/auth/logout" method="POST" style={{ display: 'inline' }}>
                    <button type="submit" className="button secondary" style={{ padding: '0.25rem 0.75rem' }}>Logout</button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="button secondary" style={{ padding: '0.25rem 0.75rem' }}>Login</Link>
              )}
            </nav>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
