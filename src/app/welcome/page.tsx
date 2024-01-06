import { getUser } from '@/lib/firebase/getUser';
import { WelcomeContent } from '../components/WelcomePageContent';
import { LanguageSelector } from '@/app/components/LanguageSelector';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { LocaleProvider } from '@/locales/localeProvider';

export default async function Welcome() {
  const userId = await getUser();

  return (
    <StoreProvider>
      <LocaleProvider>
        <div className="flex min-h-screen flex-col items-center">
          <LanguageSelector />
          <WelcomeContent userId={userId} />
        </div>
      </LocaleProvider>
    </StoreProvider>
  );
}
