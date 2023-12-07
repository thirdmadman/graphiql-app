'use client';

import { useContext } from "react";
import { localeContext } from "../localeProvider";
import { locale } from "@/locales/locale";
import RequestField from "./RequestField";

type RequestFieldWrapperProps = {
  searchParams: { [key: string]: string | string[] | undefined },
}

export default function RequestFieldWrapper({ searchParams }: RequestFieldWrapperProps) {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;

  return (
    <div className=''>
      <RequestField searchParams={searchParams} locale={locale[currentLang]} />
    </div>
  );
}
