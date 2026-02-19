// Application constants

export const APP_NAME = 'Générateur de CV';
export const APP_VERSION = '1.0.0';

// LocalStorage keys
export const STORAGE_KEYS = {
  CV_DATA: 'cv-data',
  SELECTED_TEMPLATE: 'selected-template',
  USER_PREFERENCES: 'user-preferences',
} as const;

// Template types
export const TEMPLATE_TYPES = {
  MINIMAL: 'minimal',
  MODERN: 'modern',
  CREATIVE: 'creative',
} as const;

// Form steps
export const FORM_STEPS = {
  PERSONAL: 'personal',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PREVIEW: 'preview',
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Ce champ est requis',
  EMAIL_INVALID: 'Adresse email invalide',
  PHONE_INVALID: 'Numéro de téléphone invalide',
  URL_INVALID: 'URL invalide',
  MIN_LENGTH: (min: number) => `Minimum ${min} caractères requis`,
  MAX_LENGTH: (max: number) => `Maximum ${max} caractères autorisés`,
} as const;

// Toast messages
export const TOAST_MESSAGES = {
  SAVE_SUCCESS: 'Données enregistrées avec succès!',
  SAVE_ERROR: 'Erreur lors de la sauvegarde',
  PDF_GENERATING: 'Génération du PDF en cours...',
  PDF_SUCCESS: 'PDF généré avec succès!',
  PDF_ERROR: 'Erreur lors de la génération du PDF',
  DATA_CLEARED: 'Données effacées',
} as const;

// PDF settings
export const PDF_SETTINGS = {
  PAGE_SIZE: 'A4',
  MARGIN: 40,
  FONT_SIZE: {
    SMALL: 9,
    NORMAL: 11,
    LARGE: 14,
    XLARGE: 24,
  },
} as const;

// Animation durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
