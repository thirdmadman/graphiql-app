import { getUser } from '@/lib/firebase/getUser';
import { WelcomeContent } from './components/welcome/WelcomePageContent';
import { Header } from './components/shared/header/Header';

export default async function Welcome() {
  const userId = await getUser();

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center">
        <WelcomeContent userId={userId} />
      </div>
    </>
  );
}
