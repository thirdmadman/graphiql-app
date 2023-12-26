import { getUser } from '@/lib/firebase/getUser';
import { WelcomeContent } from '../components/WelcomePageContent';

export default async function Welcome() {
  const userId = await getUser();

  return <WelcomeContent userId={userId} />;
}
