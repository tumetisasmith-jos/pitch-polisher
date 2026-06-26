'use client';
import { useState, useEffect, useRef } from 'react';

// ── Toast Notification Component ────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#34d399' },
    error:   { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#f87171' },
    info:    { bg: 'rgba(99, 102, 241, 0.15)', border: '#6366f1', text: '#818cf8' },
  };
  const c = colors[type] || colors.info;

  return (
    <div style={{
      position: 'fixed', top: '5rem', right: '1.5rem', zIndex: 9999,
      background: c.bg, border: `1px solid ${c.border}`, borderRadius: '12px',
      padding: '1rem 1.5rem', backdropFilter: 'blur(16px)', display: 'flex',
      alignItems: 'center', gap: '0.75rem', animation: 'toast-in 0.4s ease-out',
      boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${c.bg}`, maxWidth: '400px',
    }}>
      {type === 'success' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      )}
      {type === 'error' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      )}
      <span style={{ color: c.text, fontWeight: 600, fontSize: '0.9rem' }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: c.text, cursor: 'pointer', padding: '0.25rem', marginLeft: 'auto', opacity: 0.7 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

// ── Sequential Loading Messages ─────────────────────────────────
function LoadingMessages() {
  const messages = [
    "Analyzing your pitch...",
    "Understanding your audience...",
    "Evaluating strengths...",
    "Detecting weaknesses...",
    "Generating improvements...",
    "Rewriting your pitch...",
    "Finalizing AI response..."
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
      <p style={{ color: 'var(--text-bright)', fontWeight: 600, fontSize: '1.05rem', minHeight: '1.5rem', margin: 0 }}>{messages[index]}</p>
      <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Step {index + 1} of {messages.length}</p>
    </div>
  );
}

// ── Skeleton Card ───────────────────────────────────────────────
function SkeletonCard({ color }) {
  return (
    <div className="feedback-card" style={{ borderColor: color, opacity: 0.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: color, opacity: 0.3 }}/>
        <div style={{ width: '140px', height: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ width: '100%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', animation: 'skeleton-pulse 1.5s ease-in-out infinite 0.1s' }}/>
        <div style={{ width: '85%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', animation: 'skeleton-pulse 1.5s ease-in-out infinite 0.2s' }}/>
        <div style={{ width: '65%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', animation: 'skeleton-pulse 1.5s ease-in-out infinite 0.3s' }}/>
      </div>
    </div>
  );
}


export default function PitchEditorClient({ pitch, updateAction, deleteAction }) {
  const [title, setTitle] = useState(pitch.title);
  const [targetAudience, setTargetAudience] = useState(pitch.target_audience || '');
  const [content, setContent] = useState(pitch.content);
  
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedSection, setCopiedSection] = useState(null);
  const [toast, setToast] = useState(null);
  const isRequestInFlight = useRef(false);

  const handleAIPolish = async () => {
    // Prevent duplicate requests
    if (isRequestInFlight.current || isLoading) return;

    // Client-side validation
    if (!content || content.trim().length === 0) {
      setError("No pitch detected. Please enter your startup pitch.");
      return;
    }
    if (content.trim().length < 50) {
      setError(`Your pitch is too short (${content.trim().length} chars). Write at least 50 characters.`);
      return;
    }

    isRequestInFlight.current = true;
    setIsLoading(true);
    setError('');
    setAiFeedback(null);
    
    try {
      const res = await fetch('/api/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, targetAudience, content })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch AI feedback');
      }
      
      const parsedFeedback = JSON.parse(data.text);
      setAiFeedback(parsedFeedback);
      setToast({ message: 'AI analysis completed successfully!', type: 'success' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      isRequestInFlight.current = false;
    }
  };

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setToast({ message: 'Copied to clipboard!', type: 'success' });
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Calculate Investor Readiness Score
  const getScore = () => {
    if (!aiFeedback) return 0;
    const strengths = aiFeedback.strengths?.length || 0;
    const weaknesses = aiFeedback.weaknesses?.length || 0;
    let score = 70 + (strengths * 5) - (weaknesses * 5);
    return Math.max(0, Math.min(100, score));
  };

  const score = getScore();
  let scoreColor = '#10b981';
  if (score < 60) scoreColor = '#ef4444';
  else if (score < 80) scoreColor = '#f59e0b';

  // Circular progress for the score
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="editor-layout slide-up">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Editor Column */}
      <div className="card editor-card hover-lift" style={{ margin: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            Pitch Draft
          </h2>
          <form action={deleteAction}>
            <button type="submit" className="danger ghost" disabled={isLoading} style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Delete
            </button>
          </form>
        </div>

        <form action={updateAction} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="form-group">
            <label>Pitch Title</label>
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required disabled={isLoading} />
          </div>
          <div className="form-group">
            <label>Target Audience</label>
            <input type="text" name="targetAudience" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g. Seed Stage VCs, Angel Investors..." disabled={isLoading} />
          </div>
          <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Pitch Content / Script</label>
              <span className="muted" style={{ fontSize: '0.8rem' }}>{content.length.toLocaleString()} / 10,000</span>
            </div>
            <textarea name="content" value={content} onChange={e => setContent(e.target.value)} required disabled={isLoading} style={{ flex: 1, minHeight: '300px', resize: 'vertical' }} maxLength={10000}></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="button secondary" disabled={isLoading} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              Save Draft
            </button>
            <button 
              type="button" 
              onClick={handleAIPolish} 
              className="button primary"
              style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} 
              disabled={isLoading || content.trim().length < 50}
            >
              {isLoading ? (
                <>
                  <span className="spinner-dots"><span></span><span></span><span></span></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Generate AI Polish
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* AI Feedback Column */}
      {(aiFeedback || isLoading || error) ? (
        <div className="card ai-panel slide-up" style={{ margin: '0', display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.05), rgba(99, 102, 241, 0.05))', borderColor: 'var(--border-subtle)' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-bright)', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              </div>
              AI Analysis
            </h2>
            {aiFeedback && !isLoading && !error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Circular Score */}
                <svg width="48" height="48" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke={scoreColor} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{ transition: 'stroke-dashoffset 1s ease-out' }}/>
                </svg>
                <div style={{ position: 'absolute', marginLeft: '0.15rem' }}>
                  <span style={{ color: scoreColor, fontWeight: 800, fontSize: '0.8rem', display: 'block', textAlign: 'center', width: '48px' }}>{score}</span>
                </div>
              </div>
            )}
          </div>
          
          {isLoading && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1rem' }}>
              {/* Animated Pulse */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <div className="ai-loading-animation">
                  <div className="ai-pulse-ring"></div>
                  <div className="ai-pulse-ring delay-1"></div>
                  <div className="ai-pulse-ring delay-2"></div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 2 }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </div>
              </div>

              {/* Sequential Messages */}
              <LoadingMessages />

              {/* Progress Bar */}
              <div style={{ width: '220px', height: '4px', background: 'var(--border-default)', borderRadius: '2px', margin: '1.5rem auto 0', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', animation: 'progress-indeterminate 1.5s infinite ease-in-out', transformOrigin: '0% 50%' }}></div>
              </div>

              {/* Skeleton Cards Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <SkeletonCard color="#10b981" />
                <SkeletonCard color="#ef4444" />
                <SkeletonCard color="#3b82f6" />
                <SkeletonCard color="#a855f7" />
              </div>
            </div>
          )}
          
          {error && !isLoading && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f87171', marginBottom: '0.75rem' }}>Analysis Failed</h3>
              <p className="muted" style={{ textAlign: 'center', maxWidth: '320px', lineHeight: 1.6, marginBottom: '1.5rem' }}>{error}</p>
              <button className="button primary" onClick={handleAIPolish} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                Try Again
              </button>
            </div>
          )}
          
          {aiFeedback && typeof aiFeedback === 'object' && !isLoading && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
              
              {/* Strengths */}
              <div className="feedback-card feedback-success fade-in" style={{ animationDelay: '0.1s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Narrative Strengths
                  </h3>
                </div>
                <ul>
                  {aiFeedback.strengths?.map((item, i) => (
                    <li key={i}><span style={{ color: '#10b981', marginRight: '0.5rem', flexShrink: 0 }}>✔</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="feedback-card feedback-danger fade-in" style={{ animationDelay: '0.2s' }}>
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Critical Weaknesses
                </h3>
                <ul>
                  {aiFeedback.weaknesses?.map((item, i) => (
                    <li key={i}><span style={{ color: '#ef4444', marginRight: '0.5rem', flexShrink: 0 }}>✖</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="feedback-card feedback-info fade-in" style={{ animationDelay: '0.3s' }}>
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Actionable Improvements
                </h3>
                <ul>
                  {aiFeedback.improvements?.map((item, i) => (
                    <li key={i}><span style={{ color: '#3b82f6', marginRight: '0.5rem', flexShrink: 0 }}>→</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* Rewritten Pitch */}
              <div className="feedback-card feedback-primary fade-in" style={{ display: 'flex', flexDirection: 'column', animationDelay: '0.4s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Investor-Ready Rewrite
                  </h3>
                  <button onClick={() => copyToClipboard(aiFeedback.rewritten, 'rewrite')} className="icon-btn" title="Copy to clipboard" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}>
                    {copiedSection === 'rewrite' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    )}
                  </button>
                </div>
                <div className="rewritten-content">
                  {aiFeedback.rewritten}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button 
                    type="button" 
                    className="button primary"
                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    onClick={() => {
                      setContent(aiFeedback.rewritten);
                      setToast({ message: 'Rewritten pitch applied to your draft!', type: 'success' });
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    Overwrite Draft
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      ) : (
        <div className="card ai-panel slide-up" style={{ margin: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(0,0,0,0.1)', border: '1px dashed var(--border-hover)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#c084fc' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>No Analysis Yet</h3>
          <p className="muted" style={{ textAlign: 'center', maxWidth: '300px', lineHeight: 1.5 }}>Write your draft on the left and click &quot;Generate AI Polish&quot; to get instant investor-grade feedback.</p>
        </div>
      )}

      <style jsx global>{`
        .editor-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          height: calc(100vh - 200px);
          min-height: 700px;
        }
        
        @media (max-width: 900px) {
          .editor-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
        }

        .ai-panel {
          border-color: rgba(168, 85, 247, 0.3) !important;
        }

        .ai-loading-animation {
          position: relative;
          width: 72px;
          height: 72px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(168, 85, 247, 0.4);
          animation: pulse-ring 2s ease-out infinite;
        }

        .ai-pulse-ring.delay-1 { animation-delay: 0.6s; }
        .ai-pulse-ring.delay-2 { animation-delay: 1.2s; }

        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 1; border-width: 4px; }
          100% { transform: scale(2); opacity: 0; border-width: 1px; }
        }

        @keyframes progress-indeterminate {
          0% { transform: scaleX(0); transform-origin: 0% 50%; }
          50% { transform: scaleX(1); transform-origin: 0% 50%; }
          50.1% { transform: scaleX(1); transform-origin: 100% 50%; }
          100% { transform: scaleX(0); transform-origin: 100% 50%; }
        }

        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        @keyframes toast-in {
          0% { opacity: 0; transform: translateX(40px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }

        .feedback-card {
          border-radius: 12px;
          padding: 1.5rem;
          border-left: 4px solid;
          background: rgba(0,0,0,0.2);
        }

        .feedback-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .feedback-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .feedback-card li {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-primary);
          display: flex;
          align-items: flex-start;
        }

        .feedback-success { border-color: #10b981; }
        .feedback-success h3 { color: #10b981; }

        .feedback-danger { border-color: #ef4444; }
        .feedback-danger h3 { color: #ef4444; }

        .feedback-info { border-color: #3b82f6; }
        .feedback-info h3 { color: #3b82f6; }

        .feedback-primary { border-color: #a855f7; }
        .feedback-primary h3 { color: #a855f7; }

        .rewritten-content {
          padding: 1.25rem;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--text-bright);
          line-height: 1.7;
          font-size: 0.95rem;
          white-space: pre-wrap;
          font-style: italic;
        }

        .spinner-dots {
          display: inline-flex;
          gap: 4px;
        }
        .spinner-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: dot-bounce 1.4s ease-in-out infinite;
        }
        .spinner-dots span:nth-child(2) { animation-delay: 0.16s; }
        .spinner-dots span:nth-child(3) { animation-delay: 0.32s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
