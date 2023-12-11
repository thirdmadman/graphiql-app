import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailsReducer, { detailsSlice } from './features/details/detailsSlice';

const reducers = {
  [detailsSlice.name]: detailsReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const store = configureStore({
  reducer: combinedReducer,
});

export function setupStore(preloadedState?: RootState) {
  return configureStore({
    reducer: combinedReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
