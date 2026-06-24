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
      
      setAiFeedback(data.text);
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
          
          {aiFeedback && !isLoading && !error && (
            <div className="markdown-body" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              <ReactMarkdown>{aiFeedback}</ReactMarkdown>
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
