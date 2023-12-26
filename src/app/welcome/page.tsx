import { getUser } from '@/lib/firebase/getUser';
import { WelcomeContent } from '../components/welcomePageContent';

export default async function Welcome() {
  const userId = await getUser();

  return <WelcomeContent userId={userId} />;
}
