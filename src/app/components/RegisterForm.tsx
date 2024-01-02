'use client';

import { formSchema } from '@/lib/yup/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import React, { ChangeEvent, useState } from 'react';
import { PasswordStrengthBar } from './PasswordStrengthBar';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  terms?: boolean | undefined;
}

interface ErrorResponse {
  message: string;
  errorCode: string;
}

export function RegisterForm() {
  const router = useRouter();

  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const {
    onChange: onNameChange,
    onBlur: onNameBlur,
    name: nameName,
    ref: nameRef,
  } = register('name');

  const {
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    name: emailName,
    ref: emailRef,
  } = register('email');

  const {
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    name: passwordName,
    ref: passwordRef,
  } = register('password');

  const onChangePassword = async (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    await onPasswordChange(e);
  };

  const {
    onChange: onConfirmationChange,
    onBlur: onConfirmationBlur,
    name: confirmationName,
    ref: confirmationRef,
  } = register('passwordConfirmation');

  const {
    onChange: onTermsChange,
    onBlur: onTermsBlur,
    name: termsName,
    ref: termsRef,
  } = register('terms');

  const [signUpError, setSignUpError] = useState<string | null>(null);

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
            router.replace('/');
          } else {
            const data = (await response.json()) as ErrorResponse;
            throw new Error(data.message);
          }
        } catch (e) {
          if (e instanceof Error) {
            console.error('Error: ', e.message);
          }
        }
      } else {
        const data = (await response.json()) as ErrorResponse;
        response.status === 401
          ? setSignUpError(data.message)
          : setSignUpError('UnknownError');
        throw new Error(data.message);
      }
    } catch (e) {
      console.error('e :>> ', e);
    }
  }

  return (
    <form
      className="space-y-6 md:space-y-8"
      onSubmit={handleSubmit(handleSubmitEvent)}
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your name
        </label>
        <input
          type="text"
          name={nameName}
          ref={nameRef}
          onChange={onNameChange}
          onBlur={onNameBlur}
          className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name"
          aria-label="name"
        />
        {errors.name?.message && (
          <ErrorMessage message={errors.name?.message} />
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name={emailName}
          ref={emailRef}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          aria-label="email"
        />
        {errors.email?.message && (
          <ErrorMessage message={errors.email?.message} />
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="text"
          name={passwordName}
          ref={passwordRef}
          onChange={onChangePassword}
          onBlur={onPasswordBlur}
          placeholder="••••••••"
          className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          aria-label="password"
        />
        {password && (
          <PasswordStrengthBar
            password={password}
            errorMessage={errors.password?.message}
          />
        )}
        {!password && errors.password?.message && (
          <ErrorMessage message={errors.password?.message} />
        )}
      </div>
      <div>
        <label
          htmlFor="password-confirmation"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="text"
          name={confirmationName}
          ref={confirmationRef}
          onChange={onConfirmationChange}
          onBlur={onConfirmationBlur}
          placeholder="••••••••"
          className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          aria-label="password-confirmation"
        />
        {errors.passwordConfirmation?.message && (
          <ErrorMessage message={errors.passwordConfirmation?.message} />
        )}
      </div>
      <div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              name={termsName}
              ref={termsRef}
              onChange={onTermsChange}
              onBlur={onTermsBlur}
              aria-describedby="terms"
              type="checkbox"
              className="mb-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              aria-label="terms"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              I accept the{' '}
              <Link
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="#"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
        </div>
        {errors.terms?.type && <ErrorMessage message={errors.terms?.type} />}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        disabled={!isValid}
      >
        Create an account
      </button>
      {signUpError && (
        <p className="text-xs text-red-600 text-center">{signUpError}</p>
      )}
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href={'/auth/sign-in'}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login here
        </Link>
      </p>
    </form>
  );
}
