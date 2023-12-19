'use client';

import { useAppDispatch } from '@/lib/redux/hooks';
import { useEffect } from 'react';
import { disableExec } from '@/lib/redux/features/details/detailsSlice';

interface IResponseFieldErrorProps {
  error: string | undefined;
}

export function ResponseFieldError({ error }: IResponseFieldErrorProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(disableExec());
  });

  return (
    <div>
      <p>We are sorry, but there were error in processing request.</p>
      <p>Text of error: {error ? error : 'Unknown error'}...</p>
    </div>
  );
}
