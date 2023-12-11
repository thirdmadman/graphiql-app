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

interface Props {
  children?: ReactNode;
}

export function LocaleProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <localeContext.Provider value={{ state, dispatch }}>
      {children}
    </localeContext.Provider>
  );
}
