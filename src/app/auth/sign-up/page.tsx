import { LanguageSelector } from '@/app/components/shared/LanguageSelector';
import { SignUpContent } from '@/app/components/auth/signup/SignUpContent';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { LocaleProvider } from '@/locales/localeProvider';

export default function SignUp() {
  return (
    <StoreProvider>
      <LocaleProvider>
        <main className="min-h-screen flex flex-col items-center">
          <LanguageSelector />
          <SignUpContent />
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
