'use client';

import { useForm } from 'react-hook-form';
import { formSchema } from '@/lib/yup/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormData } from '../auth/types';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
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
      });
    } catch (e) {
      console.error('e :>> ', e);
    }
  };

  const emailReg = register('email');
  const passwordReg = register('password');

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      Sign in with email and password
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Input your email
          <input
            id="email"
            className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            autoComplete="on"
            aria-label="email"
            onChange={emailReg.onChange}
            onBlur={emailReg.onBlur}
            name={emailReg.name}
            ref={emailReg.ref}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </label>
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Input your password
          <input
            id="password"
            className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            autoComplete="on"
            aria-label="password"
            onChange={passwordReg.onChange}
            onBlur={passwordReg.onBlur}
            name={passwordReg.name}
            ref={passwordReg.ref}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>
      </div>
      {Object.entries(errors).length ? (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled
        >
          Sign in
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign in
        </button>
      )}
    </form>
  );
}
