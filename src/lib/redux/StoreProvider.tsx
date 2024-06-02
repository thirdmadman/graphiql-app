'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { setupStore, TAppStore } from './store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<TAppStore>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
