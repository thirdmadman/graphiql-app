import { getUser } from '@/lib/firebase/getUser';
import { WelcomeContent } from './components/welcome/WelcomePageContent';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { LocaleProvider } from '@/locales/localeProvider';
import { Header } from './components/shared/header/Header';

export default async function Welcome() {
  const userId = await getUser();

  return (
    <StoreProvider>
      <LocaleProvider>
        <Header />
        <div className="flex min-h-screen flex-col items-center">
          <WelcomeContent userId={userId} />
        </div>
      </LocaleProvider>
    </StoreProvider>
  );
}
