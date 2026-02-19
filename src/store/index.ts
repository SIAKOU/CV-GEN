import { configureStore } from '@reduxjs/toolkit';
import cvReducer from './cvSlice';
import uiReducer from './uiSlice';
import templatesReducer from './templatesSlice';

// Charger l'état initial depuis localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cv-data');
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    
    // Fusionner avec les valeurs par défaut pour éviter les undefined
    if (parsed && parsed.cv) {
      return {
        cv: {
          ...parsed.cv,
          experiences: parsed.cv.experiences || [],
          education: parsed.cv.education || [],
          projects: parsed.cv.projects || [],
          skills: parsed.cv.skills || [],
          skillCategories: parsed.cv.skillCategories || [],
          languages: parsed.cv.languages || [],
          certifications: parsed.cv.certifications || [],
          interests: parsed.cv.interests || [],
        },
        templates: parsed.templates,
      };
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return undefined;
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cv: cvReducer,
    ui: uiReducer,
    templates: templatesReducer,
  },
  ...(preloadedState && { preloadedState }),
});

// Middleware pour sauvegarder dans localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('cv-data', JSON.stringify({
      cv: state.cv,
      templates: state.templates,
    }));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
