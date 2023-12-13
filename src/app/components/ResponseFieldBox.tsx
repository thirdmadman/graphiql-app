'use client';

import { useContext } from 'react';
import { localeContext } from '../../locales/localeProvider';
import { locale } from '@/locales/locale';
import { Code } from '@nextui-org/code';

export function ResponseFieldBox({ resp }: { resp?: object }) {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;
  const localization = locale[currentLang];

  const data = resp ? JSON.stringify(resp) : null;

  return (
    <div className="min-w-[300px] w-[30%]">
      <p className="mb-2">{localization.serverResponseTitle}</p>
      <pre className="p-5 bg-gray">{data || 'No data to show'}</pre>
    </div>
  );
}
