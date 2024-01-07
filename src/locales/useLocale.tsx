'use client';

import { useContext } from 'react';
import { locale } from './locale';
import { localeContext } from './localeProvider';

export const useLocale = () => {
  const { state } = useContext(localeContext);
  const currentLang = state.currentLocale.id;
  return locale[currentLang];
};
