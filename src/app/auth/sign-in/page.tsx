import { LanguageSelector } from '@/app/components/LanguageSelector';
import Login from '@/app/components/Login';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { LocaleProvider } from '@/locales/localeProvider';

export default function SignIn() {
  return (
    <StoreProvider>
      <LocaleProvider>
        <main className="flex min-h-screen flex-col items-center">
          <LanguageSelector />
          <Login />
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
