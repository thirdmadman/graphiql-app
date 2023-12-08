'use client';

import {getRedirectResult, signInWithRedirect} from 'firebase/auth';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {auth, provider} from '@/lib/redux/firebase/firebase-config';
import { LoginFrom } from '../components/LoginFrom';
import { RegisterFrom } from '../components/RegisterFrom';

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return;
      }

      fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push('/app');
        }
      });
    });
  }, []);

  function signIn() {
    signInWithRedirect(auth, provider);
  }

  return (
    <>
      <h2 className='text-3xl uppercase mb-8'>Login page</h2>
      <button className='p-4 rounded-lg bg-green-200' onClick={() => signIn()}>
        Sign In With Google
      </button>
      <LoginFrom />
      <RegisterFrom />
    </>
  );
}
