'use client';
import { useState, useEffect } from 'react';

// Subcomponent for sequential loading messages
function LoadingMessages() {
  const messages = [
    "Analyzing narrative structure...",
    "Evaluating market sizing...",
    "Identifying weaknesses...",
    "Polishing investor appeal...",
    "Finalizing readiness score..."
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return <p className="muted" style={{ marginTop: '1.5rem', fontWeight: 500, fontSize: '1rem', minHeight: '1.5rem' }}>{messages[index]}</p>;
}

export default function PitchEditorClient({ pitch, updateAction, deleteAction }) {
  const [title, setTitle] = useState(pitch.title);
  const [targetAudience, setTargetAudience] = useState(pitch.target_audience || '');
  const [content, setContent] = useState(pitch.content);
  
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedSection, setCopiedSection] = useState(null);

  const handleAIPolish = async () => {
    setIsLoading(true);
    setError('');
    
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
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
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
  let scoreColor = '#10b981'; // Green
  if (score < 60) scoreColor = '#ef4444'; // Red
  else if (score < 80) scoreColor = '#f59e0b'; // Yellow

  return (
    <div className="editor-layout slide-up">
      
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
            <button type="submit" className="danger ghost" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Delete
            </button>
          </form>
        </div>

        <form action={updateAction} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="form-group">
            <label>Pitch Title</label>
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Target Audience</label>
            <input type="text" name="targetAudience" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g. Seed Stage VCs, Angel Investors..." />
          </div>
          <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label>Pitch Content / Script</label>
            <textarea name="content" value={content} onChange={e => setContent(e.target.value)} required style={{ flex: 1, minHeight: '300px', resize: 'vertical' }}></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="button secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              Save Draft
            </button>
            <button 
              type="button" 
              onClick={handleAIPolish} 
              className="button primary"
              style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} 
              disabled={isLoading || content.trim() === ''}
            >
              {isLoading ? (
                <>
                  <span className="spinner-dots"><span></span><span></span><span></span></span>
                  Processing...
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid var(--border-default)' }}>
                <span className="muted" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Score:</span>
                <span style={{ color: scoreColor, fontWeight: 800, fontSize: '0.9rem' }}>{score}/100</span>
              </div>
            )}
          </div>
          
          {isLoading && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
              <div className="ai-loading-animation">
                <div className="ai-pulse-ring"></div>
                <div className="ai-pulse-ring delay-1"></div>
                <div className="ai-pulse-ring delay-2"></div>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 2 }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <LoadingMessages />
              <div style={{ width: '200px', height: '4px', background: 'var(--border-default)', borderRadius: '2px', marginTop: '1rem', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', animation: 'progress-indeterminate 1.5s infinite ease-in-out', transformOrigin: '0% 50%' }}></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="feedback-card feedback-error" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <strong style={{ fontSize: '1.1rem' }}>Analysis Failed</strong>
              </div>
              <p style={{ textAlign: 'center', margin: 0 }}>{error}</p>
              <button className="button primary mt-4" onClick={handleAIPolish} style={{ margin: '1.5rem auto 0', display: 'block' }}>Try Again</button>
            </div>
          )}
          
          {aiFeedback && typeof aiFeedback === 'object' && !isLoading && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
              
              {/* Strengths */}
              <div className="feedback-card feedback-success">
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
                    <li key={i}><span style={{ color: '#10b981', marginRight: '0.5rem' }}>✔</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="feedback-card feedback-danger">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Critical Weaknesses
                </h3>
                <ul>
                  {aiFeedback.weaknesses?.map((item, i) => (
                    <li key={i}><span style={{ color: '#ef4444', marginRight: '0.5rem' }}>✖</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="feedback-card feedback-info">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Actionable Improvements
                </h3>
                <ul>
                  {aiFeedback.improvements?.map((item, i) => (
                    <li key={i}><span style={{ color: '#3b82f6', marginRight: '0.5rem' }}>→</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* Rewritten Pitch */}
              <div className="feedback-card feedback-primary" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Investor-Ready Rewrite
                  </h3>
                  <button onClick={() => copyToClipboard(aiFeedback.rewritten, 'rewrite')} className="icon-btn" title="Copy to clipboard" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
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
          <p className="muted" style={{ textAlign: 'center', maxWidth: '300px', lineHeight: 1.5 }}>Write your draft on the left and click "Generate AI Polish" to get instant investor-grade feedback.</p>
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
          width: 80px;
          height: 80px;
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

        .feedback-error {
          border-color: #ef4444;
          color: #ef4444;
          border-left: 4px solid #ef4444;
          padding: 1.5rem;
          border-radius: 12px;
        }

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
