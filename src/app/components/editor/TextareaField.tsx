'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Accordion, AccordionItem, Button, Textarea } from '@nextui-org/react';
import {
  enableExec,
  setValue,
} from '@/lib/redux/features/details/detailsSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setQueryParam } from '@/lib/utils/setQueryParam';
import {
  prettifyGQLQuery,
  prettifyJSON,
} from '@/lib/utils/formatter/prettifier';
import { Mode } from '../types';
import { useLocale } from '@/locales/useLocale';

interface ITextareaData {
  content?: object | string;
  error?: string;
}

interface IData {
  textareaData: ITextareaData;
  headers?: string;
  variables?: string;
}

interface ITextareaFieldProps {
  mode: Mode;
  data?: IData;
  isLoading?: boolean;
}

export function TextareaField({ mode, data, isLoading }: ITextareaFieldProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();
  const {
    requestFieldLabel,
    responseFieldLabel,
    executeBtnTitle,
    prettifyBtnTitle,
    processingRequestError,
    prettifyError,
    variablesLabel,
    variablesTitle,
    headersLabel,
    headersTitle,
    responseFormatError,
    requestFieldPlaceholder,
    responseFieldPlaceholder,
    loadingText,
  } = currentLang;

  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const form = useAppSelector((store) => store.form);

  const getTextareaContent = useCallback((): string => {
    if (isLoading) {
      return loadingText;
    }

    switch (mode) {
      case Mode.Edit:
        return data?.textareaData.content as string;
      case Mode.Readonly:
        return data?.textareaData.error
          ? ''
          : prettifyJSON(data?.textareaData.content as object)?.response ??
              responseFieldPlaceholder;
      default:
        return '';
    }
  }, [
    data?.textareaData,
    isLoading,
    loadingText,
    mode,
    responseFieldPlaceholder,
  ]);

  const [textareaContent, setTextareaContent] = useState('');
  const [dataFromVariables, setDataFromVariables] = useState(
    data?.variables ?? ''
  );
  const [dataFromHeaders, setDataFromHeaders] = useState(data?.headers ?? '');
  const [isPrettifyError, setPrettifyError] = useState<boolean>(false);

  useEffect(() => {
    const content = getTextareaContent();
    setTextareaContent(content);
  }, [setTextareaContent, getTextareaContent]);

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

      setTextareaContent(queryValue);

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`, { scroll: false });
    }
  };
  const onChangeEvent = (value: string) => {
    setTextareaContent(value);
    dispatch(setValue());

    dispatch(enableExec());
  };

  const onChangeVariables = (value: string) => {
    setDataFromVariables(value);
    dispatch(enableExec());
  };

  const onChangeHeaders = (value: string) => {
    setDataFromHeaders(value);
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
    setTextareaContent(query);
  };

  return (
    <div className="min-w-[300px] w-[48%] min-h-full">
      <div className="mb-5">
        <label
          htmlFor="gqlq"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {mode === Mode.Edit ? requestFieldLabel : responseFieldLabel}
        </label>
        <Textarea
          classNames={{
            input: 'min-h-[500px]',
          }}
          isInvalid={mode === Mode.Readonly && !!data?.textareaData.error}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-[500px]"
          placeholder={
            mode === Mode.Edit
              ? requestFieldPlaceholder
              : responseFieldPlaceholder
          }
          id="gqlq"
          onChange={(e) => onChangeEvent(e.target.value)}
          value={textareaContent ?? ''}
          aria-label="input from"
          readOnly={mode === Mode.Readonly}
          spellCheck="false"
        ></Textarea>
        {mode === Mode.Edit && (
          <>
            <div className="py-2">
              <div className="flex flex-row gap-1">
                <Button
                  color="primary"
                  isDisabled={form.isExecDisable}
                  onClick={() =>
                    onSubmitEvent(
                      textareaContent,
                      dataFromVariables,
                      dataFromHeaders
                    )
                  }
                >
                  {executeBtnTitle}
                </Button>
                {executeBtnTitle && <p></p>}
                <Button
                  color="primary"
                  onClick={() => onPrettifyBtnClick(textareaContent)}
                >
                  {prettifyBtnTitle}
                </Button>
              </div>
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
          </>
        )}
        {mode === Mode.Edit && isPrettifyError && (
          <p className="text-red-600 p-2 text-sm">{prettifyError}</p>
        )}
        {mode === Mode.Readonly && (
          <div className="p-3">
            {data?.textareaData.error && (
              <p className="text-red-600 text-sm">{`${processingRequestError}: ${data.textareaData.error}`}</p>
            )}
            {prettifyJSON(data)?.error && (
              <p className="text-red-600 pt-2 text-sm">{`${responseFormatError}: ${prettifyJSON(
                data
              )?.error}`}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
