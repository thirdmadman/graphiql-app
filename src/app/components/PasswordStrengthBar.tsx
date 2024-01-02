'use clinet';

import React, { useEffect, useState } from 'react';

interface IProgress {
  [key: string]: string;
}

export function PasswordStrengthBar({ password }: { password: string }) {
  const [validate, setValidate] = useState({
    has8digit: false,
    has10digit: false,
    has12digit: false,
  });

  const validatePassword = () => {
    if (
      password.match(/\p{N}/gu) &&
      password.match(/\p{L}/gu) &&
      password.match(/\p{S}|\p{P}/u) &&
      password.length > 7
    ) {
      setValidate((state) => ({ ...state, has8digit: true }));
    } else {
      setValidate((state) => ({ ...state, has8digit: false }));
    }

    if (
      password.match(/\p{N}/gu) &&
      password.match(/\p{L}/gu) &&
      password.match(/\p{S}|\p{P}/u) &&
      password.length > 9
    ) {
      setValidate((state) => ({ ...state, has10digit: true }));
    } else {
      setValidate((state) => ({ ...state, has10digit: false }));
    }

    if (
      password.match(/\p{N}/gu) &&
      password.match(/\p{L}/gu) &&
      password.match(/\p{S}|\p{P}/u) &&
      password.length > 11
    ) {
      setValidate((state) => ({ ...state, has12digit: true }));
    } else {
      setValidate((state) => ({ ...state, has12digit: false }));
    }
  };

  useEffect(() => {
    validatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const strength = Object.values(validate).reduce(
    (acc, item) => acc + Number(item),
    1
  );

  const feedback = {
    1: 'weak',
    2: 'okay',
    3: 'good',
    4: 'strong',
  }[strength];

  const progressConfig: IProgress = {
    1: '[&::-webkit-progress-value]:bg-red-500 [&::-webkit-progress-value]:w-full',
    2: '[&::-webkit-progress-value]:bg-yellow-500 [&::-webkit-progress-value]:w-full',
    3: '[&::-webkit-progress-value]:bg-blue-500 [&::-webkit-progress-value]:w-full',
    4: '[&::-webkit-progress-value]:bg-emerald-500 [&::-webkit-progress-value]:w-full',
  };

  return (
    <>
      {strength > 0 ? (
        <progress
          hidden={password.length === 0}
          className={`
          relative mx-auto h-1 [&::-webkit-progress-bar]:bg-gray-200 rounded w-full
          ${progressConfig[strength.toString()]}
          `}
          value={strength}
          max="4"
        />
      ) : null}
      <p className="text-right text-sm" hidden={password.length === 0}>
        {feedback}
      </p>
    </>
  );
}