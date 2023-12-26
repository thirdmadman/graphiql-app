'use client';

import { Link } from '@nextui-org/react';
import Image from 'next/image';
import { localeContext } from '@/locales/localeProvider';
import { locale } from '@/locales/locale';
import { useContext } from 'react';
import { DecodedIdToken } from 'firebase-admin/auth';

export function WelcomeContent({
  userId = null,
}: {
  userId: DecodedIdToken | null;
}) {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;

  const {
    signinBtnTitle,
    signupBtnTitle,
    mainBtnTitle,
    welcomeSectionTitle1,
    welcomeSectionTitle2,
    welcomeSectionText,
    benefitsSectionTitle,
    benefitsSectionListItem1,
    benefitsSectionListItem2,
    benefitsSectionListItem3,
    benefitsSectionListItem4,
    benefitsSectionListItem5,
    benefitsSectionListItem6,
    motivationSectionTitle,
    motivationSectionText1,
    motivationSectionText2,
    motivationSectionText3,
    teamSectionTitle,
    teamSectionRole1,
    teamSectionRole2,
  } = locale[currentLang];

  return (
    <main className="container flex flex-col items-center mx-auto">
      <section className="py-8 flex flex-col-reverse justify-center md:pb-12 lg:max-w-screen-md lg:flex-row lg:justify-between lg:pb-16">
        <Image
          priority
          src={'/images/svg/welcome_logo.svg'}
          alt="Logo"
          width={450}
          height={450}
          className="py-4 mx-auto lg:py-0"
        />
        <div className="flex flex-col justify-center text-center rounded-sm lg:pl-6 lg:max-w-md xl:max-w-lg lg:text-left">
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-6 lg:justify-start">
            {userId ? (
              <Link
                size="lg"
                rel="noopener norefferer"
                href="/"
                className="px-6 py-3 text-base rounded-lg bg-gray-100 text-gray-700 shadow-md"
              >
                {mainBtnTitle}
              </Link>
            ) : (
              <>
                <Link
                  size="lg"
                  rel="noopener norefferer"
                  href="/auth/sign-in"
                  className="block px-6 py-3 rounded-lg bg-purple-100 text-purple-700 shadow-md"
                >
                  {signinBtnTitle}
                </Link>
                <Link
                  size="lg"
                  rel="noopener norefferer"
                  href="/auth/sign-up"
                  className="block px-6 py-3 text-center rounded-lg bg-red-100 text-red-700 shadow-md"
                >
                  {signupBtnTitle}
                </Link>
              </>
            )}
          </div>
          <h3 className="mt-8 mb-6 text-4xl font-bold leadi sm:text-5xl sm:mt-12">
            {welcomeSectionTitle1}
            <br></br>
            {welcomeSectionTitle2}
            <br></br>
          </h3>
          <p className="text-lg px-4 md:px-24 md:py-0 md:text-justify lg:p-0">
            {welcomeSectionText}
          </p>
        </div>
      </section>
      <section className="py-8 mx-auto sm:max-w-xl md:px-24 md:max-w-full lg:max-w-screen-md md:py-12 lg:px-0 lg:py-16">
        <h4 className="mb-8 text-4xl font-bold leadi text-center">
          {benefitsSectionTitle}
        </h4>
        <ul className="grid gap-x-4 gap-y-4 grid-cols-1 md:grid-cols-2 lg:gap-x-12 lg:grid-cols-3">
          <li className="flex px-32 items-center space-x-2 md:px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>{benefitsSectionListItem1}</span>
          </li>
          <li className="flex px-32 items-center space-x-2 md:px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>{benefitsSectionListItem2}</span>
          </li>
          <li className="flex px-32 items-center space-x-2 md:px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>{benefitsSectionListItem3}</span>
          </li>
          <li className="flex px-32 items-center space-x-2 md:px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>{benefitsSectionListItem4}</span>
          </li>
          <li className="flex px-32 items-center space-x-2 md:px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>{benefitsSectionListItem5}</span>
          </li>
          <li className="flex px-32 items-center space-x-2 md:px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>{benefitsSectionListItem6}</span>
          </li>
        </ul>
      </section>
      <section className="flex flex-col-reverse justify-center py-8 mx-auto sm:max-w-xl md:max-w-full md:py-12 lg:max-w-screen-md lg:py-16 lg:flex-row lg:justify-between">
        <div className="flex flex-col px-4 md:px-24 justify-center rounded-sm lg:pr-6 lg:text-left lg:px-0">
          <h4 className="mb-8 text-4xl font-bold leadi text-center">
            {motivationSectionTitle}
          </h4>
          <p className="p-1 text-justify">
            {motivationSectionText1} <br></br> <br></br>
            {motivationSectionText2} <br></br> <br></br>
            {motivationSectionText3}
          </p>
        </div>
        <Image
          priority
          src={'/images/svg/welcome_project.svg'}
          alt="Project"
          width={250}
          height={250}
          className="py-4 mx-auto lg:py-0"
        />
      </section>
      <section className="py-8 flex flex-col items-center justify-center px-4 mx-auto md:py-12 lg:py-16">
        <h4 className="text-4xl mb-4 font-bold leadi text-center sm:mb-8">
          {teamSectionTitle}
        </h4>
        <div className="flex justify-between items-start">
          <div className="flex flex-col justify-center mx-4 text-center sm:mx-8">
            <Image
              alt="Person"
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
              width={240}
              height={240}
              src="/images/Nikita.png"
            />
            <p className="text-xl font-semibold leadi">thirdmadman</p>
            <p className="text-sm">{teamSectionRole1}</p>
          </div>
          <div className="flex flex-col mx-4 justify-center text-center sm:mx-8">
            <Image
              alt="Person"
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
              width={240}
              height={240}
              style={{ objectFit: 'cover' }}
              src="/images/Nastya.jpeg"
            />
            <p className="text-xl font-semibold leadi">nvalkovich</p>
            <p className="text-sm">{teamSectionRole2}</p>
          </div>
          <div className="flex flex-col mx-4 justify-center text-center sm:mx-8">
            <Image
              alt="Person"
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
              width={250}
              height={250}
              src="/images/Nikita_.jpeg"
            />
            <p className="text-xl font-semibold leadi">iamnkt</p>
            <p className="text-sm">{teamSectionRole2}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
