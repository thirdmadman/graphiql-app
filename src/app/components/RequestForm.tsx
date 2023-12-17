'use client';

import {
  enableExec,
  setValue,
} from '@/lib/redux/features/details/detailsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { localeContext } from '../../locales/localeProvider';
import { locale } from '@/locales/locale';
import { Button, Textarea } from '@nextui-org/react';
import { DownIcon } from './DownIcon';
import { UpIcon } from './UpIcon';
import { minifyQuery } from '@/lib/minify/minifyFunc';

export function RequestForm() {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const form = useAppSelector((store) => store.form);

  const inputSource = searchParams.get('data');
  const initialSearchParams = inputSource
    ? decodeURIComponent(inputSource)
    : '';

  const variablesUri = searchParams.get('variables');
  const initialVariablesParams = variablesUri
    ? decodeURIComponent(variablesUri)
    : '';

  const [dataFromInput, setDataFromInput] = useState(initialSearchParams);
  const [dataFromVariables, setDataFromVariables] = useState(initialVariablesParams);
  const [dataFromHeaders, setDataFromHeaders] = useState('');

  const onSubmitEvent = (queryValue: string, variablesValue?: string) => {
    if (queryValue && queryValue.length > 0) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      const queryMinified = minifyQuery(queryValue);

      current.set('data', queryMinified);

      if (variablesValue) {
        const variablesMinified = minifyQuery(variablesValue);
        current.set('variables', variablesMinified)
      } else if (current.has('variables')) {
        current.delete('variables');
      }

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
    }
  };

  const onChangeEvent = (value: string) => {
    setDataFromInput(value);
    dispatch(setValue());

    dispatch(enableExec());
  };

  const [isEditorsShown, setIsEditorsShown] = useState(false);
  const [isVariablesShown, setIsVariablesShown] = useState(true);
  const [isHeadersShown, setIsHeadersShown] = useState(false);

  const onClickShowTools = () => {
    setIsEditorsShown((state) => !state);
  }

  const onClickVariables = () => {
    if (!isVariablesShown) {
      setIsHeadersShown(false);
      setIsVariablesShown(true);
    };
  }

  const onChangeVariables = (value: string) => {
    setDataFromVariables(value);
    dispatch(enableExec());
  }

  const onClickHeaders = () => {
    if (!isHeadersShown) {
      setIsVariablesShown(false);
      setIsHeadersShown(true);
    };
  }

  const onChangeHeaders = (value: string) => {
    setDataFromHeaders(value);
    dispatch(enableExec());
  }

  const { inputFormLabel, executeBtnTitle, variablesTab, variablesLabel, headersTab, headersLabel } = locale[currentLang];

  return (
    <div className='min-w-[400px] w-[30%] min-h-full'>
      <div className='mb-5'>
        <label
          htmlFor='gqlq'
          className='block mb-2 text-sm font-medium text-white'
        >
          {inputFormLabel}
        </label>
        <div className='h-[600px] min-h-ful bg-white border border-gray-600 flex flex-col justify-between roundeds'>
          <div className='flex-[3_1_0%]'>
            <textarea
              rows={20}
              className='block p-2.5 w-full min-h-full text-sm text-gray-900 bg-gray-50 rounded-t-lg border border-gray-300 focus:outline-none resize-none'
              placeholder='Write your gql request'
              id='gqlq'
              onChange={(e) => onChangeEvent(e.target.value)}
              value={dataFromInput}
              aria-label='input from'
            ></textarea>
          </div>
          <div className='flex items-center justify-between bg-white'>
            <div className='flex'>
              <Button className="bg-white border-1 border-solid" onClick={()=> onClickVariables()}>{variablesTab}</Button>
              <Button className="bg-white border-1 border-solid" onClick={()=> onClickHeaders()}>{headersTab}</Button>
            </div>
            <Button isIconOnly size='sm' className='bg-white' onClick={() => onClickShowTools()}>
              {isEditorsShown ? <DownIcon /> : <UpIcon />}
            </Button>
          </div>
          {isEditorsShown && (
            <div>
              {isVariablesShown && (
                <div>
                  <Textarea
                    label={variablesLabel}
                    minRows={4}
                    maxRows={4}
                    onChange={(e) => onChangeVariables(e.target.value)}
                    value={dataFromVariables}
                    classNames={{
                      base: 'p-2',
                      inputWrapper: 'p-0',
                      innerWrapper: 'p-0',
                      input: 'text-sm text-gray-900',
                    }}
                  ></Textarea>
                </div>
              )}
              {isHeadersShown && (
                <div>
                  <Textarea
                    label={headersLabel}
                    minRows={4}
                    maxRows={4}
                    onChange={(e) => onChangeHeaders(e.target.value)}
                    value={dataFromHeaders}
                    classNames={{
                      base: 'p-2',
                      inputWrapper: 'p-0',
                      innerWrapper: 'p-0',
                      input: 'text-sm text-gray-900',
                    }}
                  ></Textarea>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Button
        className={
          !form.isExecDisable
            ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            : 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        }
        disabled={form.isExecDisable}
        onClick={() => onSubmitEvent(dataFromInput, dataFromVariables)}
      >
        {executeBtnTitle}
      </Button>
    </div>
  );
}
