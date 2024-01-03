'use client';

import { localeContext } from '@/locales/localeProvider';
import { RegisterForm } from './RegisterForm';
import { useContext } from 'react';
import { locale } from '@/locales/locale';

export function SignUpContent() {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;

  const { signupTitle } = locale[currentLang];

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full p-5 mt-5 light">
        <div className="w-full mx-auto p-4 space-y-6 rounded-lg shadow sm:p-8 sm:max-w-md dark:bg-gray-900 dark:text-gray-100">
          <h1 className="text-3xl text-center font-bold leading-tight tracking-tight">
            {signupTitle}
          </h1>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
