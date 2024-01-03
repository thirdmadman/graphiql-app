'use client';

import { useForm } from 'react-hook-form';
import { formSchema } from '@/lib/yup/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@nextui-org/react';

import { FormData } from '../auth/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

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
      className="flex flex-col w-[300px] max-w-sm mx-auto mb-4 mt-4 font-bold leadi text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-w-sm w-[100%] mx-auto mb-1 mt-7 font-normal text-center">
        <Input
          label="Email"
          id="email"
          type="text"
          autoComplete="on"
          aria-label="email"
          className="h-[90px]"
          size={'md'}
          onChange={emailReg.onChange}
          onBlur={() => setFocusEmail(false)}
          onFocus={() => setFocusEmail(true)}
          name={emailReg.name}
          description={
            !errors.email && focusEmail
              ? 'Valid email format: you@example.com'
              : ''
          }
          ref={emailReg.ref}
          errorMessage={errors.email?.message ?? ''}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          autoComplete="on"
          aria-label="password"
          className="h-[95px]"
          size={'md'}
          onChange={passwordReg.onChange}
          onBlur={() => setFocusPassword(false)}
          name={passwordReg.name}
          ref={passwordReg.ref}
          onFocus={() => setFocusPassword(true)}
          errorMessage={errors.password?.message ?? ''}
          description={
            !errors.password && focusPassword
              ? 'Must be at least 6 characters. Use uppercase and lovercase letters, numbers, special symbols'
              : ''
          }
        />
      </div>
      {Object.entries(errors).length ? (
        <button
          type="submit"
          className="block px-6 py-3 text-center rounded-lg bg-purple-100 text-purple-700 shadow-md"
          disabled
        >
          Sign in
        </button>
      ) : (
        <button
          type="submit"
          className="block px-6 py-3 text-center rounded-lg bg-purple-100 text-purple-700 shadow-md"
        >
          Sign in
        </button>
      )}
    </form>
  );
}
