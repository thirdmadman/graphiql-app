'use client';

import {
  enableExec,
  setValue,
} from '@/lib/redux/features/details/detailsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { localeContext } from '@/locales/localeProvider';
import { locale } from '@/locales/locale';
import { Accordion, AccordionItem, Button, Textarea } from '@nextui-org/react';
import { setQueryParam } from '@/lib/utils/setQueryParam';
import prettifyGQLQuery from '@/lib/utils/formatter/prettifier';

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

  const headersUri = searchParams.get('headers');
  const initialHeadersParams = headersUri ? decodeURIComponent(headersUri) : '';
  const [dataFromQueryInput, setDataFromQueryInput] =
    useState(initialSearchParams);
  const [dataFromVariables, setDataFromVariables] = useState(
    initialVariablesParams
  );
  const [dataFromHeaders, setDataFromHeaders] = useState(initialHeadersParams);
  const [isPrettifyError, setPrettifyError] = useState<boolean>(false);

  const onSubmitEvent = (
    queryValue: string,
    variablesValue?: string,
    headersValue?: string
  ) => {
    if (queryValue && queryValue.length > 0) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      current.set('data', queryValue);

      setQueryParam(current, 'variables', variablesValue);
      setQueryParam(current, 'headers', headersValue);

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
    }
  };

  const onChangeEvent = (value: string) => {
    setDataFromQueryInput(value);
    dispatch(setValue());

    dispatch(enableExec());
  };

  const onPrettifyBtnClick = (value: string) => {
    setPrettifyError(false);

    const prettifiedValue = prettifyGQLQuery(value);
    const { query, errorMessage } = prettifiedValue;

    if (errorMessage) {
      setPrettifyError(true);
      return;
    }
    setDataFromQueryInput(query);
  };

  const onChangeVariables = (value: string) => {
    setDataFromVariables(value);
    dispatch(enableExec());
  };

  const onChangeHeaders = (value: string) => {
    setDataFromHeaders(value);
    dispatch(enableExec());
  };

  const {
    inputFormLabel,
    executeBtnTitle,
    variablesLabel,
    variablesTitle,
    headersLabel,
    headersTitle,
    prettifyBtnTitle,
    prettifyError,
  } = locale[currentLang];

  return (
    <div className="min-w-[300px] w-[30%] min-h-full">
      <div className="mb-5">
        <label
          htmlFor="gqlq"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {inputFormLabel}
        </label>
        <textarea
          rows={20}
          className="font-mono block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your gql request"
          id="gqlq"
          onChange={(e) => onChangeEvent(e.target.value)}
          value={dataFromQueryInput}
          aria-label="input from"
          spellCheck="false"
        ></textarea>
        <div className="py-2">
          <div className="flex gap-3">
            <Button
              color="primary"
              isDisabled={form.isExecDisable}
              onClick={() =>
                onSubmitEvent(
                  dataFromQueryInput,
                  dataFromVariables,
                  dataFromHeaders
                )
              }
            >
              {executeBtnTitle}
            </Button>
            <Button
              color="primary"
              onClick={() => onPrettifyBtnClick(dataFromQueryInput)}
            >
              {prettifyBtnTitle}
            </Button>
          </div>
          {isPrettifyError && (
            <p className="text-red-600 pt-4 h-24">{prettifyError}</p>
          )}
        </div>
        <Accordion selectionMode="multiple">
          <AccordionItem
            key="variables"
            aria-label={variablesTitle}
            title={variablesTitle}
          >
            <Textarea
              label={variablesLabel}
              labelPlacement="outside"
              minRows={4}
              onChange={(e) => onChangeVariables(e.target.value)}
              value={dataFromVariables}
            ></Textarea>
          </AccordionItem>
          <AccordionItem
            key="headers"
            aria-label={headersTitle}
            title={headersTitle}
          >
            <Textarea
              label={headersLabel}
              labelPlacement="outside"
              minRows={4}
              onChange={(e) => onChangeHeaders(e.target.value)}
              value={dataFromHeaders}
            ></Textarea>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
