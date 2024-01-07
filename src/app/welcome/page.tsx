import { getUser } from '@/lib/firebase/getUser';
import { WelcomeContent } from '../components/welcome/WelcomePageContent';
import { LanguageSelector } from '@/app/components/shared/LanguageSelector';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { LocaleProvider } from '@/locales/localeProvider';
import { Suspense } from 'react';
import { Header } from '../components/shared/header/Header';

export default async function Welcome() {
  const userId = await getUser();

  return (
    <StoreProvider>
      <LocaleProvider>
        <Suspense>
          <Header />
        </Suspense>
        <div className="flex min-h-screen flex-col items-center">
          <LanguageSelector />
          <WelcomeContent userId={userId} />
        </div>
      </LocaleProvider>
    </StoreProvider>
  );
}
