'use client';

import { useForm } from 'react-hook-form';
import { FormData } from '../types';
import Link from 'next/link';
import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, provider } from '@/lib/firebase/firebase-config';

export default function SingIn() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
  });

  useEffect(() => {
    auth &&
      getRedirectResult(auth)
        .then(async (userCred) => {
          if (!userCred) {
            return;
          }

          await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${await userCred.user.getIdToken()}`,
            },
          }).then((response) => {
            if (response.status === 200) {
              router.replace('/');
            }
          });
        })
        .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = async (data: FormData) => {
    try {
      await fetch('/api/auth/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 200) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.replace('/');
        }
      });
    } catch (e) {
      console.error('e :>> ', e);
    }
  };

  const signInWithGoogle = async () => {
    if (auth && provider) {
      await signInWithRedirect(auth, provider);
    }
  };

  const emailReg = register('email');
  const passwordReg = register('password');

  return (
    <main className="flex min-h-screen flex-col items-center p-24 light">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center dark:text-gray-400">
          Dont have account?
          <Link
            href={'/auth/sign-up'}
            className="text-black dark:text-gray-400 font-bold focus:underline hover:underline"
            rel="noopener noreferrer"
          >
            {'  Sign up here'}
          </Link>
        </p>
        <form
          noValidate={true}
          action=""
          className="my-8 space-y-8"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name={emailReg.name}
                aria-label="email"
                placeholder="name@company.com"
                onChange={emailReg.onChange}
                ref={emailReg.ref}
                onBlur={emailReg.onBlur}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                aria-label="password"
                placeholder="*****"
                name={passwordReg.name}
                ref={passwordReg.ref}
                onBlur={passwordReg.onBlur}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-purple-100 dark:text-black "
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-400" />
          <p className="px-3 dark:text-gray-400">OR</p>
          <hr className="w-full dark:text-gray-400" />
        </div>
        <div className="my-6 space-y-4">
          <button
            aria-label="Login with Google"
            type="button"
            onClick={() => signInWithGoogle()}
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri dark:border-gray-400 focus:ri"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
      </div>
    </main>
  );
}
