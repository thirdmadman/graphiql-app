import { DecodedIdToken } from 'firebase-admin/auth';

import { Logout } from '@/app/components/shared/Logout';
import Image from 'next/image';
import Link from 'next/link';
import { LocaleByNameExtractor } from '@/locales/LocaleByNameExtractor';
import { LanguageSelector } from '@/app/components/shared/header/LanguageSelector';

export function HeaderContent({
  userId = null,
}: {
  userId: DecodedIdToken | null;
}) {
  return (
    <header className="sticky top-0 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 z-50">
      <div className="max-w-screen-2xl px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-2 flex justify-between h-16 mx-auto items-center">
        <Link
          rel="noopener noreferrer"
          href="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 flex-shrink-0"
        >
          <Image
            priority
            src="/images/svg/debug_dynasty_small.svg"
            alt="Logo"
            width={32}
            height={32}
            className="dark:invert"
          />
        </Link>

        <div className="flex gap-4">
          <LanguageSelector />
          {userId ? (
            <Logout />
          ) : (
            <div className="justify-end sm:w-full flex sm:justify-between items-center gap-4">
              <Link
                rel="noopener norefferer"
                href="/auth/sign-in"
                className="block text-sm px-2 sm:px-5 py-2.5 text-center rounded-lg bg-purple-300/30 text-purple-700 shadow-md text-sm flex-shrink-0 hover:opacity-80 active:opacity-disabled transition-opacity 
                dark:text-white"
              >
                <LocaleByNameExtractor localeName="signinBtnTitle" />
              </Link>
              <Link
                rel="noopener norefferer"
                href="/auth/sign-up"
                className="hidden sm:block text-sm px-2 sm:px-5 py-2.5 text-center rounded-lg bg-blue-300/30 text-blue-700 shadow-md text-sm flex-shrink-0 hover:opacity-80 active:opacity-disabled transition-opacity 
                dark:text-white"
              >
                <LocaleByNameExtractor localeName="signupBtnTitle" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
