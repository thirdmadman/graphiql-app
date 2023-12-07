'use client';

import {useAppDispatch} from '@/lib/redux/hooks';
import {useEffect} from 'react';
import { disableExec } from '@/lib/redux/features/todos/detailsSlice';
import { ClientError } from 'graphql-request';

export function RequestFieldError({error}: {error: ClientError}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(disableExec());
  });

  return (
    <div>
      <p>We are sorry, but there were error in processing request.</p>
      <p>Text of error: {error.message.slice(0, 100)}...</p>
    </div>
  );
}
