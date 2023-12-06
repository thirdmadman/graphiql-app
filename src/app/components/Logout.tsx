import React from 'react';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

function Logout() {
  async function logOut() {
    'use server';
    const token = cookies().get('session');
    await fetch('http:/localhost:3000/api/auth', {
      method: 'DELETE',
      headers: {
        Cookie: `session=${token?.value}`,
      },
    });
    cookies().delete('session');
    redirect('/login');
  }

  return (
    <form action={logOut}>
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        type='submit'
      >
        Logout
      </button>
    </form>
  );
}

export default Logout;
