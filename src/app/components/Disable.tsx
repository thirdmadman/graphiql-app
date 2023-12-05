'use client';

import {disableExec} from '@/lib/redux/features/todos/detailsSlice';
import {useAppDispatch} from '@/lib/redux/hooks';
import {useEffect} from 'react';

export function Disable({disabled}: {disabled: boolean}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (disabled) {
      dispatch(disableExec());
    }
  });

  return <></>;
}
