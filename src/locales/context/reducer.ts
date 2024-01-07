import { TLocale, locale } from '../locale';

export interface ILocaleState {
  currentLocale: TLocale;
}

export interface IToggleLocaleAction {
  type: string;
}

export const initialState = {
  currentLocale: locale.en,
};

export function reducer(state: ILocaleState, action: IToggleLocaleAction) {
  switch (action.type) {
    case 'toggleLocaleToEn': {
      return { ...state, currentLocale: locale.en };
    }
    case 'toggleLocaleToRu': {
      return { ...state, currentLocale: locale.ru };
    }
    default:
      throw new Error();
  }
}
