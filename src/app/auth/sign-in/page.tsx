'use client';

import { getRedirectResult, signInWithRedirect } from 'firebase/auth';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, provider } from '@/lib/firebase/firebase-config';
import { LoginForm } from '../../components/LoginForm';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();

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
              router.push('/app');
            }
          });
        })
        .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn() {
    if (auth && provider) {
      await signInWithRedirect(auth, provider);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-3xl uppercase mb-8">Sign in</h2>
      <div>
        <div className="p-5">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => signIn()}
          >
            Sign In With Google
          </button>
        </div>
        <LoginForm />
        <div className="flex p-5 flex-col items-center">
          <div className="mb-5">or</div>
          <Link
            href={'/auth/sign-up'}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
