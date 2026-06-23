import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { updatePitch, deletePitch } from '@/app/actions';

export default async function EditPitch({ params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session.user) redirect('/login');

  const pitch = db.prepare('SELECT * FROM pitches WHERE id = ? AND user_id = ?').get(id, session.user.id);
  
  if (!pitch) {
    redirect('/pitches');
  }

  const updateAction = updatePitch.bind(null, id);
  const deleteAction = deletePitch.bind(null, id);

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="header">
        <h2>Edit Pitch</h2>
        <form action={deleteAction}>
          <button type="submit" className="danger">Delete</button>
        </form>
      </div>
      <form action={updateAction}>
        <div className="form-group">
          <label>Pitch Title</label>
          <input type="text" name="title" defaultValue={pitch.title} required />
        </div>
        <div className="form-group">
          <label>Target Audience</label>
          <input type="text" name="targetAudience" defaultValue={pitch.target_audience} />
        </div>
        <div className="form-group">
          <label>Pitch Content / Script</label>
          <textarea name="content" defaultValue={pitch.content} required rows="8"></textarea>
        </div>
        <button type="submit" style={{ width: '100%' }}>Update Pitch</button>
      </form>
    </div>
  );
}
