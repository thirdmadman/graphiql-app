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
    <header className="p-10 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between h-16 mx-auto">
        <Link
          rel="noopener noreferrer"
          href="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
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
        <div className="items-center flex-shrink-0 lg:flex gap-x-10">
          {userId ? (
            <Logout />
          ) : (
            <>
              <Link
                rel="noopener norefferer"
                href="/auth/sign-in"
                className="block px-6 py-3 text-center rounded-lg bg-purple-100 text-purple-700 shadow-md"
              >
                <LocaleByNameExtractor localeName="signinBtnTitle" />
              </Link>
              <Link
                rel="noopener norefferer"
                href="/auth/sign-up"
                className="block px-6 py-3 text-center rounded-lg bg-red-100 text-red-700 shadow-md"
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
