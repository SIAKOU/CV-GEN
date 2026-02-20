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
    
    // Validation basique de la structure
    if (!parsed || typeof parsed !== 'object') {
      console.warn('Invalid state structure in localStorage, resetting...');
      localStorage.removeItem('cv-data');
      return undefined;
    }
    
    // Fusionner avec les valeurs par défaut pour éviter les undefined
    if (parsed && parsed.cv) {
      return {
        cv: {
          ...parsed.cv,
          personalInfo: parsed.cv.personalInfo || {},
          experiences: Array.isArray(parsed.cv.experiences) ? parsed.cv.experiences : [],
          education: Array.isArray(parsed.cv.education) ? parsed.cv.education : [],
          projects: Array.isArray(parsed.cv.projects) ? parsed.cv.projects : [],
          skills: Array.isArray(parsed.cv.skills) ? parsed.cv.skills : [],
          skillCategories: Array.isArray(parsed.cv.skillCategories) ? parsed.cv.skillCategories : [],
          languages: Array.isArray(parsed.cv.languages) ? parsed.cv.languages : [],
          certifications: Array.isArray(parsed.cv.certifications) ? parsed.cv.certifications : [],
          interests: Array.isArray(parsed.cv.interests) ? parsed.cv.interests : [],
        },
        templates: parsed.templates || {},
      };
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    // Clear corrupted data
    try {
      localStorage.removeItem('cv-data');
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
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
let saveTimeout: ReturnType<typeof setTimeout> | null = null;
store.subscribe(() => {
  // Debounce pour éviter trop d'écritures
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  saveTimeout = setTimeout(() => {
    try {
      const state = store.getState();
      const dataToSave = {
        cv: state.cv,
        templates: state.templates,
      };
      
      // Validation avant sauvegarde
      const serialized = JSON.stringify(dataToSave);
      if (serialized && serialized.length < 5000000) { // Max 5MB
        localStorage.setItem('cv-data', serialized);
      } else {
        console.warn('State too large to save to localStorage');
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Si l'erreur est due à un quota dépassé, on nettoie
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        try {
          localStorage.removeItem('cv-data');
          console.warn('localStorage quota exceeded, data cleared');
        } catch (e) {
          console.error('Error clearing localStorage:', e);
        }
      }
    }
  }, 500); // Attendre 500ms avant de sauvegarder
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
