'use client';
import { useState } from 'react';

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
    <div className="editor-layout slide-up">
      
      {/* Editor Column */}
      <div className="card editor-card" style={{ margin: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', opacity: 0.6, verticalAlign: '-0.15em' }}>
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5z"/>
            </svg>
            Edit Pitch
          </h2>
          <form action={deleteAction}>
            <button type="submit" className="danger" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.35rem', verticalAlign: '-0.1em' }}>
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              Delete
            </button>
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
            <textarea name="content" value={content} onChange={e => setContent(e.target.value)} required rows="14"></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" style={{ flex: 1 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.4rem', verticalAlign: '-0.1em' }}>
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 .724L7.605 5H5.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H7l-1.1 4.125A.5.5 0 0 0 6.38 12H7.5a.5.5 0 0 0 .488-.395L9.69 5H11.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H10.3L11.1 1H2z"/>
              </svg>
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={handleAIPolish} 
              className="accent"
              style={{ flex: 1 }} 
              disabled={isLoading}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span className="spinner-dots"><span></span><span></span><span></span></span>
                  Analyzing...
                </span>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.4rem', verticalAlign: '-0.15em' }}>
                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.829l.645-1.936zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.5.845 1.018 1.018l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.53l-.387 1.163a.217.217 0 0 1-.412 0L3.407 5.53a1.734 1.734 0 0 0-1.018-1.018l-1.163-.387a.217.217 0 0 1 0-.412l1.163-.387a1.734 1.734 0 0 0 1.018-1.018l.387-1.162z"/>
                  </svg>
                  AI Polish
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* AI Feedback Column */}
      {(aiFeedback || isLoading || error) && (
        <div className="card ai-panel" style={{ margin: '0' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', verticalAlign: '-0.15em' }}>
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.829l.645-1.936z"/>
              </svg>
              AI Feedback
            </h2>
          </div>
          
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div className="ai-loading-animation">
                <div className="ai-pulse-ring"></div>
                <div className="ai-pulse-ring delay-1"></div>
                <div className="ai-pulse-ring delay-2"></div>
                <svg width="40" height="40" viewBox="0 0 16 16" fill="var(--secondary)" style={{ position: 'relative', zIndex: 2 }}>
                  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.829l.645-1.936z"/>
                </svg>
              </div>
              <p className="muted" style={{ marginTop: '1.5rem', fontWeight: 500 }}>Analyzing your pitch with AI...</p>
              <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>This usually takes 5-10 seconds</p>
            </div>
          )}
          
          {error && (
            <div className="feedback-card feedback-error">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}
          
          {aiFeedback && typeof aiFeedback === 'object' && !isLoading && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Strengths */}
              <div className="feedback-card feedback-success">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', verticalAlign: '-0.15em' }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  Strengths
                </h3>
                <ul>
                  {aiFeedback.strengths?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="feedback-card feedback-danger">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', verticalAlign: '-0.15em' }}>
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  Areas for Improvement
                </h3>
                <ul>
                  {aiFeedback.weaknesses?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="feedback-card feedback-info">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', verticalAlign: '-0.15em' }}>
                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13H5.5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                  Suggested Improvements
                </h3>
                <ul>
                  {aiFeedback.improvements?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Rewritten Pitch */}
              <div className="feedback-card feedback-primary">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', verticalAlign: '-0.15em' }}>
                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.829l.645-1.936z"/>
                  </svg>
                  AI Rewritten Pitch
                </h3>
                <div className="rewritten-content">
                  {aiFeedback.rewritten}
                </div>
                <button 
                  type="button" 
                  className="ghost"
                  style={{ marginTop: '1rem', fontSize: '0.85rem' }}
                  onClick={() => {
                    setContent(aiFeedback.rewritten);
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.35rem', verticalAlign: '-0.1em' }}>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                  </svg>
                  Use This Version
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .editor-layout {
          display: grid;
          grid-template-columns: ${aiFeedback || isLoading || error ? '1fr 1fr' : '1fr'};
          gap: 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (max-width: 900px) {
          .editor-layout {
            grid-template-columns: 1fr !important;
          }
        }

        .ai-panel {
          border-color: rgba(168, 85, 247, 0.3) !important;
          background: rgba(168, 85, 247, 0.04) !important;
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
          border: 2px solid rgba(168, 85, 247, 0.3);
          animation: pulse-ring 2s ease-out infinite;
        }

        .ai-pulse-ring.delay-1 { animation-delay: 0.4s; }
        .ai-pulse-ring.delay-2 { animation-delay: 0.8s; }

        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .feedback-card {
          border-radius: 12px;
          padding: 1.25rem;
          border-left: 4px solid;
        }

        .feedback-card h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
        }

        .feedback-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .feedback-card li {
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--foreground);
        }

        .feedback-success {
          background: rgba(16, 185, 129, 0.06);
          border-color: #10b981;
        }
        .feedback-success h3 { color: #10b981; }
        .feedback-success li { background: rgba(16, 185, 129, 0.08); }

        .feedback-danger {
          background: rgba(239, 68, 68, 0.06);
          border-color: #ef4444;
        }
        .feedback-danger h3 { color: #ef4444; }
        .feedback-danger li { background: rgba(239, 68, 68, 0.08); }

        .feedback-info {
          background: rgba(59, 130, 246, 0.06);
          border-color: #3b82f6;
        }
        .feedback-info h3 { color: #3b82f6; }
        .feedback-info li { background: rgba(59, 130, 246, 0.08); }

        .feedback-primary {
          background: rgba(168, 85, 247, 0.06);
          border-color: #a855f7;
        }
        .feedback-primary h3 { color: #a855f7; }

        .feedback-error {
          background: rgba(239, 68, 68, 0.08);
          border-color: #ef4444;
          color: #ef4444;
          border-left: 4px solid #ef4444;
          padding: 1rem 1.25rem;
          border-radius: 12px;
        }

        .rewritten-content {
          padding: 1.25rem;
          background: rgba(168, 85, 247, 0.08);
          border-radius: 10px;
          border: 1px solid rgba(168, 85, 247, 0.15);
          color: var(--foreground);
          line-height: 1.7;
          font-size: 0.95rem;
          white-space: pre-wrap;
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
