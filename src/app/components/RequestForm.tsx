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
import { Button } from '@nextui-org/button';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Textarea } from '@nextui-org/input';
import { Divider } from '@nextui-org/divider';
import { Tab, Tabs } from '@nextui-org/tabs';

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

  const [dataFromInput, setDataFromInput] = useState(initialSearchParams);

  const onSubmitEvent = (value: string) => {
    if (value && value.length > 0) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      current.set('data', value);

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

  const { inputFormLabel, executeBtnTitle } = locale[currentLang];

  return (
    <div className="min-w-[300px] w-[30%] min-h-full">
      <div className="mb-5">
        <label
          htmlFor="gqlq"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {inputFormLabel}
        </label>
        <div className="min-h-full border border-gray-600 rounded">
          <Textarea
            minRows={8}
            placeholder="Write your gql request"
            id="gqlq"
            onChange={(e) => onChangeEvent(e.target.value)}
            value={dataFromInput}
            classNames={{
              base: "p-2",
              inputWrapper: "p-0",
              innerWrapper: "p-0",
              input: "bg-black",
            }}
          ></Textarea>
          <Divider />
          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Options"
              classNames={{
                base: "pl-2",
                tabList: "p-0",
                panel: "p-0",
              }}
            >
              <Tab key="variables" title="Variables">
                <Textarea
                  minRows={3}
                  classNames={{
                    base: "p-2",
                    inputWrapper: "p-0",
                    innerWrapper: "p-0",
                    input: "bg-black",
                  }}
                ></Textarea>
              </Tab>
              <Tab key="headers" title="Headers">
                <Textarea
                  minRows={3}
                  classNames={{
                    base: "p-2",
                    inputWrapper: "p-0",
                    innerWrapper: "p-0",
                    input: "bg-black",
                  }}
                ></Textarea>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Button
        // className={
        //   !form.isExecDisable
        //     ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        //     : 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        // }
        disabled={form.isExecDisable}
        onClick={() => onSubmitEvent(dataFromInput)}
      >
        {executeBtnTitle}
      </Button>
    </div>
  );
}
