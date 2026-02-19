import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

interface UiState {
  currentStep: number;
  isSidebarOpen: boolean;
  toast: ToastState;
  theme: 'light' | 'dark';
}

const initialState: UiState = {
  currentStep: 0,
  isSidebarOpen: true,
  toast: {
    message: '',
    type: 'info',
    isVisible: false,
  },
  theme: (typeof window !== 'undefined' && localStorage.getItem('theme') as 'light' | 'dark') || 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    showToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) {
      state.toast = { ...action.payload, isVisible: true };
    },
    hideToast(state) {
      state.toast.isVisible = false;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        if (state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        if (state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
  },
});

export const { setCurrentStep, toggleSidebar, showToast, hideToast, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
