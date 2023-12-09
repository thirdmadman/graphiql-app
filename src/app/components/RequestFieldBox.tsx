'use client';

import {useContext} from 'react';
import {localeContext} from '../localeProvider';
import {locale} from '@/locales/locale';

export function RequestFieldBox({resp}: {resp: string | null}) {
  const {state} = useContext(localeContext);
  const currentLang = state.currentLocale.id;
  const localization = locale[currentLang];

  let data = resp ? JSON.stringify(resp) : null;

  return (
    <div className=''>
      <p className='mb-2'>{localization.serverResponseTitle}</p>
      <pre className='p-5 bg-gray-50'>{data || 'No data to show'}</pre>
    </div>
  );
}
