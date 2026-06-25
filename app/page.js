import { getSession } from '@/lib/session';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';

export default async function Home() {
  const session = await getSession();
  
  if (!session.user) {
    return <LandingPage />;
  }

  return <Dashboard user={session.user} />;
}
