import { getUser } from '@/lib/firebase/getUser';
import { Link } from '@nextui-org/react';

export default async function Welcome() {
  const user = await getUser();

  return (
    <main className="container flex flex-col items-center p-6 mx-auto sm:py-12 lg:py-24">
      <div className="flex flex-col justify-center lg:flex-row lg:justify-between">
        <div className="flex text-3xl items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          WELCOME TO GRAPHQL APP
        </div>
        <div className="lg:basis-2/3 flex flex-col gap-y-6 sm:items-center sm:justify-center sm:space-y-0 lg:justify-center text-center">
          {user ? (
            <Link
              href="/"
              className="px-8 py-3 text-base border rounded text-gray-900"
            >
              Main
            </Link>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                size="lg"
                className="lg:basis-1/3 px-8 py-3 text-base border rounded text-gray-900"
              >
                Sign In
              </Link>
              <Link
                size="lg"
                href="/auth/sign-up"
                className="px-8 py-3 text-base border rounded text-gray-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
        <h3 className="text-xl font-semibold leadi sm:text-3xl">Our team</h3>
        <div className="mt-4 flex justify-between items-start">
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src=""
            />
            <p className="text-xl font-semibold leadi">Nikita</p>
            <p className="text-sm">Team lead</p>
          </div>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src=""
            />
            <p className="text-xl font-semibold leadi">Nastya</p>
            <p className="text-sm">Web developer</p>
          </div>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src=""
            />
            <p className="text-xl font-semibold leadi">Nikita</p>
            <p className="text-sm">Web developer</p>
          </div>
        </div>
      </div>
      <p className="self-start mt-6 mb-8 text-lg sm:mb-12">Course</p>
    </main>
  );
}
