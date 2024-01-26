'use client';

import { locale } from '@/locales/locale';
import { localeContext } from '@/locales/localeProvider';
import { useContext } from 'react';

export function EditorTitle() {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;
  const { editorTitle } = locale[currentLang];

  return (
    <h2 className="text-4xl mb-5 font-extrabold dark:text-white">
      {editorTitle}
    </h2>
  );
}
