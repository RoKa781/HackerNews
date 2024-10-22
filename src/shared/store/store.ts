import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../slices/newsSlice'
import currentNewsReducer from '../slices/currentNewsSlice'
import themeReducer from '../slices/themeSlice'

export const store = configureStore({
    reducer: {
      news: newsReducer,
      currentNews: currentNewsReducer,
      theme: themeReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;