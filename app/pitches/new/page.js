import { createPitch } from '@/app/actions';

export default function NewPitch() {
  return (
    <div className="slide-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card" style={{ margin: '0' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Create New Pitch
          </h2>
          <p className="muted" style={{ fontSize: '0.9rem' }}>
            Write your pitch below. Once saved, you can use AI to polish and refine it.
          </p>
        </div>

        <form action={createPitch}>
          <div className="form-group">
            <label>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.4rem', opacity: 0.6 }}>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7z"/>
              </svg>
              Pitch Title
            </label>
            <input type="text" name="title" required placeholder="e.g. Next-Gen AI Assistant for Startups" />
          </div>
          <div className="form-group">
            <label>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.4rem', opacity: 0.6 }}>
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
              Target Audience
            </label>
            <input type="text" name="targetAudience" placeholder="e.g. Seed-stage investors, Enterprise customers" />
          </div>
          <div className="form-group">
            <label>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.4rem', opacity: 0.6 }}>
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
              Pitch Content / Script
            </label>
            <textarea name="content" required rows="10" placeholder="Write your startup pitch script here. Be specific about your value proposition, target market, competitive advantage, and ask..."></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" style={{ flex: 1, padding: '0.85rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem' }}>
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11zM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493z"/>
              </svg>
              Save & Continue to Editor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
