'use client';

import { useForm } from 'react-hook-form';
import { FormData } from '../auth/types';
import { useRouter } from 'next/navigation';
import { signInFormSchema } from '@/lib/yup/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { ErrorMessage } from './ErrorMessage';
import Image from 'next/image';

interface errorResponse {
  message: string;
  errorCode: SignInErrorCodes;
}

import {
  SignInErrorCodes,
  formValidationErrors,
  locale,
} from '@/locales/locale';
import { localeContext } from '@/locales/localeProvider';

export function LoginForm() {
  const router = useRouter();
  const [signInError, setSignInError] = useState<
    SignInErrorCodes | string | null
  >(null);
  const [type, setType] = useState('password');

  const toggleType = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;

  const {
    emailLabel,
    passwordLabel,
    signInBtn,
    [SignInErrorCodes.UnknownError]: UnknownError,
  } = locale[currentLang];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/auth/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        router.replace('/');
      } else {
        const data = (await response.json()) as errorResponse;
        response.status === 401
          ? setSignInError(data.errorCode)
          : setSignInError(UnknownError);
        console.error('Error: ', data.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error('Error: ', e.message);
        setSignInError(UnknownError);
      }
    }
  };

  const emailReg = register('email');
  const passwordReg = register('password');

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="relative">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {emailLabel}
        </label>
        <input
          type="email"
          data-testid="email"
          name={emailReg.name}
          aria-label="email"
          placeholder="name@company.com"
          onChange={emailReg.onChange}
          ref={emailReg.ref}
          onFocus={() => setSignInError(null)}
          onBlur={emailReg.onBlur}
          className="mb-1 block w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
        />
        {errors.email?.message && (
          <ErrorMessage
            message={
              locale[currentLang][errors.email?.message as formValidationErrors]
            }
          />
        )}
      </div>
      <div className="relative">
        <div className="flex justify-between">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {passwordLabel}
          </label>
        </div>
        <div className="mb-1 flex">
          <input
            type={type}
            data-testid="password"
            id="password"
            aria-label="password"
            placeholder="••••••••"
            name={passwordReg.name}
            onChange={passwordReg.onChange}
            ref={passwordReg.ref}
            onFocus={() => setSignInError(null)}
            onBlur={passwordReg.onBlur}
            className="block w-full px-3 py-2 border rounded-lg text-security:disc dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />
          <span
            className="flex justify-around items-center"
            onClick={toggleType}
          >
            {type === 'password' ? (
              <Image
                src={'/images/svg/eye.svg'}
                width={25}
                height={25}
                alt="eye"
                className="absolute mr-14 cursor-pointer"
              />
            ) : (
              <Image
                src={'/images/svg/eye_slash.svg'}
                width={25}
                height={25}
                alt="eye_slash"
                className="absolute mr-14 cursor-pointer"
              />
            )}
          </span>
        </div>
        {errors.password?.message && (
          <ErrorMessage
            message={
              locale[currentLang][
                errors.password?.message as formValidationErrors
              ]
            }
          />
        )}
      </div>

      <button
        type="submit"
        data-testid="sign-in-btn"
        className="w-full px-8 py-3 mb-8 font-semibold rounded-lg bg-purple-100 text-gray-700  hover:opacity-80 active:opacity-disabled transition-opacity 
          dark:text-black"
      >
        {signInBtn}
      </button>

      {signInError && (
        <p className="text-xs text-red-600 text-center">
          {locale[currentLang][signInError as SignInErrorCodes] ?? UnknownError}
        </p>
      )}
    </form>
  );
}
