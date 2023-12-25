import { getUser } from '@/lib/firebase/getUser';
import { Link } from '@nextui-org/react';
import Image from 'next/image';

export default async function Welcome() {
  const user = await getUser();

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
            {user ? (
              <Link
                size="lg"
                rel="noopener norefferer"
                href="/"
                className="px-6 py-3 text-base rounded-lg bg-gray-100 text-gray-700 shadow-md"
              >
                Main
              </Link>
            ) : (
              <>
                <Link
                  size="lg"
                  rel="noopener norefferer"
                  href="/auth/sign-in"
                  className="block px-6 py-3 rounded-lg bg-purple-100 text-purple-700 shadow-md"
                >
                  Sign In
                </Link>
                <Link
                  size="lg"
                  rel="noopener norefferer"
                  href="/auth/sign-up"
                  className="block px-6 py-3 text-center rounded-lg bg-red-100 text-red-700 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <h3 className="mt-8 mb-6 text-4xl font-bold leadi sm:text-5xl sm:mt-12">
            Welcome
            <br></br>
            to the GraphiQL
            <br></br>
          </h3>
          <p className="text-lg px-4 md:px-24 md:py-0 md:text-justify lg:p-0">
            Our app easily allows you to make requests to the variety of open
            GraphQL APIs
          </p>
        </div>
      </section>
      <section className="py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-md md:py-12 lg:py-16">
        <h4 className="mb-8 text-4xl font-bold leadi text-center">
          Why do people prefer our app?
        </h4>
        <ul className="grid gap-x-12 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          <li className="flex px-1 items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Extra fast performance</span>
          </li>
          <li className="flex px-1 items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>User-friendly interface</span>
          </li>
          <li className="flex px-1 items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Great user experience</span>
          </li>
          <li className="flex px-1 items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Plenty of supported APIs</span>
          </li>
          <li className="flex px-1 items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>API docs loading</span>
          </li>
          <li className="flex px-1 items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Security and caching</span>
          </li>
        </ul>
      </section>
      <section className="flex flex-col-reverse justify-center py-8 mx-auto sm:max-w-xl md:max-w-full md:py-12 lg:max-w-screen-md lg:py-16 lg:flex-row lg:justify-between">
        <div className="flex flex-col px-4 md:px-24 justify-center rounded-sm lg:pr-6 lg:text-left lg:px-0">
          <h4 className="mb-8 text-4xl font-bold leadi text-center">
            Our motivation
          </h4>
          <p className="p-1 text-justify">
            Our team is really interested in the idea of writing a project using
            the latest web app development technologies. Thanks to the RS-school
            React course, we got acquainted with such a wonderful framework as
            Next.js.<br></br>
            <br></br> Therefore, we decided to apply the Next.js App Router
            paradigm for building our application with API routes and
            middleware. We opted to design our application with React&apos;s
            latest features, such as server-side components, Suspense, and
            others.<br></br>
            <br></br> While working on this project, we significantly enhanced
            our teamwork and coding skills. And overall, it was a very
            entertaining and useful experience for us.
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
          Our team
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
            <p className="text-sm">Team lead</p>
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
            <p className="text-sm">Web developer</p>
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
            <p className="text-sm">Web developer</p>
          </div>
        </div>
      </section>
    </main>
  );
}
