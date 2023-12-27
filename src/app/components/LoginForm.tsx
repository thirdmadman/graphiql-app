'use client';

import { useForm } from 'react-hook-form';
import { FormData } from '../auth/types';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
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

  const emailReg = register('email');
  const passwordReg = register('password');

  return (
    <form
      noValidate={true}
      action=""
      className="my-8 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
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
  );
}
