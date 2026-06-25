import './globals.css';
import Link from 'next/link';
import { getSession } from '@/lib/session';

import Navbar from './Navbar';
import Footer from './Footer';

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
        
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar user={session.user} />
          <main className="fade-in container" style={{ flex: 1, padding: '2rem 1rem 4rem 1rem' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
