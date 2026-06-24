import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { updatePitch, deletePitch } from '@/app/actions';
import PitchEditorClient from './PitchEditorClient';

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
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <PitchEditorClient 
        pitch={pitch} 
        updateAction={updateAction} 
        deleteAction={deleteAction} 
      />
    </div>
  );
}
