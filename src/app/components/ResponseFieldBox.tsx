'use client';

import { useContext } from 'react';
import { localeContext } from '../../locales/localeProvider';
import { locale } from '@/locales/locale';

interface IResponseFieldBoxProps {
  resp?: object;
}

export function ResponseFieldBox({ resp }: IResponseFieldBoxProps) {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;
  const localization = locale[currentLang];

  const data = resp ? JSON.stringify(resp, null, 2) : null;

  return (
    <div className="min-w-[300px] w-[30%]">
      <p className="mb-2">{localization.serverResponseTitle}</p>
      <pre className="p-5 bg-gray-50 text-sm text-gray-900">
        {data ?? 'No data to show'}
      </pre>
    </div>
  );
}
