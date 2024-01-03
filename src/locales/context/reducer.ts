import { TLocale, locale } from '../locale';

export interface ILocaleState {
  currentLocale: TLocale;
}

export interface IToggleLocaleAction {
  type: string;
}

export const initialState = {
  currentLocale: locale.ru,
};

export function reducer(state: ILocaleState, action: IToggleLocaleAction) {
  switch (action.type) {
    case 'toggleLocale': {
      const newLangKey = state.currentLocale.id === 'en' ? 'ru' : 'en';
      return { ...state, currentLocale: locale[newLangKey] };
    }
    default:
      throw new Error();
  }
}
