'use client';

import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import {
  initialState,
  localeStateType,
  reducer,
  toggleLocaleActionType,
} from '@/locales/context/reducer';

export const localeContext = createContext<{
  state: localeStateType;
  dispatch: Dispatch<toggleLocaleActionType>;
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
