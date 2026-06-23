import { createPitch } from '@/app/actions';

export default function NewPitch() {
  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="header">
        <h2>Create New Pitch</h2>
      </div>
      <form action={createPitch}>
        <div className="form-group">
          <label>Pitch Title</label>
          <input type="text" name="title" required placeholder="e.g. Next-Gen AI Assistant" />
        </div>
        <div className="form-group">
          <label>Target Audience</label>
          <input type="text" name="targetAudience" placeholder="e.g. Investors, Customers" />
        </div>
        <div className="form-group">
          <label>Pitch Content / Script</label>
          <textarea name="content" required rows="8" placeholder="Write your pitch script here..."></textarea>
        </div>
        <button type="submit" style={{ width: '100%' }}>Save Pitch</button>
      </form>
    </div>
  );
}
