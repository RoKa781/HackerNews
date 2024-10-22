import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const initialTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.theme;

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
