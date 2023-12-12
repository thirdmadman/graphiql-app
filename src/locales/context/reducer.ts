import { Locale, locale } from '../locale';

export type localeStateType = {
  currentLocale: Locale;
};

export type toggleLocaleActionType = {
  type: string;
};

export const initialState = {
  currentLocale: locale.en,
};

export function reducer(
  state: localeStateType,
  action: toggleLocaleActionType
) {
  switch (action.type) {
  case 'toggleLocale': {
    const newLangKey = state.currentLocale.id === 'en' ? 'ru' : 'en';
    return { ...state, currentLocale: locale[newLangKey] };
  }
  default:
    throw new Error();
  }
}
