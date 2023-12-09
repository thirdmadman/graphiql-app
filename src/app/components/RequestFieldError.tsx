'use client';

import {useAppDispatch} from '@/lib/redux/hooks';
import {useEffect} from 'react';
import {disableExec} from '@/lib/redux/features/todos/detailsSlice';

export function RequestFieldError({error}: {error: {type: string; message?: string}}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(disableExec());
  });

  return (
    <div>
      <p>We are sorry, but there were error in processing request.</p>
      <p>Text of error: {error.message ? error.message.slice(0, 100) : 'Unknown error'}...</p>
    </div>
  );
}
