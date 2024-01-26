'use client';

import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import {
  initialState,
  ILocaleState,
  reducer,
  IToggleLocaleAction,
} from '@/locales/context/reducer';

export const localeContext = createContext<{
  state: ILocaleState;
  dispatch: Dispatch<IToggleLocaleAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface ILocaleProviderProps {
  children?: ReactNode;
}

export function LocaleProvider({ children }: ILocaleProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <localeContext.Provider value={{ state, dispatch }}>
      {children}
    </localeContext.Provider>
  );
}
