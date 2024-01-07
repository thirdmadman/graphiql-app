'use client';

import { useContext } from 'react';
import { localeContext } from '../../../locales/localeProvider';
import { Select, SelectItem } from '@nextui-org/select';
import { useLocale } from '@/locales/useLocale';

export function LanguageSelector() {
  const { state, dispatch } = useContext(localeContext);

  const toggleLangEng = () => {
    dispatch({ type: 'toggleLocaleToEn' });
  };

  const toggleLangRus = () => {
    dispatch({ type: 'toggleLocaleToRu' });
  };

  const locale = useLocale();

  return (
    <>
      <Select
        label={locale.languageSelectTitle}
        className="max-w-32"
        size="sm"
        defaultSelectedKeys={[state.currentLocale.id]}
      >
        <SelectItem key="en" value="en" onClick={() => toggleLangEng()}>
          en
        </SelectItem>
        <SelectItem key="ru" value="ru" onClick={() => toggleLangRus()}>
          ru
        </SelectItem>
      </Select>
    </>
  );
}
