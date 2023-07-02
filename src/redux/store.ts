import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from './slices/todoSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const Todo = persistReducer(persistConfig, TodoReducer);

export const store = configureStore({
  reducer: { Todo },
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
