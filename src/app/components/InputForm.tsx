'use client';

import {disableExec, enableExec, setValue} from '@/lib/redux/features/todos/detailsSlice';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

export function InputForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const form = useAppSelector((store) => store.form);

  const inputSource = searchParams.get('data');
  const initialSearchParams = inputSource ? decodeURIComponent(inputSource) : '';

  const [dataFromInput, setDataFromInput] = useState(initialSearchParams);

  const onSubmitEvent = (value: string) => {
    if (value && value.length > 0) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      current.set('data', value);

      const search = current.toString();
      // or const query = `${'?'.repeat(search.length && 1)}${search}`;
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
    }
  };

  const onChangeEvent = (value: string) => {
    setDataFromInput(value);
    dispatch(setValue(value));

    dispatch(enableExec());
  };

  return (
    <div className='min-w-[30%]'>
      <div className='mb-5'>
        <label htmlFor='gqlq' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Write your query
        </label>
        <textarea
          rows={20}
          className='textarea textarea-secondary p-2.5 w-full'
          placeholder='Write your gql request'
          id='gqlq'
          onChange={(e) => onChangeEvent(e.target.value)}
          value={dataFromInput}
        ></textarea>
      </div>
      <button
        className={
          !form.isExecDisable
            ? 'btn btn-secondary'
            : 'btn btn-disabled'
        }
        disabled={form.isExecDisable}
        onClick={() => onSubmitEvent(dataFromInput)}
      >
        Execute!
      </button>
    </div>
  );
}
