import { combineReducers, configureStore } from '@reduxjs/toolkit';
import GlobalSlice from './features/global';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice from './features/auth';
import PersistSlice from './features/persist-slice';
import { env } from '@/utils';

const persistConfig = {
  key: `foundry-id-${env().ENVIRONMENT}-1.000`,
  storage,
  whitelist: ['global', 'auth', 'persist-slice'],
  blacklist: [],
};

const combinedReducers = combineReducers({
  global: GlobalSlice.reducer,
  auth: AuthSlice.reducer,
  'persist-slice': PersistSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
