// Validation utilities

export const emailValidator = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const phoneValidator = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]+$/;
  return phoneRegex.test(phone);
};

export const urlValidator = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const dateRangeValidator = (start: string, end: string): boolean => {
  if (!start || !end) return true;
  return new Date(start) <= new Date(end);
};

export const requiredFieldValidator = (value: string): boolean => {
  return value.trim().length > 0;
};

// Validation des compétences
export const skillsValidator = (skills: string[]): boolean => {
  return skills.length > 0 && skills.every(skill => skill.trim().length > 0);
};

// Export des schémas Zod pour réutilisation
export { personalInfoSchema, experienceEntrySchema, skillsSchema } from '../../types';
