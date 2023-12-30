'use client';

import { useForm } from 'react-hook-form';
import { FormData } from '../auth/types';
import { useRouter } from 'next/navigation';
import { signInFormSchema } from '@/lib/yup/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';

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
        throw new Error(data.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error('Error: ', e.message);
      }
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
            {emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name={emailReg.name}
            aria-label="email"
            placeholder="name@company.com"
            onChange={emailReg.onChange}
            ref={emailReg.ref}
            onFocus={() => setSignInError(null)}
            onBlur={emailReg.onBlur}
            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />
          {errors.email?.message && (
            <p className="text-xs text-red-600">
              {
                locale[currentLang][
                  errors.email?.message as formValidationErrors
                ]
              }
            </p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm">
              {passwordLabel}
            </label>
          </div>
          <input
            type="password"
            id="password"
            aria-label="password"
            placeholder="********"
            name={passwordReg.name}
            onChange={passwordReg.onChange}
            ref={passwordReg.ref}
            onFocus={() => setSignInError(null)}
            onBlur={passwordReg.onBlur}
            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />
          {errors.password?.message && (
            <p className="text-xs text-red-600">
              {
                locale[currentLang][
                  errors.password?.message as formValidationErrors
                ]
              }
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-8 py-3 font-semibold rounded-md bg-purple-100 
          dark:text-black "
        disabled={!!Object.entries(errors).length}
      >
        {signInBtn}
      </button>

      {signInError && (
        <p className="text-xs text-red-600 text-center">
          {locale[currentLang][signInError as SignInErrorCodes]}
        </p>
      )}
    </form>
  );
}
