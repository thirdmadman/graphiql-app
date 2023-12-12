'use client';

import { useAppDispatch } from '@/lib/redux/hooks';
import { useEffect } from 'react';
import { disableExec } from '@/lib/redux/features/details/detailsSlice';

export function ResponseFieldError({ error }: { error: string | undefined }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(disableExec());
  });

  return (
    <div>
      <p>We are sorry, but there were error in processing request.</p>
      <p>Text of error: {error ? error.slice(0, 100) : 'Unknown error'}...</p>
    </div>
  );
}
