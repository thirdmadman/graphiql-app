'use client';

import { useContext } from 'react';
import { localeContext } from '../../../../locales/localeProvider';
import { Select, SelectItem } from '@nextui-org/select';

export function LanguageSelector() {
  const { state, dispatch } = useContext(localeContext);

  const toggleLangEng = () => {
    dispatch({ type: 'toggleLocaleToEn' });
  };

  const toggleLangRus = () => {
    dispatch({ type: 'toggleLocaleToRu' });
  };

  return (
    <>
      <Select
        variant="bordered"
        className="min-w-20 max-w-20"
        size="sm"
        defaultSelectedKeys={[state.currentLocale.id]}
      >
        <SelectItem
          className="text-center"
          key="en"
          value="en"
          onClick={() => toggleLangEng()}
        >
          EN
        </SelectItem>
        <SelectItem
          className="text-center"
          key="ru"
          value="ru"
          onClick={() => toggleLangRus()}
        >
          RU
        </SelectItem>
      </Select>
    </>
  );
}
