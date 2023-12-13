import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailsReducer, { detailsSlice } from './features/details/detailsSlice';

const reducers = {
  [detailsSlice.name]: detailsReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const store = configureStore({
  reducer: combinedReducer,
});

export function setupStore(preloadedState?: TRootState) {
  return configureStore({
    reducer: combinedReducer,
    preloadedState,
  });
}

export type TRootState = ReturnType<typeof store.getState>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
