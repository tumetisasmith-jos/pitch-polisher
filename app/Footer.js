'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', background: 'rgba(10, 11, 26, 0.4)', padding: '4rem 0 2rem 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>
            <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            Pitch Polisher
          </Link>
          <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '250px' }}>
            Elevate your startup pitch with fine-tuned AI analysis and investor-ready rewrites.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: 'var(--text-bright)', fontWeight: 600, marginBottom: '1rem' }}>Product</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Features</Link></li>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Pricing</Link></li>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Case Studies</Link></li>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Reviews</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: 'var(--text-bright)', fontWeight: 600, marginBottom: '1rem' }}>Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Blog</Link></li>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Pitch Templates</Link></li>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Investor Database</Link></li>
            <li><Link href="/" className="muted nav-link" style={{ padding: 0 }}>Help Center</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: 'var(--text-bright)', fontWeight: 600, marginBottom: '1rem' }}>Connect</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/tumetisasmith-jos/pitch-polisher" target="_blank" rel="noopener noreferrer" className="muted" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-bright)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="#" className="muted" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-bright)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="muted" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-bright)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
        <p className="muted">&copy; {new Date().getFullYear()} Pitch Polisher. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/" className="muted" style={{ textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-bright)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}>Privacy Policy</Link>
          <Link href="/" className="muted" style={{ textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-bright)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
