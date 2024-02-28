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
      <div className="max-w-screen-2xl px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-2 flex justify-between h-16 mx-auto">
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
        <LanguageSelector />
        <div className="justify-end sm:px-4 sm:w-full flex max-w-44 sm:justify-between items-center">
          {userId ? (
            <Logout />
          ) : (
            <>
              <Link
                rel="noopener norefferer"
                href="/auth/sign-in"
                className="block px-3 py-2 text-center rounded-lg bg-purple-100 text-purple-700 shadow-md text-xs"
              >
                <LocaleByNameExtractor localeName="signinBtnTitle" />
              </Link>
              <Link
                rel="noopener norefferer"
                href="/auth/sign-up"
                className="hidden sm:block px-3 py-2 text-center rounded-lg bg-red-100 text-red-700 shadow-md text-xs "
              >
                <LocaleByNameExtractor localeName="signupBtnTitle" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
