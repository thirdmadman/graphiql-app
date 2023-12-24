'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export function Logout() {
  const router = useRouter();

  async function logOut() {
    try {
      await fetch('/api/auth', {
        method: 'DELETE',
      });
      router.push('/auth/sign-in');
    } catch (e) {
      console.error('e :>> ', e);
    }
  }

  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="submit"
      onClick={() => logOut()}
    >
      Logout
    </button>
  );
}
