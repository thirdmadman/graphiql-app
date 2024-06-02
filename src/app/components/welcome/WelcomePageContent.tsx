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
    <main className="container max-w-screen-xl mx-auto py-24 px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 xl:py-32">
      <section className="relative pb-32 gap-y-10 min-w-full flex flex-col-reverse items-center lg:flex-row lg:justify-between">
        <Image
          priority
          src="/images/svg/welcome_logo.svg"
          alt="Logo"
          width={450}
          height={450}
          style={{ width: 450, height: 450 }}
        />
        <div className="w-full flex flex-col justify-center items-end">
          <div className="min-w-full flex flex-col py-4 space-y-4 sm:items-end sm:justify-end sm:flex-row sm:space-y-0 sm:space-x-6 lg:justify-end">
            {userId ? (
              <Link
                size="lg"
                rel="noopener norefferer"
                href="/editor"
                className="block px-6 py-3 text-center rounded-lg bg-green-100 text-gray-700 shadow-md"
              >
                {mainBtnTitle}
              </Link>
            ) : (
              <>
                <Link
                  size="lg"
                  rel="noopener norefferer"
                  href="/auth/sign-in"
                  className="block px-6 py-3 text-center rounded-lg bg-purple-100 text-purple-700 shadow-md"
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
          <h3 className="mt-8 mb-6 text-4xl text-center self-center font-bold leadi md:text-5xl  lg:self-end lg:text-right lg:text-6xl">
            {welcomeSectionTitle1}
            <br></br>
            {welcomeSectionTitle2}
            <br></br>
          </h3>
          <p className="max-w-lg text-lg text-center self-center lg:self-end lg:text-right">
            {welcomeSectionText}
          </p>
        </div>
      </section>
      <section className="pb-32 min-w-full">
        <h4 className="mb-16 text-4xl font-bold leadi text-center">
          {benefitsSectionTitle}
        </h4>
        <ul className="grid gap-y-6 justify-around md:gap-y-8 md:grid-cols-[repeat(2,_minmax(0,_max-content))] xl:gap-y-12 xl:grid-cols-[repeat(3,_minmax(0,_max-content))]">
          <li className="flex px-1 w-fit items-center space-x-2">
            <Image
              alt=""
              width={20}
              height={20}
              src="/images/svg/welcome_checkmark.svg"
            />
            <span>{benefitsSectionListItem1}</span>
          </li>
          <li className="flex px-1 w-fit items-center space-x-2">
            <Image
              alt=""
              width={20}
              height={20}
              src="/images/svg/welcome_checkmark.svg"
            />
            <span>{benefitsSectionListItem2}</span>
          </li>
          <li className="flex px-1 w-fit items-center space-x-2">
            <Image
              alt=""
              width={20}
              height={20}
              src="/images/svg/welcome_checkmark.svg"
            />
            <span>{benefitsSectionListItem3}</span>
          </li>
          <li className="flex px-1 w-fit items-center space-x-2">
            <Image
              alt=""
              width={20}
              height={20}
              src="/images/svg/welcome_checkmark.svg"
            />
            <span>{benefitsSectionListItem4}</span>
          </li>
          <li className="flex px-1 w-fit items-center space-x-2">
            <Image
              alt=""
              width={20}
              height={20}
              src="/images/svg/welcome_checkmark.svg"
            />
            <span>{benefitsSectionListItem5}</span>
          </li>
          <li className="flex px-1 w-fit items-center space-x-2">
            <Image
              alt=""
              width={20}
              height={20}
              src="/images/svg/welcome_checkmark.svg"
            />
            <span>{benefitsSectionListItem6}</span>
          </li>
        </ul>
      </section>
      <section className="pb-32 min-w-full flex flex-col-reverse justify-center items-center gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col max-w-lg">
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
          src="/images/svg/welcome_project.svg"
          alt="Project"
          width={250}
          height={250}
          style={{ width: 250, height: 250 }}
        />
      </section>
      <section className="min-w-full flex flex-col items-center justify-center">
        <h4 className="text-4xl mb-16 font-bold leadi text-center">
          {teamSectionTitle}
        </h4>
        <div className="flex flex-wrap justify-around items-start gap-y-5">
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
