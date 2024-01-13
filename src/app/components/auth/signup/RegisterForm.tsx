'use client';

import { formSchema } from '@/lib/yup/signupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../shared/ErrorMessage';
import React, { ChangeEvent, useContext, useState } from 'react';
import { PasswordStrengthBar } from './PasswordStrengthBar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  SignUpErrorCodes,
  formValidationErrors,
  locale,
} from '@/locales/locale';
import { localeContext } from '@/locales/localeProvider';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  terms?: boolean | undefined;
}

interface ErrorResponse {
  message: string;
  errorCode: SignUpErrorCodes;
}

export function RegisterForm() {
  const router = useRouter();
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;

  const {
    alreadyHaveAccount,
    signinLink,
    termsLink,
    signupBtn,
    nameLabel,
    namePlaceholder,
    emailLabel,
    passwordLabel,
    confirmPasswordLabel,
    termsLabel,
  } = locale[currentLang];

  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const { onChange } = register('password');

  const onChangePassword = async (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    await onChange(e);
  };

  const [signUpError, setSignUpError] = useState<
    SignUpErrorCodes | string | null
  >(null);

  const [type, setType] = useState('password');

  const toggleType = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  async function handleSubmitEvent(data: FormData) {
    const name = data.name;
    const email = data.email;
    const password = data.password;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 200) {
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
            router.replace('/editor');
          }
        } catch (e) {
          router.push('/auth/sign-in');
        }
      } else {
        const data = (await response.json()) as ErrorResponse;
        response.status === 401
          ? setSignUpError(data.errorCode)
          : setSignUpError(SignUpErrorCodes.UnknownError);
      }
    } catch (e) {
      if (e instanceof Error) {
        setSignUpError(SignUpErrorCodes.UnknownError);
      }
    }
  }

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit(handleSubmitEvent)}
      noValidate
    >
      <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
        {alreadyHaveAccount}{' '}
        <Link
          href={'/auth/sign-in'}
          className="font-medium text-gray-700 dark:text-gray-400 focus:underline hover:underline"
          data-testid="signin"
        >
          {signinLink}
        </Link>
      </p>
      <div className="relative">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {nameLabel}
        </label>
        <input
          type="text"
          {...register('name')}
          className="mb-1 block w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          placeholder={namePlaceholder}
          aria-label="name"
          data-testid="name"
        />
        {errors.name?.message && (
          <ErrorMessage
            message={
              locale[currentLang][errors.name?.message as formValidationErrors]
            }
          />
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {emailLabel}
        </label>
        <input
          type="email"
          {...register('email')}
          className="mb-1 block w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          placeholder="name@company.com"
          aria-label="email"
          data-testid="email"
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
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {passwordLabel}
        </label>
        <div className="mb-1 flex">
          <input
            type={type}
            {...register('password')}
            onChange={onChangePassword}
            placeholder="••••••••"
            className="block w-full px-3 py-2 border rounded-lg text-security:disc dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            aria-label="password"
            data-testid="password"
          />
          <span
            className="flex justify-around items-center"
            onClick={toggleType}
            data-testid="eye"
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
        {password && (
          <PasswordStrengthBar
            password={password}
            errorMessage={
              locale[currentLang][
                errors.password?.message as formValidationErrors
              ]
            }
          />
        )}
        {!password && errors.password?.message && (
          <ErrorMessage
            message={
              locale[currentLang][
                errors.password?.message as formValidationErrors
              ]
            }
          />
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="password-confirmation"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {confirmPasswordLabel}
        </label>
        <input
          type={type}
          {...register('passwordConfirmation')}
          placeholder="••••••••"
          className="mb-1 block w-full px-3 py-2 border rounded-lg -webkit-text-security:disc dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          aria-label="password-confirmation"
          data-testid="confirm-password"
        />
        {errors.passwordConfirmation?.message && (
          <ErrorMessage
            message={
              locale[currentLang][
                errors.passwordConfirmation?.message as formValidationErrors
              ]
            }
          />
        )}
      </div>
      <div className="relative">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              {...register('terms')}
              aria-describedby="terms"
              type="checkbox"
              className="mb-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              aria-label="terms"
              data-testid="terms"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              {termsLabel}{' '}
              <Link
                className="font-medium text-gray-700 dark:text-gray-400 focus:underline hover:underline"
                href="#"
              >
                {termsLink}
              </Link>
            </label>
          </div>
        </div>
        {errors.terms?.type && (
          <ErrorMessage
            message={
              locale[currentLang][errors.terms?.type as formValidationErrors]
            }
          />
        )}
      </div>
      <button
        type="submit"
        className="w-full px-8 py-3 font-semibold rounded-lg bg-green-100 text-gray-700 hover:opacity-80 active:opacity-disabled transition-opacity"
      >
        {signupBtn}
      </button>
      {signUpError && (
        <p className="text-xs text-red-600 text-center">
          {locale[currentLang][signUpError as SignUpErrorCodes]}
        </p>
      )}
    </form>
  );
}
