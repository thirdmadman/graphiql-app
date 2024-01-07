import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="px-4 divide-y bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
            href="/"
            className="flex justify-center space-x-3 lg:justify-start hover:underline"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
              <Image
                priority
                src={'/images/svg/debug_dynasty_small.svg'}
                alt="Logo"
                width={32}
                height={32}
                className="dark:invert"
              />
            </div>
            <span className="self-center text-2xl font-semibold">
              DebugDynasty
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracki uppercase dark:text-gray-50">App</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:underline">
                  Main page
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:underline">
                  Editor
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-in" className="hover:underline">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="hover:underline">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50">Created by</h3>
            <ul className="space-y-1">
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/nvalkovich"
                  className="hover:underline"
                >
                  nvalkovich
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/thirdmadman"
                  className="hover:underline"
                >
                  thirdmadman
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/iamnkt"
                  className="hover:underline"
                >
                  iamnkt
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-50">RS-school course</div>
            <div className="flex justify-start space-x-3">
              <Link
                rel="noopener noreferrer"
                href="https://rs.school/"
                title="RS-school course"
                target="_blank"
                className="flex items-center p-1 hover:-translate-y-0.5"
                data-testid="rss-link"
              >
                <Image
                  src={'/images/svg/rs_school.svg'}
                  width={64}
                  height={32}
                  alt="RS School logo"
                  className="dark:invert"
                  data-testid="rss-logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-400">
        Established in 2023
      </div>
    </footer>
  );
}
