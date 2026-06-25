'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PitchEditorClient({ pitch, updateAction, deleteAction }) {
  const [title, setTitle] = useState(pitch.title);
  const [targetAudience, setTargetAudience] = useState(pitch.target_audience || '');
  const [content, setContent] = useState(pitch.content);
  
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div style={{ display: 'grid', gridTemplateColumns: aiFeedback || isLoading || error ? '1fr 1fr' : '1fr', gap: '2rem', transition: 'all 0.3s ease' }}>
      
      {/* Editor Column */}
      <div className="card" style={{ margin: '0' }}>
        <div className="header">
          <h2>Edit Pitch</h2>
          <form action={deleteAction}>
            <button type="submit" className="danger">Delete</button>
          </form>
        </div>
        <form action={updateAction}>
          <div className="form-group">
            <label>Pitch Title</label>
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Target Audience</label>
            <input type="text" name="targetAudience" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Pitch Content / Script</label>
            <textarea name="content" value={content} onChange={e => setContent(e.target.value)} required rows="12"></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" style={{ flex: 1 }}>Update Pitch</button>
            <button type="button" onClick={handleAIPolish} className="secondary" style={{ flex: 1, borderColor: 'var(--secondary)', color: 'var(--secondary)' }} disabled={isLoading}>
              {isLoading ? 'Polishing...' : 'AI Polish'}
            </button>
          </div>
        </form>
      </div>

      {/* AI Feedback Column */}
      {(aiFeedback || isLoading || error) && (
        <div className="card ai-panel" style={{ margin: '0', border: '1px solid var(--secondary)', background: 'rgba(168, 85, 247, 0.05)' }}>
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
            <h2 style={{ color: 'var(--secondary)' }}>AI Feedback ✨</h2>
          </div>
          
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted)' }}>
              <div className="spinner" style={{ marginBottom: '1rem', fontSize: '2rem' }}>✨</div>
              <p>Analyzing your pitch and generating feedback...</p>
            </div>
          )}
          
          {error && (
            <div style={{ color: 'var(--danger)', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {aiFeedback && typeof aiFeedback === 'object' && !isLoading && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div className="feedback-section strengths">
                <h3 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💪</span> Strengths
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {aiFeedback.strengths?.map((item, i) => (
                    <li key={i} style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '4px solid #10b981', color: 'var(--foreground)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feedback-section weaknesses">
                <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎯</span> Areas for Improvement
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {aiFeedback.weaknesses?.map((item, i) => (
                    <li key={i} style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444', color: 'var(--foreground)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feedback-section actionable">
                <h3 style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💡</span> Suggested Tweaks
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {aiFeedback.improvements?.map((item, i) => (
                    <li key={i} style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', borderLeft: '4px solid #3b82f6', color: 'var(--foreground)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feedback-section rewritten">
                <h3 style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✨</span> AI Rewritten Pitch
                </h3>
                <div style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)', color: 'var(--foreground)', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {aiFeedback.rewritten}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .spinner {
          display: inline-block;
          animation: spin 2s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .markdown-body h3 { color: var(--primary-hover); margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.1rem; }
        .markdown-body p { margin-bottom: 1rem; color: var(--foreground); }
        .markdown-body ul { margin-left: 1.5rem; margin-bottom: 1rem; color: var(--muted); }
        .markdown-body li { margin-bottom: 0.25rem; }
      `}</style>
    </div>
  );
}
