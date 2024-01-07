import Login from '@/app/components/auth/signin/Login';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { LocaleProvider } from '@/locales/localeProvider';
import { Suspense } from 'react';
import { Header } from '@/app/components/shared/header/Header';

export default function SignIn() {
  return (
    <StoreProvider>
      <LocaleProvider>
        <Suspense>
          <Header />
        </Suspense>
        <main className="flex min-h-screen flex-col items-center">
          <Login />
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
