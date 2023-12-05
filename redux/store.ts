// configureStore.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, { UtilsIoStore } from './reducers/index';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer<UtilsIoStore>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
