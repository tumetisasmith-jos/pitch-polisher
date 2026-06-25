import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="fade-in">
      {/* Premium Hero Section */}
      <div className="hero" style={{ padding: '4rem 0 6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow" style={{ position: 'absolute', top: '10%', left: '20%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 50%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none', opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: -1, pointerEvents: 'none' }}></div>
        
        {/* Floating Particles (CSS simulated via background) */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, zIndex: -1, pointerEvents: 'none' }}></div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left: Content */}
          <div style={{ zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, color: '#818cf8', marginBottom: '2rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', boxShadow: '0 0 10px #818cf8' }}></span>
              Gemini 1.5 Flash Integration Live
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
              Pitch Perfect.<br/>
              <span className="gradient-text">Powered by AI.</span>
            </h1>
            
            <p className="muted" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Upload your raw startup pitch, and our fine-tuned AI will instantly analyze it, identify weaknesses, and rewrite it for maximum investor impact.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/login" className="button primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
                Start Polishing Free
                <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
              <Link href="/login" className="button secondary glass hover-lift" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}>
                View Demo
              </Link>
            </div>
            
            <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--success)"><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
                No credit card required
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--success)"><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
                Instant Feedback
              </div>
            </div>
          </div>

          {/* Right: Mockup Graphic */}
          <div style={{ position: 'relative', zIndex: 1, perspective: '1000px' }}>
            <div className="hover-lift" style={{ transform: 'rotateY(-5deg) rotateX(5deg)', transformStyle: 'preserve-3d', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.2)' }}>
              
              {/* Fake UI Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Analysis Complete
                </div>
              </div>

              {/* Fake UI Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '1rem' }}>
                  <h4 style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🟢 Strengths
                  </h4>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', margin: 0, display: 'flex', gap: '0.5rem' }}><span style={{ color: '#10b981' }}>✔</span> Clear problem statement addressing B2B supply chain inefficiencies.</p>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', margin: '0.5rem 0 0 0', display: 'flex', gap: '0.5rem' }}><span style={{ color: '#10b981' }}>✔</span> Strong market opportunity sizing ($14B TAM).</p>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '1rem' }}>
                  <h4 style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🔴 Weaknesses
                  </h4>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', margin: 0, display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ef4444' }}>✖</span> Revenue model and pricing strategy are too vague.</p>
                </div>

                <div style={{ background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', padding: '1.25rem' }}>
                  <h4 style={{ color: '#c084fc', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ✨ Rewritten Pitch excerpt
                  </h4>
                  <p style={{ color: 'var(--text-bright)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                    "We are tackling the $14B B2B logistics market by eliminating supply chain fragmentation. Our platform consolidates vendor data in real-time. By charging a $500/mo enterprise SaaS fee, we've already secured $120k in ARR across 4 beta pilots."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container grid" style={{ marginTop: '2rem', marginBottom: '6rem' }}>
        <div className="card hover-lift" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-light)', transition: 'transform 0.3s' }} className="icon-container">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', fontWeight: 700 }}>1. Draft Your Pitch</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>Write your raw, unpolished script. Don't worry about making it perfect or sounding like a seasoned founder yet.</p>
        </div>
        <div className="card hover-lift" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary-light)', transition: 'transform 0.3s' }} className="icon-container">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', fontWeight: 700 }}>2. AI Analysis</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>Our Gemini-powered engine instantly analyzes your narrative strengths and highlights critical weaknesses.</p>
        </div>
        <div className="card hover-lift" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--success-light)', transition: 'transform 0.3s' }} className="icon-container">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', fontWeight: 700 }}>3. Pitch Perfect</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>Apply actionable improvements and walk away with a guaranteed, investor-ready winning script.</p>
        </div>
      </div>

      {/* Why Pitch Polisher Section */}
      <div className="container" style={{ marginBottom: '8rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Why Pitch Polisher?</h2>
          <p className="muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Everything you need to secure your next round of funding, packed into one seamless platform.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="card hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI-Powered Analysis</h4>
            <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Advanced models trained on thousands of successful YC and Sequoia pitches evaluate your script.</p>
          </div>

          <div className="card hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Investor Ready Rewrites</h4>
            <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Instantly generate a polished version that hits all the psychological triggers investors look for.</p>
          </div>

          <div className="card hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Secure Cloud Workspace</h4>
            <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>All your drafts are auto-saved and securely stored. Access them anywhere, anytime.</p>
          </div>

          <div className="card hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(34, 211, 238, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Instant Actionable Feedback</h4>
            <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>No more waiting days for mentors. Get concrete advice in seconds so you can keep iterating.</p>
          </div>

        </div>
      </div>
      
    </div>
  );
}
